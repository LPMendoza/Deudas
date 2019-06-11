"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class DeudoresController {
    getDeudas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //consultar deudas del usuario logeado parametro id(telefono) por url
            const deudas = yield database_1.default.query(`SELECT * FROM deudas WHERE id_deudor = ${req.params.id}`);
            res.json(deudas);
        });
    }
    //consultar pagos del usuario logeado parametro id(telefono) por url
    getPagos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagos = yield database_1.default.query(`SELECT *,(select debe from deudas where referencia = referencia_deuda) FROM pagos WHERE id_deudor = ${req.params.id}`);
            res.json(pagos);
        });
    }
    //consultar adeudo total restante del usuario logeado parametro id(telefono) por url
    getAdeudo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const adeudo = yield database_1.default.query(`SELECT adeudo FROM deudores WHERE telefono = ${req.params.id}`);
            res.json(adeudo);
        });
    }
}
exports.deudoresController = new DeudoresController();
