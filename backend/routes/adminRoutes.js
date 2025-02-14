const db = require('../config/db'); 
const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();
const util = require('util');
const dbQuery = util.promisify(db.query).bind(db);

/** GET /api/admin/clients
 * Vraća listu svih klijenata (id, ime, email)
 */
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

/** GET /api/admin/plans
 * Vraća listu svih planova (id, naziv)
 */
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
  

/** POST /api/admin/create-plan
 * Kreira novi plan sa prosleđenim nazivom.
 * Očekivano telo: { naziv }
 */
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

/** POST /api/admin/add-training
 * Dodaje trening (stavku) u postojeći plan.
 * Očekivano telo: { planId, naziv_nedelje, trening_dan, vezba_naziv, tezina, broj_ponavljanja }
 */
router.post('/add-training', async (req, res) => {
  const { planId, naziv_nedelje, trening_dan, vezba_naziv, tezina, broj_ponavljanja } = req.body;

  try {
    // Provera i kreiranje nedelje za dati plan
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

    // Provera i kreiranje treninga (dana) u okviru te nedelje
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

    // Ubacivanje zapisa u trening_vezba
    const insertTreningVezbaQuery = 'INSERT INTO trening_vezba (trening_id, vezba_id, tezina, broj_ponavljanja) VALUES (?, ?, ?, ?)';
    await dbQuery(insertTreningVezbaQuery, [trening_id, vezba_naziv, tezina, broj_ponavljanja]);

    res.status(200).json({ message: 'Trening uspešno dodat u plan' });
  } catch (error) {
    console.error('Error adding training:', error);
    res.status(500).json({ message: 'Greška pri dodavanju treninga' });
  }
});

/** POST /api/admin/assign-plan
 * Dodeljuje plan klijentu.
 * Očekivano telo: { clientId, planId }
 */
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

module.exports = router;

router.post('/create-client', async (req, res, next) => {
    const { ime, prezime, email, password } = req.body;
    //console.log(req.body)
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
                (err, result) => {
                    if (err) {
                        console.error('Error inserting user:', err);
                        return res.status(500).json({ message: 'Server error' });
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
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;
