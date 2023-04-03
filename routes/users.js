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
router.get('/', getUsers);

router.post('/', createUser);

router.get('/:id', getUserById);

router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
