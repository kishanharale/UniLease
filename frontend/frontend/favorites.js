const express = require('express');
const router = express.Router();
const Favorites = require('../models/favorites'); // Mongoose model for favorites

router.post('/', async (req, res) => {
  const { userId, houseId, isFavorite } = req.body;
  try {
    if (isFavorite) {
      await Favorites.findOneAndUpdate(
        { userId, houseId },
        { userId, houseId },
        { upsert: true }
      );
    } else {
      await Favorites.findOneAndDelete({ userId, houseId });
    }
    res.status(200).json({ message: 'Favorite status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Could not update favorite status' });
  }
});

module.exports = router;
