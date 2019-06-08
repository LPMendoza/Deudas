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

   public async createDeudor(req: Request, res: Response): Promise<void> {

      const result = await pool.query('INSERT INTO deudores set ?', [req.body]);
      res.json({message: 'Deudor guardado'});
   }

}

export const administradoresController = new AdministradoresController();