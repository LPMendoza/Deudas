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
    //consultar información de administradores
    getAdministradores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const administradores = yield database_1.default.query('SELECT * FROM administradores');
            res.json(administradores);
        });
    }
    //consultar información de todos los deudores
    getDeudores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deudores = yield database_1.default.query('SELECT * FROM deudores');
            res.json(deudores);
        });
    }
    //consutar todas las deudas
    getDeudas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deudas = yield database_1.default.query(`SELECT * FROM deudas`);
            res.json(deudas);
        });
    }
    //agregar un nuevo deudor {"telefono" : "", "pass" :"","nombre":"","adeudo" :0,"mail" :""}
    createDeudor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO deudores set ?', [req.body]);
            res.json({ message: 'Deudor guardado' });
        });
    }
    //agregar un nueva deuda {"concepto" : "", "deudores" :[]}
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
    //consulatr todos los conceptos
    verConceptos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conceptos = yield database_1.default.query(`SELECT concepto FROM conceptos WHERE id_administrador = ${req.params.id}`);
            res.json(conceptos);
        });
    }
    // agregar un pago {"id_deudor":"","referencia_deuda":number,monto:number} y id_administrador(id) por url
    addPago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_administrador = req.params.id;
            const id_deudor = req.body.id_deudor;
            const referencia_deuda = req.body.referencia_deuda;
            const monto = req.body.monto;
            const result = yield database_1.default.query(`INSERT INTO pagos(id_administrador,id_deudor, referencia_deuda, monto, fecha) VALUES(${id_administrador}, ${id_deudor}, ${referencia_deuda}, ${monto}, now())`);
            const resta_deuda = yield database_1.default.query(`UPDATE deudas SET debe = deudas.debe - ${monto} WHERE referencia = ${referencia_deuda}`);
            const debe_actual = yield database_1.default.query(`SELECT debe FROM deudas WHERE referencia = ${referencia_deuda}`);
            if (debe_actual[0].debe == 0) {
                const estado = yield database_1.default.query(`UPDATE deudas SET estado = "PAGADO" WHERE referencia = ${referencia_deuda}`);
            }
            const saldo = yield database_1.default.query(`UPDATE deudores SET adeudo = adeudo - ${monto} WHERE telefono = ${id_deudor}`);
            res.json({ message: 'Pago agregado' });
        });
    }
    //consultar todos los pagos
    getPagos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagos = yield database_1.default.query(`SELECT *,(select debe from deudas where referencia = referencia_deuda) as adeudo FROM pagos`);
            console.log(pagos);
            res.json(pagos);
        });
    }
    //consular los pagos con filtros, por mes y por deudor, {"id_deudor":"","mes":}
    filterPagos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //mes == null, busca por numero de telefono(id_deudor)
            if (req.body.mes == null && req.body.id_deudor != '') {
                const pagos = yield database_1.default.query(`SELECT *,(select debe from deudas where referencia = referencia_deuda) FROM pagos WHERE id_deudor = ${req.body.id_deudor}`);
            }
            //id_deudor == null, busca por mes
            else if (req.body.mes != null && req.body.id_deudor == '') {
                const pagos = yield database_1.default.query(`SELECT *,(select debe from deudas where referencia = referencia_deuda) FROM pagos WHERE MONTH(fecha) = ${req.body.mes}`);
            }
            //mes y id_deudor(telefono) = null, busca todos llamando metodo getPagos()
            else {
                this.getPagos(req, res);
            }
        });
    }
}
exports.administradoresController = new AdministradoresController();
