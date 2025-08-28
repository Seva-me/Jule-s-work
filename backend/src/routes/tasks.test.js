const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../../models');

let token;

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await sequelize.sync({ force: true });

  // Create a user and log in to get a token
  await request(app)
    .post('/api/users/signup')
    .send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });
  const res = await request(app)
    .post('/api/users/login')
    .send({
      email: 'test@example.com',
      password: 'password123',
    });
  token = res.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Task CRUD Routes', () => {
  let taskId;

  it('should create a new task for the logged-in user', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'This is a test task.',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    taskId = res.body.id;
  });

  it('should get all tasks for the logged-in user', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
  });

  it('should get a single task by ID', async () => {
    const res = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', taskId);
  });

  it('should update a task by ID', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Test Task',
        status: 'completed',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Test Task');
    expect(res.body).toHaveProperty('status', 'completed');
  });

  it('should delete a task by ID', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(204);
  });

  it('should not allow access to tasks without a token', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toEqual(401);
  });
});
