const request = require('supertest');
const app = require('../app');

// ----------------------------
// 1. GET /equipos
// ----------------------------
describe("GET /equipos", () => {
  it("Debe responder un array y status 200", async () => {
    const response = await request(app).get('/equipos');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

// ----------------------------
// 2. POST /login (correcto)
// ----------------------------
describe("POST /login correcto", () => {
  it("Debe responder status 200 y un objeto con token", async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: "admin", password: "1234" });

    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toBe("object");
    expect(response.body.token).toBeDefined();
  });
});

// ----------------------------
// 3. POST /login (incorrecto)
// ----------------------------
describe("POST /login incorrecto", () => {
  it("Debe responder status 400 si las credenciales fallan", async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: "admin", password: "nope" });

    expect(response.statusCode).toBe(400);
  });
});

// ----------------------------
// 4. POST /equipos/:teamID/jugadores (token válido)
// ----------------------------
describe("POST /equipos/:teamID/jugadores", () => {
  it("Debe responder status 201 cuando el token es válido", async () => {

    
    const login = await request(app)
      .post('/login')
      .send({ username: "admin", password: "1234" });

    const token = login.body.token;

 
    const response = await request(app)
      .post('/equipos/1/jugadores')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: "Test Player", posicion: "delantero" });

    expect(response.statusCode).toBe(201);
  });
});
