"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const administradoresController_1 = require("../controllers/administradoresController");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', administradoresController_1.administradoresController.getAdministradores);
        this.router.get('/deudas', administradoresController_1.administradoresController.getDeudas);
        this.router.post('/deudas', administradoresController_1.administradoresController.addDeuda);
        this.router.get('/deudores', administradoresController_1.administradoresController.getDeudores);
        this.router.post('/deudores', administradoresController_1.administradoresController.createDeudor);
        this.router.get('/conceptos/:id', administradoresController_1.administradoresController.verConceptos);
        this.router.post('/pago/:id', administradoresController_1.administradoresController.addPago);
        this.router.get('/pago', administradoresController_1.administradoresController.getPagos);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
