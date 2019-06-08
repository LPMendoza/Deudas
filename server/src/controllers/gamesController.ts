import {Request, Response} from 'express';

import pool from '../database';

class GamesController {
   
   public async getDeudores(req: Request, res: Response) {

      const deudores = await pool.query('SELECT * FROM deudores');
      res.json(deudores);
   }


}

export const gamesController = new GamesController();