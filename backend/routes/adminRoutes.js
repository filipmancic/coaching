const db = require('../config/db'); 
const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();
const multer = require('multer');
const util = require('util');
const nodemailer = require('nodemailer');
const dbQuery = util.promisify(db.query).bind(db);

router.get('/clients', async (req, res) => {
  try {
    const query = 'SELECT id, ime, email FROM klijent';
    const clients = await dbQuery(query);
    res.status(200).json({ clients });
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/plans', async (req, res) => {
  try {
    const query = 'SELECT id, naziv FROM plan';
    const plans = await dbQuery(query);
    res.status(200).json({ plans });
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/exercises', async (req, res) => {
    try {
      const query = 'SELECT id,naziv FROM vezba';
      const exercises = await dbQuery(query);
      res.status(200).json({ exercises });
    } catch (error) {
      console.error('Error fetching exercises:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
router.post('/create-plan', async (req, res) => {
  const { naziv } = req.body;
  try {
    const insertQuery = 'INSERT INTO plan (naziv) VALUES (?)';
    const result = await dbQuery(insertQuery, [naziv]);
    res.status(200).json({ message: 'Plan uspešno kreiran', planId: result.insertId });
  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).json({ message: 'Greška pri kreiranju plana' });
  }
});

router.post('/add-training', async (req, res) => {
  const { planId, naziv_nedelje, trening_dan, vezba_naziv, tezina, broj_ponavljanja, napomena } = req.body;

  try {
    const nedeljaQuery = 'SELECT id FROM nedelja WHERE plan_id = ? AND naziv_nedelje = ?';
    let nedeljaResults = await dbQuery(nedeljaQuery, [planId, naziv_nedelje]);
    let nedelja_id;
    if (nedeljaResults.length === 0) {
      const insertNedeljaQuery = 'INSERT INTO nedelja (plan_id, naziv_nedelje) VALUES (?, ?)';
      const insertNedeljaResult = await dbQuery(insertNedeljaQuery, [planId, naziv_nedelje]);
      nedelja_id = insertNedeljaResult.insertId;
    } else {
      nedelja_id = nedeljaResults[0].id;
    }

    const treningQuery = 'SELECT id FROM trening WHERE nedelja_id = ? AND dan = ?';
    let treningResults = await dbQuery(treningQuery, [nedelja_id, trening_dan]);
    let trening_id;
    if (treningResults.length === 0) {
      const insertTreningQuery = 'INSERT INTO trening (nedelja_id, dan) VALUES (?, ?)';
      const insertTreningResult = await dbQuery(insertTreningQuery, [nedelja_id, trening_dan]);
      trening_id = insertTreningResult.insertId;
    } else {
      trening_id = treningResults[0].id;
    }

    const insertTreningVezbaQuery = 'INSERT INTO trening_vezba (trening_id, vezba_id, tezina, broj_ponavljanja, napomena) VALUES (?, ?, ?, ?, ?)';
    await dbQuery(insertTreningVezbaQuery, [trening_id, vezba_naziv, tezina, broj_ponavljanja, napomena]);

    res.status(200).json({ message: 'Trening uspešno dodat u plan' });
  } catch (error) {
    console.error('Error adding training:', error);
    res.status(500).json({ message: 'Greška pri dodavanju treninga' });
  }
});

router.post('/assign-plan', async (req, res) => {
  const { clientId, planId } = req.body;
  try {
    const updateQuery = 'UPDATE klijent SET plan_id = ? WHERE id = ?';
    await dbQuery(updateQuery, [planId, clientId]);

    const updateQuery2 = 'UPDATE plan SET klijent_id = ? WHERE id = ?';
    await dbQuery(updateQuery2, [clientId, planId]);

    res.status(200).json({ message: 'Plan uspešno dodeljen klijentu' });
  } catch (error) {
    console.error('Error assigning plan:', error);
    res.status(500).json({ message: 'Greška pri dodeli plana' });
  }
});
router.post('/assign-meal-plan', async (req, res) => {
  const { clientId, mealPlanLink } = req.body;
  try {
    const updateQuery = 'UPDATE klijent SET plan_ishrane = ? WHERE id = ?';
    await dbQuery(updateQuery, [mealPlanLink, clientId]); 
    res.status(200).json({ message: 'Plan uspešno dodeljen klijentu' });
  } catch (error) {
    console.error('Error assigning plan:', error);
    res.status(500).json({ message: 'Greška pri dodeli plana' });
  }
});
 router.post('/create-client', async (req, res, next) => {
  const { ime, prezime, email, password, obavestiKlijenta } = req.body;
  if (!ime || !prezime || !email || !password) {
      return res.status(400).json({ message: 'Sva polja su obavezna!' });
  }

  try {
      db.query('SELECT * FROM klijent WHERE email = ?', [email], async (err, results) => {
          if (err) {
              console.error('Error querying database:', err);
              return res.status(500).json({ message: 'Server error' });
          }

          if (results.length > 0) {
              return res.status(409).json({ message: 'Korisnik sa ovim emailom već postoji.' });
          }

          const hashedPw = await bcrypt.hash(password, 10);
          db.query(
              'INSERT INTO klijent (ime, prezime, email, password) VALUES (?, ?, ?, ?)',
              [ime, prezime, email, hashedPw],
              async (err, result) => {
                  if (err) {
                      console.error('Error inserting user:', err);
                      return res.status(500).json({ message: 'Server error' });
                  }
                  if (obavestiKlijenta) {
                      try {
                          let transporter = nodemailer.createTransport({
                            host: 'mail.cupavitrener.rs',
                            port: 465,
                            secure: true, 
                            auth: {
                                user: 'vanja@cupavitrener.rs',
                                pass: process.env.MAILER_PASS
                            }
                          });

                          let mailOptions = {
                            from: "vanja@cupavitrener.rs",
                            to: email,
                            subject: 'Treniraj sa Čupavom',
                            text: `Poštovani ${ime},\n\nVaš nalog je uspešno kreiran. Vaš email je ${email}, a lozinka je ${password}. Molim Vas da čuvate pažljivo podatke.\n\nPozdrav,\nČupavi Trener`
                        };

                          await transporter.sendMail(mailOptions);
                      } catch (emailError) {
                          console.error('Error sending email:', emailError);
                      }
                  }

                  res.status(201).json({
                      message: 'Korisnik uspešno registrovan.',
                      userId: result.insertId
                  });
                  next();
              }
          );
      });
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
}); 

router.delete('/delete-client', async (req, res, next) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'Email je obavezan!' });
  }

  try {
    db.query('DELETE FROM klijent WHERE email = ?', [email], (err, result) => {
      if (err) {
        console.error('Error deleting client:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Klijent nije pronađen.' });
      }
      res.status(200).json({ message: 'Klijent uspešno obrisan.' });
      next();
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.delete('/delete-plan', async (req, res, next) => {
  const { planId } = req.body;
  
  if (!planId) {
    return res.status(400).json({ message: 'Plan ID je obavezan!' });
  }
  
  try {
    db.query('DELETE FROM plan WHERE id = ?', [planId], (err, result) => {
      if (err) {
        console.error('Error deleting plan:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Plan nije pronađen.' });
      }
      res.status(200).json({ message: 'Plan uspešno obrisan.' });
      next();
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'img/'); // dodati putanju
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/create-blog', upload.single('image'), (req, res, next) => {
  const { title, preview_text, blog_text } = req.body;
  const image = req.file ? req.file.filename : null;
  if (!title || !preview_text || !blog_text) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  db.query(
    'INSERT INTO blog (title, preview_text, blog_text, image) VALUES (?, ?, ?, ?)',
    [title, preview_text, blog_text, image],
    (err, result) => {
      if (err) {
        console.error('Error inserting blog post:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.status(201).json({ message: 'Blog post created successfully', blogId: result.insertId });
      next();
    }
  );
});

router.delete('/delete-blog', (req, res, next) => {
  const { blogId } = req.body;
  if (!blogId) {
    return res.status(400).json({ message: 'Blog ID is required.' });
  }
  db.query('DELETE FROM blog WHERE title = ?', [blogId], (err, result) => {
    if (err) {
      console.error('Error deleting blog post:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }
    res.status(200).json({ message: 'Blog post deleted successfully' });
    next();
  });
});
module.exports = router;
