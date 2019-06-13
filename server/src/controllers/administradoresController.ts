import {Request, Response} from 'express';
import pool from '../database';
class AdministradoresController {

   //consultar información de administradores
   public async getAdministradores(req: Request, res: Response) {

      const administradores = await pool.query('SELECT * FROM administradores');
      res.json(administradores);
   }

   //consultar información de todos los deudores
   public async getDeudores(req: Request, res: Response) {

      const deudores = await pool.query('SELECT * FROM deudores');
      res.json(deudores);
   }

   //consutar todas las deudas
   public async getDeudas(req: Request, res: Response) {

      const deudas = await pool.query(`SELECT * FROM deudas`);
      res.json(deudas);
   }

   //agregar un nuevo deudor {"telefono" : "", "pass" :"","nombre":"","adeudo" :0,"mail" :""}
   public async createDeudor(req: Request, res: Response): Promise<void> {

      const result = await pool.query('INSERT INTO deudores set ?', [req.body]);
      res.json({message: 'Deudor guardado'});
   }

   //agregar un nueva deuda {"concepto" : "", "deudores" :[]}
   public async addDeuda(req: Request, res: Response): Promise<void> {

      const concepto = req.body.concepto;
      const deudores = req.body.deudores;

      deudores.forEach(async (deudor: string) => {

         const result = await pool.query(`INSERT INTO pseudo_deudas(concepto,id_deudor) VALUES("${concepto}", "${deudor}")`);
      });
      res.json({message: 'Deuda agregada'});

   }

   //consulatr todos los conceptos
   public async verConceptos (req: Request, res: Response) {

      const conceptos = await pool.query(`SELECT concepto FROM conceptos WHERE id_administrador = ${req.params.id}`);
      res.json(conceptos);

   }

   // agregar un pago {"id_deudor":"","referencia_deuda":number,monto:number} y id_administrador(id) por url
   public async addPago(req: Request, res: Response): Promise<void> {

      const id_administrador = req.params.id;
      const id_deudor = req.body.id_deudor;
      const referencia_deuda = req.body.referencia_deuda;
      const monto = req.body.monto;

      const result = await pool.query(`INSERT INTO pagos(id_administrador,id_deudor, referencia_deuda, monto, fecha) VALUES(${id_administrador}, ${id_deudor}, ${referencia_deuda}, ${monto}, now())`);
      const resta_deuda = await pool.query(`UPDATE deudas SET debe = deudas.debe - ${monto} WHERE referencia = ${referencia_deuda}`);
      const debe_actual = await pool.query(`SELECT debe FROM deudas WHERE referencia = ${referencia_deuda}`);
      if (debe_actual[0].debe == 0) {
         const estado = await pool.query(`UPDATE deudas SET estado = "PAGADO" WHERE referencia = ${referencia_deuda}`);
      }
      const saldo = await pool.query(`UPDATE deudores SET adeudo = adeudo - ${monto} WHERE telefono = ${id_deudor    }`);
      res.json({message: 'Pago agregado'});

   }

   //consultar todos los pagos
   public async getPagos(req: Request, res: Response) {
      const pagos = await pool.query(`SELECT *,(select debe from deudas where referencia = referencia_deuda) as adeudo FROM pagos`);
      res.json(pagos);
   }

   //consular los pagos con filtros, por mes y por deudor, {"id_deudor":"","mes":}
   public async filterPagos(req: Request, res: Response){
      //mes == null, busca por numero de telefono(id_deudor)
      if (req.body.mes == 0 && req.body.id_deudor != '') {
         const pagos = await pool.query(`SELECT *,(select debe from deudas WHERE referencia = referencia_deuda) as adeudo FROM pagos WHERE id_deudor = ${req.body.id_deudor}`);
         res.json(pagos);
      }
      //id_deudor == null, busca por mes
      else if (req.body.mes != 0 && req.body.id_deudor == ''){
         const pagos = await pool.query(`SELECT * ,(select debe from deudas WHERE referencia = referencia_deuda) as adeudo FROM pagos WHERE MONTH(fecha) = ${req.body.mes}`);
         res.json(pagos);
      }
      //id_deudor == null, busca por mes
      else if (req.body.mes != 0 && req.body.id_deudor != ''){
         const pagos = await pool.query(`SELECT * ,(select debe from deudas WHERE referencia = referencia_deuda) as adeudo FROM pagos WHERE MONTH(fecha) = ${req.body.mes} AND id_deudor = ${req.body.id_deudor}`);
         res.json(pagos);
      }
      //mes y id_deudor(telefono) = null, busca todos llamando metodo getPagos()
      else {
         const pagos = await pool.query(`SELECT * ,(select debe from deudas WHERE referencia = referencia_deuda) as adeudo FROM pagos`);
         res.json(pagos);
      }
   }

}

export const administradoresController = new AdministradoresController();