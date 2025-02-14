const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

router.get('/ishrana', (req,res)=>{
    const user_id = req.headers.user_id;
    try{
        const query = "SELECT plan_ishrane FROM klijent WHERE id = ?"
        db.query(query,[user_id],(err,results)=>{
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Trenutno nemate plan ishrane.' });
            }
            //console.log(results)
            return res.status(200).json({
                message: 'Uspešno fetchovanje',
                data: results,
            });
        });
    } catch (error) {
        console.error('Greška:', error);
        return res.status(500).json({ message: 'Greška na serveru.' });
    }
            
})
router.get('/plan', (req, res) => {
    const user_id = req.headers.user_id;
    try {
        const query = `
           SELECT 
    n.naziv_nedelje AS nedelja_naziv,
    t.dan AS trening_dan,
    v.naziv AS vezba_naziv,
    v.opis AS vezba_opis,
    tv.tezina AS tezina,
    tv.broj_ponavljanja AS broj_ponavljanja
FROM 
    klijent k
JOIN 
    plan p ON k.plan_id = p.id
JOIN 
    nedelja n ON p.id = n.plan_id
JOIN 
    trening t ON n.id = t.nedelja_id
JOIN 
    trening_vezba tv ON t.id = tv.trening_id
JOIN 
    vezba v ON tv.vezba_id = v.id
WHERE 
                k.id = ?;
        `;

        db.query(query, [user_id], (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Trenutno nemate ni jedan plan treninga.' });
            }
            //console.log(results)
            return res.status(200).json({
                message: 'Uspešno fetchovanje',
                data: results,
            });
        });
    } catch (error) {
        console.error('Greška:', error);
        return res.status(500).json({ message: 'Greška na serveru.' });
    }
});

module.exports = router;
