const request = require('supertest');
const app = require('../server.js'); // Replace with path to your Express app

describe('Profile API Endpoints', () => {
  let token;

  // Optional: Log in or generate a test JWT before tests
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth')
      .send({ "user": "walt1", "pwd": "Aa$12345"  });
    
    token = res.body.token;
  });

  it('should create a profile', async () => {
    const res = await request(app)
      .post('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: '6442d9acbb45b31700fa23aa',
        personalInfo: {
          title: '6442d9acbb45b31700fa2398',
          surname: 'Doe',
          forename: 'John',
          gender: '6442d9acbb45b31700fa2370',
          dateOfBirth: '01/01/1990'
        },
        contactInfo: {
          homeAddress: {
            buildingOrHouse: '123',
            countyCityOrPostCode: 'Dublin',
            eircode: 'D01X2X0'
          },
          mobile: '0871234567',
          emailWork: 'john.doe@work.com',
          preferredEmail: 'work'
        },
        extras: { termsAccepted: true }
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get all profiles', async () => {
    const res = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
