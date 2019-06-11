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
        this.router.get('/:id', deudoresController_1.deudoresController.getAdeudo);
        this.router.get('/deudas/:id', deudoresController_1.deudoresController.getDeudas);
        this.router.get('/pagos/:id', deudoresController_1.deudoresController.getPagos);
    }
}
const gamesRoutes = new GamesRoutes();
exports.default = gamesRoutes.router;
