import {Request, Response} from 'express';
import pool from '../database';
class AdministradoresController {

   public async getAdministradores(req: Request, res: Response) {

      const administradores = await pool.query('SELECT * FROM administradores');
      res.json(administradores);
   }

   public async getDeudores(req: Request, res: Response) {

      const deudores = await pool.query('SELECT * FROM deudores');
      res.json(deudores);
   }

   public async getDeudas(req: Request, res: Response) {

      const deudores = await pool.query('SELECT * FROM deudas');
      res.json(deudores);
   }

   public async createDeudor(req: Request, res: Response): Promise<void> {

      const result = await pool.query('INSERT INTO deudores set ?', [req.body]);
      res.json({message: 'Deudor guardado'});
   }

   public async addDeuda(req: Request, res: Response): Promise<void> {

      const concepto = req.body.concepto;
      const deudores = req.body.deudores;

      deudores.forEach(async (deudor: string) => {

         const result = await pool.query(`INSERT INTO pseudo_deudas(concepto,id_deudor) VALUES("${concepto}", "${deudor}")`);
      });
      res.json({message: 'Deuda agregada'});

   }

   public async verConceptos (req: Request, res: Response) {

      const conceptos = await pool.query(`SELECT concepto FROM conceptos WHERE id_administrador = ${req.params.id}`);
      res.json(conceptos);

   }

   public async addPago(req: Request, res: Response): Promise<void> {

      const id_administrador = req.params.id;
      const id_deudor = req.body.id_deudor;
      const referencia_deuda = req.body.referencia_deuda;
      const monto = req.body.monto;

      const result = await pool.query(`INSERT INTO pagos(id_administrador,id_deudor, referencia_deuda, monto, fecha) VALUES(${id_administrador}, ${id_deudor}, ${referencia_deuda}, ${monto}, now())`);

      res.json({message: 'Pago agregado'});

   }


}

export const administradoresController = new AdministradoresController();