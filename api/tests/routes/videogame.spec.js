/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
};

describe("Videogame routes", () => {
  const id = 22511;

  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Videogame.sync({ force: true }).then(() => Videogame.create(videogame))
  );
  describe("GET /gameID", () => {
    it("should get 200", () => {
      agent.get("/game/id?ID=" + id).expect(200);
    });
    it("should recieve array", () => {
      agent.get("/game/id?ID=" + id).then((res) => {
        expect(Array.isArray(res.body)).toBe(true)
      });
    });
    it("response should get same id", () => {
      agent.get("/game/id?ID=" + id).then((res) => {
        expect(res.body[0].id).toBe(id);
      });
    });
  });
});

