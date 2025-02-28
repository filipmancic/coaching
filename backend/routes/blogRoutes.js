const express = require('express');
const router = express.Router();
const util = require('util');
const db = require('../config/db'); 
const dbQuery = util.promisify(db.query).bind(db);

router.get('/blogs', async (req, res) => {
  let { offset, limit } = req.query;
  offset = offset ? parseInt(offset) : 0;
  limit = limit ? parseInt(limit) : 5;
  try {
    const query = 'SELECT * FROM blog ORDER BY id DESC LIMIT ? OFFSET ?';
    const blogs = await dbQuery(query, [limit, offset]);
    res.status(200).json({ blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/blogs-all', async (req, res) => {
  try {
    const query = 'SELECT * FROM blog ORDER BY id';
    const blogs = await dbQuery(query);
    res.status(200).json({ blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/blog/:slug', async (req, res) => {
  const { slug } = req.params;
  try {

    const query = "SELECT * FROM blog WHERE REPLACE(LOWER(title), ' ', '-') = ?";
    const results = await dbQuery(query, [slug]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ blog: results[0] });
  } catch (error) {
    console.error('Error fetching blog detail:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
