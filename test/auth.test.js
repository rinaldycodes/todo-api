// import the app
const app = require('../app');

// import supertest for making http request;
const request = require('supertest');

// test suites
describe("Auth Test", () => {
    // test case
    it("user register", async () => {
        // make post request 
        var response = await request(app)
        .post('/api/v1/auth/register')
        .send({
            "email": "aldy@avatech.com",
            "name": "Rinaldy Ramadhan",
            "password": "Password@123"
        });

        // Expectations
        expect(response.status).toBe(200); // Check if response status is 200 OK
    });

    it("user login", async () => {
        // make post request 
        var response = await request(app)
        .post('/api/v1/auth/login')
        .send({
            "email": "aldy@avatech.com",
            "password": "Password@123"
        });

        // Expectations
        expect(response.status).toBe(200); // Check if response status is 200 OK
    });

    
})