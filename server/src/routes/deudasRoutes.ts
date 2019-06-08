import {Router} from 'express';
import {deudoresController} from '../controllers/deudoresController';

class GamesRoutes {

   public router: Router = Router();

   constructor() {
      this.config();
   }

   config(): void {
      this.router.get('/', deudoresController.getDeudores);
   }

}

const gamesRoutes = new GamesRoutes();
export default gamesRoutes.router;