const express = require('express');
const userController = require('../controllers/userController');
const csrfProtection = require('../middleware/csrfProtection');

const router = express.Router();

router.get('/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/:id', userController.getUserById);
router.post('/update-password', userController.updatePassword);

module.exports = router;
