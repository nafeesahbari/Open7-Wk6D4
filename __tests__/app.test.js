const request = require('supertest');
const app = require('../src/app.js');
const User = require('../src/models/User.js');

jest.mock("../src/models/User.js", () => ({ create: jest.fn()}))

describe('User routes', () => {
  describe('CREATE functionality', () => {
    it('should successfully create a user and return 200', async () => {
      //ARRANGE
      const userData = {
        username: 'testuser',
        password: 'testpassword',
        email: 'test@test.com'
      }
      User.create.mockResolvedValue(userData);
      
      //ACT
      const response = await request(app).post("/users").send(userData);

      //ASSERT - expect response status to be 200
      expect(response.status).toBe(200);
      expect(response.text).toEqual('testuser');
      expect(User.create).toHaveBeenCalled();
    });
    it('should return an error if user creation fails', async () => {
      //ARRANGE
      const userData = {
        username: 'testuser',
        password: 'testpassword',
        email: 'test@test.com'
      }
      User.create.mockRejectedValue(new Error('User creation failed'));
      
      //ACT
      const response = await request(app).post("/users").send(userData);
      
      //ASSERT
      expect(response.status).toBe(500);
      expect(User.create).toHaveBeenCalled();
      expect(response.text).toContain('User creation failed');
    });

    
    it("should return error message if password isn't strong", async () => {
      const invalidPwUserData = {
        username: "testuser",
        password: "test",
        email: "testuser@example.com",
      };
      
      const response = await request(app)
        .post("/users")
        .send(invalidPwUserData);

      expect(response.status).toBe(500);
      expect(response.text).toContain(
        "Password must contain at least one uppercase character and one special character"
      );
    });
    it("should return error if email isn't valid", async () => {
      const invalidEmailUserData = {
        username: "testuser",
        password: "TestPassword!",
        email: "testuser",
      };
      
      const response = await request(app)
        .post("/users")
        .send(invalidEmailUserData);

      expect(response.status).toBe(500);
      expect(response.text).toContain(
        "Email format is invalid"
      );
    });
  })
})