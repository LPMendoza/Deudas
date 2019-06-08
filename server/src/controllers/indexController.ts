import {Request, Response} from 'express';
import pool from '../database';
class IndexController {

   public async getAdministradores(req: Request, res: Response) {

      const administradores = await pool.query('SELECT * FROM administradores');
      res.json(administradores);
   }

}

export const indexController = new IndexController();