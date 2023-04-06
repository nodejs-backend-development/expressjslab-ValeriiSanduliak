const request = require('supertest');
const app = require('../app');
const { url, token } = require('../global_keys/keys');
const { makeRequest } = require('../clients/httpClient');
require('dotenv').config();

jest.mock('../clients/httpClient');
const userId = '1';
const user = {
    id: userId,
    name: 'userName',
    email: 'user@example.com',
    gender: 'male',
    status: 'active',
};
const user2 = {
    name: 'user2Name',
    email: 'user2@example.com',
    gender: 'female',
    status: 'inactive',
};
afterEach(() => {
    jest.clearAllMocks();
});
describe('GET /users', () => {
    it('should getUsers', async () => {
        makeRequest.mockResolvedValueOnce([user]);

        const res = await request(app).get('/users').set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body).toStrictEqual([user]);
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/users`, 'GET');
    });
    it('should handle errors getUsers', async () => {
        makeRequest.mockRejectedValueOnce(new Error('Users not found'));

        const res = await request(app).get('/users').set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error getting users');
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/users`, 'GET');
    });
});
describe('GET /users/:id', () => {
    it('should getUser by id', async () => {
        makeRequest.mockResolvedValueOnce(user);

        const res = await request(app)
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(user);
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/users/${userId}`, 'GET');
    });

    it('should handle errors getting users by id', async () => {
        const userIdErr = '2';
        makeRequest.mockRejectedValueOnce(new Error('User not found'));

        const res = await request(app)
            .get(`/users/${userIdErr}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error getting user with id');
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/users/${userIdErr}`, 'GET');
    });
});
describe('POST /users', () => {
    it('should create a new user', async () => {
        const createdUser = {
            id: '1',
            ...user2,
        };
        makeRequest.mockResolvedValueOnce(createdUser);

        const res = await request(app)
            .post('/users')
            .send(user2)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(201);
        expect(res.body).toStrictEqual(createdUser);
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/users`, 'POST', user2);
    });

    it('should handle errors create new user', async () => {
        makeRequest.mockRejectedValueOnce(new Error('Create failed'));

        const res = await request(app)
            .post('/users')
            .send(user2)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error creating user');
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/users`, 'POST', user2);
    });
});
describe('PUT /users/:id', () => {
    it('should update user', async () => {
        makeRequest.mockResolvedValueOnce(user2);
        const res = await request(app)
            .put(`/users/${userId}`)
            .send(user2)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(user2);
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/users/${userId}`, 'PUT', user2);
    });
    it('should handle errors update user', async () => {
        makeRequest.mockRejectedValueOnce(new Error('Update failed'));

        const res = await request(app)
            .put(`/users/${userId}`)
            .send(user2)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error updating user with id');

        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/users/${userId}`, 'PUT', user2);
    });
});
describe('DELETE /users/:id', () => {
    it('should delete a user by ID', async () => {
        makeRequest.mockResolvedValueOnce(user);

        const res = await request(app)
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(202);
        expect(res.text).toBe('User delete');
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/users/${userId}`, 'DELETE');
    });

    it('should handle errors delete user', async () => {
        makeRequest.mockRejectedValueOnce(new Error('Network Error'));

        const res = await request(app)
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error deleting user');
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/users/${userId}`, 'DELETE');
    });
});
