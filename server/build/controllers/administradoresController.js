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
class AdministradoresController {
    getAdministradores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const administradores = yield database_1.default.query('SELECT * FROM administradores');
            res.json(administradores);
        });
    }
    getDeudores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deudores = yield database_1.default.query('SELECT * FROM deudores');
            res.json(deudores);
        });
    }
    getDeudas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deudores = yield database_1.default.query('SELECT * FROM deudas');
            res.json(deudores);
        });
    }
    createDeudor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO deudores set ?', [req.body]);
            res.json({ message: 'Deudor guardado' });
        });
    }
    addDeuda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const concepto = req.body.concepto;
            const deudores = req.body.deudores;
            deudores.forEach((deudor) => __awaiter(this, void 0, void 0, function* () {
                const result = yield database_1.default.query(`INSERT INTO pseudo_deudas(concepto,id_deudor) VALUES("${concepto}", "${deudor}")`);
            }));
            res.json({ message: 'Deuda agregada' });
        });
    }
    verConceptos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conceptos = yield database_1.default.query(`SELECT concepto FROM conceptos WHERE id_administrador = ${req.params.id}`);
            res.json(conceptos);
        });
    }
    addPago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_administrador = req.params.id;
            const id_deudor = req.body.id_deudor;
            const referencia_deuda = req.body.referencia_deuda;
            const monto = req.body.monto;
            const result = yield database_1.default.query(`INSERT INTO pagos(id_administrador,id_deudor, referencia_deuda, monto, fecha) VALUES(${id_administrador}, ${id_deudor}, ${referencia_deuda}, ${monto}, now())`);
            res.json({ message: 'Pago agregado' });
        });
    }
}
exports.administradoresController = new AdministradoresController();
