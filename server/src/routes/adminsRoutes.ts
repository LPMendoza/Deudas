import {Router} from 'express';
import {administradoresController} from'../controllers/administradoresController';

class IndexRoutes {

   public router: Router = Router();

   constructor() {
      this.config();
   }

   config(): void {
      this.router.get('/', administradoresController.getAdministradores);
      this.router.get('/deudores', administradoresController.getDeudores);
      this.router.post('/deudores', administradoresController.createDeudor);
   }

}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;