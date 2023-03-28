const express = require('express');
const {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/users.controller');

const router = express.Router();

/* GET users listing. */
router.get('/users', getUsers);

router.post('/users', createUser);

router.get('/users/:id', getUserById);

router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
// router.post('/new', addUser);

module.exports = router;
