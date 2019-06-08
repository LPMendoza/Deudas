"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deudoresController_1 = require("../controllers/deudoresController");
class GamesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', deudoresController_1.deudoresController.getDeudores);
    }
}
const gamesRoutes = new GamesRoutes();
exports.default = gamesRoutes.router;
