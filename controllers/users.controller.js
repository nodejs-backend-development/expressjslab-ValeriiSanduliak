const url = 'https://gorest.co.in/public/v2';
const token = '4570ffe728dcb03e36c8124955115719fce53b2a421a0e6ae424523e8147e68b';

const getUsers = async (req, res) => {
    try {
        const response = await fetch(`${url}/users`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting users');
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await fetch(`${url}/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error getting user with id ${id}`);
    }
};

const createUser = async (req, res) => {
    const { name, email, gender, status } = req.body;
    try {
        const response = await fetch(`${url}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, email, gender, status }),
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, gender, status } = req.body;
    try {
        const response = await fetch(`${url}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, email, gender, status }),
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error updating user with id ${id}`);
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await fetch(`${url}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        res.status(200).send('User delete');
    } catch (err) {
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
