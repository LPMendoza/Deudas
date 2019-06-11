import {Router} from 'express';
import {deudoresController} from '../controllers/deudoresController';

class GamesRoutes {

   public router: Router = Router();

   constructor() {
      this.config();
   }

   config(): void {
      this.router.get('/:id', deudoresController.getAdeudo);
      this.router.get('/deudas/:id', deudoresController.getDeudas);
      this.router.get('/pagos/:id', deudoresController.getPagos);
   }

}

const gamesRoutes = new GamesRoutes();
export default gamesRoutes.router;