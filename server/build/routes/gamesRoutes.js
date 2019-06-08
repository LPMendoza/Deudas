"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gamesController_1 = require("../controllers/gamesController");
class GamesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', gamesController_1.gamesController.getGames);
        this.router.post('/', gamesController_1.gamesController.createGames);
        this.router.put('/:id', gamesController_1.gamesController.updateGame);
        this.router.delete('/:id', gamesController_1.gamesController.deleteGame);
    }
}
const gamesRoutes = new GamesRoutes();
exports.default = gamesRoutes.router;
