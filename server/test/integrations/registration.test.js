const _ = require("lodash");
const request = require("supertest");
const app = require("../../index.js");
const faker = require("faker");

describe("routes.api.user", () => {
  it("user should be able to login", () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    request(app)
      .post("/api/users/login")
      .send({ user: { email: email, password: password } })
      .set("Accept", "application/json")
      .then((response) => {
        //this user was not created before so it will return an error
        expect(response.status).toEqual(400);
      });
  });

  it("user should be able to register", () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    request(app)
      .post("/api/users/signup")
      .send({
        email: email,
        password: password,
        name: lastName,
        surname: firstName,
      })
      .set("Accept", "application/json")
      .then((response) => {
        expect(response.status).toEqual(200);
        const user = response.body;
        expect(user.email).toEqual(email);
        expect(user.password).toEqual(password);
        expect(user.name).toEqual(lastName);
        expect(user.surname).toEqual(firstName);
        //Now let's see if the user is able to login
        request(app)
          .post("/api/users/login")
          .send({ user: { email: email, password: password } })
          .set("Accept", "application/json")
          .then((response) => {
            expect(response.status).toEqual(200);
          });
      });
  });
});
