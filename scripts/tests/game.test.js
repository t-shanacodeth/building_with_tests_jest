/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://jestjs.io/"}
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns } = require("../game");

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
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBeTruthy();
    })
});

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 12;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "12";
        newGame();
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should add one move to the computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});

describe("gameplay works corrently", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    })
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    })
    test("addTurn adds a new turn to the game function", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    })
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    })
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 15;
        showTurns();
        expect(game.turnNumber).toBe(0);
    })
})