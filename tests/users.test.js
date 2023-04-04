const request = require('supertest');
const app = require('../app');
const { url } = require('../global_keys/keys');
const { makeRequest } = require('../clients/httpClient');
require('dotenv').config();

jest.mock('../clients/httpClient');

describe('GET /users', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should getUsers', async () => {
        const user = {
            id: '1',
            name: 'myName',
        };

        makeRequest.mockResolvedValueOnce([user]);

        const res = await request(app).get('/users');

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body).toStrictEqual([user]);
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/users`, 'GET', null);
    });
    it('should handle errors getUsers', async () => {
        makeRequest.mockRejectedValueOnce(new Error('Users not found'));

        const res = await request(app).get('/users');

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error getting users');
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/users`, 'GET', null);
    });
});
describe('GET /users/:id', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should getUser by id', async () => {
        const userId = '1';
        const user = {
            id: userId,
            name: 'myName',
        };
        makeRequest.mockResolvedValueOnce(user);

        const res = await request(app).get(`/users/${userId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(user);
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/users/${userId}`, 'GET', null);
    });

    it('should handle errors getting users by id', async () => {
        const userId = '2';
        makeRequest.mockRejectedValueOnce(new Error('User not found'));

        const res = await request(app).get(`/users/${userId}`);

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error getting user with id');
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/users/${userId}`, 'GET', null);
    });
});
describe('POST /users', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should create a new user', async () => {
        const newUser = {
            name: 'myName',
            email: 'test@example.com',
            gender: 'male',
            status: 'active',
        };
        const createdUser = {
            id: '1',
            ...newUser,
        };
        makeRequest.mockResolvedValueOnce(createdUser);

        const res = await request(app).post('/users').send(newUser);

        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(createdUser);
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/users`, 'POST', JSON.stringify(newUser));
    });

    it('should handle errors create new user', async () => {
        const newUser = {
            name: 'myName',
            email: 'test@example.com',
            gender: 'male',
            status: 'active',
        };
        makeRequest.mockRejectedValueOnce(new Error('Create failed'));

        const res = await request(app).post('/users').send(newUser);

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error creating user');
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/users`, 'POST', JSON.stringify(newUser));
    });
});
describe('PUT /users/:id', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should update user', async () => {
        const id = 1;
        const updatedUser = {
            name: 'newName',
            email: 'newEmail@example.com',
            gender: 'female',
            status: 'inactive',
        };
        makeRequest.mockResolvedValueOnce(updatedUser);
        const res = await request(app).put(`/users/${id}`).send(updatedUser);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(updatedUser);
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(
            `${url}/users/${id}`,
            'PUT',
            JSON.stringify(updatedUser),
        );
    });
    it('should handle errors update user', async () => {
        const id = 1;
        const updatedUser = {
            name: 'newName',
            email: 'newEmail@example.com',
            gender: 'female',
            status: 'inactive',
        };

        makeRequest.mockRejectedValueOnce(new Error('Update failed'));

        const res = await request(app).put(`/users/${id}`).send(updatedUser);
        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error updating user with id');

        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(
            `${url}/users/${id}`,
            'PUT',
            JSON.stringify(updatedUser),
        );
    });
});
describe('DELETE /users/:id', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should delete a user by ID', async () => {
        const uid = '1';
        const user = {
            id: uid,
            name: 'myName',
        };
        makeRequest.mockResolvedValueOnce(user);

        const res = await request(app).delete(`/users/${uid}`);

        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('User delete');
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/users/${uid}`, 'DELETE', null);
    });

    it('should handle errors', async () => {
        const uid = '1';
        makeRequest.mockRejectedValueOnce(new Error('Network Error'));

        const res = await request(app).delete(`/users/${uid}`);

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error deleting user');
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/users/${uid}`, 'DELETE', null);
    });
});
