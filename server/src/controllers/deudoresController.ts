import {Request, Response} from 'express';

import pool from '../database';

class DeudoresController {
   
   public async getDeudores(req: Request, res: Response) {

      const deudores = await pool.query('SELECT * FROM deudores');
      res.json(deudores);
   }


}

export const deudoresController = new DeudoresController();