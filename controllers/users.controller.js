const url = 'https://gorest.co.in/public/v2';
const token = 'fd6401dbee90702dff0578ba8ff17603d36ebef28959c7ec6bbbf030d622862c';

const getUsers = async (req, res) => {
    try {
        const response = await fetch(`${url}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(404).send('Error getting users');
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await fetch(`${url}/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(404).send(`Error getting user with id ${id}`);
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
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(404).send('Error creating user');
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
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(404).send(`Error updating user with id ${id}`);
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params.id;
    try {
        const response = await fetch(`${url}/users/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        res.status(404).send('Error delete user');
    }
};
module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};
