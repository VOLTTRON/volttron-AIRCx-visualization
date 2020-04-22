const _ = require("lodash");
const models = require("../../models");
const User = models.User;
const faker = require("faker");

describe("models.database.user", () => {
  afterAll(() => {
    return Promise.all([User.destroy({ truncate: true })]);
  });

  it("user should be created and retrieved", () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.name;
    User.create({
      email: email,
      password: password,
      name: name.lastName(),
      surname: name.firstName(),
    }).then((response) => {
      expect(response.email).toEqual(email);
      User.findOne({ where: { email } }).then((response) => {
        expect(response.email).toEqual(email);
      });
    });
  });
});
