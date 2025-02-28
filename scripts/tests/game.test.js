/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://jestjs.io/"}
 */

const { game, newGame, showScore } = require("../game");

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
    test("choices key contain correct id", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
});

describe("newGame function works correctly", () => {
    beforeAll(() => {
        game.score = 12;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button2", "button4"];
        document.getElementById("score").innerText = 12;
        newGame();
    });
    test("newGame should set game score to 0", () => {
        expect(game.score).toEqual(0);
    });
    test("playerMoves should set to 0", () => {
        expect(game.playerMoves.length).toEqual(0);
    });
    test("currentGame should set to 0", () => {
        expect(game.currentGame.length).toEqual(0);
    });
    test("should display 0 for the element wiht id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});