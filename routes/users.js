const express = require('express');
const {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/users.controller');
const { checkAuth } = require('../middleware/checkAuth');

const router = express.Router();

/* GET users listing. */
router.get('/', checkAuth, getUsers);

router.post('/', checkAuth, createUser);

router.get('/:id', checkAuth, getUserById);

router.put('/:id', checkAuth, updateUser);
router.delete('/:id', checkAuth, deleteUser);

module.exports = router;
