// Import the app
const app = require('../app');

// Import supertest for making HTTP requests to the app
const request = require('supertest');

// Test suite
describe("CRUD task", () => {
    // Test case
    it("should create a task", async () => {
        // Make a POST request to the app endpoint
        const response = await request(app)
            .post('/api/v1/tasks')
            .send({
                "title": "Membuat Login UI #UNIT_TESTING",
                "description": "Membuat Login UI #UNIT_TESTING dengan menggunakan react native, dengan login email dan no telepon",
                "startDate": "2024-05-25",
                "dueDate": "2024-05-30"
            });

        // Expectations
        expect(response.status).toBe(200); // Check if response status is 200 OK
        expect(response.body).toHaveProperty('data'); // Check if response body has 'title' property
        expect(response.body.data).toHaveProperty('title'); // Assuming this property exists
    });

    // Test case find
    it("should find a task", async () => {
        // Make a POST request to the app endpoint
        const response = await request(app)
            .get('/api/v1/tasks/15')
            .send();

        // Expectations
        expect(response.status).toBe(200); // Check if response status is 200 OK
        expect(response.body).toHaveProperty('data'); // Check if response body has 'title' property
        expect(response.body.data).toHaveProperty('title'); // Assuming this property exists
    });

    // Test case find all task
    it("should find all task", async () => {
        // Make a POST request to the app endpoint
        const response = await request(app)
            .get('/api/v1/tasks/')
            .send();

        // Expectations
        expect(response.status).toBe(200); // Check if response status is 200 OK
    });

    // Test case delete a task
    it("should delete a task", async () => {
        // Make a POST request to the app endpoint
        const response = await request(app)
            .delete('/api/v1/tasks/1')
            .send();

        // Expectations
        expect(response.status).toBe(200); // Check if response status is 200 OK
    });

    // Test case update task
    it("should update task", async () => {
        // Make a POST request to the app endpoint
        const response = await request(app)
            .put('/api/v1/tasks/1')
            .send({
                "title": "Update Login UI",
                "description": "Membuat Login UI #UNIT_TESTING dengan menggunakan react native, dengan login email dan no telepon",
                "startDate": "2024-05-25",
                "dueDate": "2024-05-30"
            });

        // Expectations
        expect(response.status).toBe(200); // Check if response status is 200 OK
    });
});
