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

router.use(checkAuth);
router.get('/', getUsers);

router.post('/', createUser);

router.get('/:id', getUserById);

router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
