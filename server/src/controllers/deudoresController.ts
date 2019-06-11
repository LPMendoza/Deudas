import {Request, Response} from 'express';

import pool from '../database';

class DeudoresController {
   
   public async getDeudas(req: Request, res: Response) {

      //consultar deudas del usuario logeado parametro id(telefono) por url
      const deudas = await pool.query(`SELECT * FROM deudas WHERE id_deudor = ${req.params.id}`);
      res.json(deudas);
   }

   //consultar pagos del usuario logeado parametro id(telefono) por url
   public async getPagos(req: Request, res: Response) {

      const pagos = await pool.query(`SELECT *,(select debe from deudas where referencia = referencia_deuda) FROM pagos WHERE id_deudor = ${req.params.id}`);
      res.json(pagos);
   }
   
   //consultar adeudo total restante del usuario logeado parametro id(telefono) por url
   public async getAdeudo(req: Request, res: Response) {

      const adeudo = await pool.query(`SELECT adeudo FROM deudores WHERE telefono = ${req.params.id}`);
      res.json(adeudo);
   }
}

export const deudoresController = new DeudoresController();