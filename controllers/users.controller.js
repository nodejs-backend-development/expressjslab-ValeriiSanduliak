const { url } = require('../global_keys/keys');
const { makeRequest } = require('../clients/httpClient');

const getUsers = async (req, res) => {
    try {
        const userData = await makeRequest(`${url}/users`, 'GET');
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).send('Error getting users');
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await makeRequest(`${url}/users/${id}`, 'GET');
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).send('Error getting user with id');
    }
};
const createUser = async (req, res) => {
    try {
        const { name, email, gender, status } = req.body;
        const userData = await makeRequest(`${url}/users`, 'POST', {
            name,
            email,
            gender,
            status,
        });
        res.status(201).json(userData);
    } catch (error) {
        res.status(500).send('Error creating user');
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, gender, status } = req.body;
        const userData = await makeRequest(`${url}/users/${id}`, 'PUT', {
            name,
            email,
            gender,
            status,
        });
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).send('Error updating user with id');
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await makeRequest(`${url}/users/${id}`, 'DELETE');
        res.status(202).send('User delete');
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
};
module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};
