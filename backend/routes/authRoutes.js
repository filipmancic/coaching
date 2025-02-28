const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); 
const userVerification = require('../middleware/JWTAuth')

router.get('/verify',userVerification, (req, res) => {
    res.status(200).json({
        message: 'Token važeći, dobrodošli!',
        user: req.user
    })});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        db.query("SELECT * FROM klijent WHERE email=?", [email], async (err,results)=>{
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            if (results.length == 0) {
                return res.status(409).json({ message: 'Korisnik sa ovim emailom ne postoji.' });
            }
            const isPasswordValid = await bcrypt.compare(password, results[0].password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Pogrešna lozinka.' });
            }
            const token = jwt.sign(
                { id: results[0].id, email: results[0].email, ime: results[0].ime, plan_id: results[0].plan_id, isAdmin: results[0].is_admin },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            ); 
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: 'strict',
            });
            res.status(200).json({
                message: 'Uspešna prijava.',
                token: token,
            });
        })


    } catch (error) {
        console.error('Greška prilikom prijave:', error);
        return res.status(500).json({ message: 'Greška na serveru.' });
    }
});


module.exports = router;

