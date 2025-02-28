/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://jestjs.io/"}
 */

const { game } = require("../game");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBeTruthy();
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBeTruthy();
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBeTruthy();
    });
    test("choices key exists", () => {
        expect("choices" in game).toBeTruthy();
    });
});