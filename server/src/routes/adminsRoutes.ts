import {Router} from 'express';
import {administradoresController} from'../controllers/administradoresController';

class IndexRoutes {

   public router: Router = Router();

   constructor() {
      this.config();
   }

   config(): void {
      this.router.get('/', administradoresController.getAdministradores);
      this.router.get('/deudas', administradoresController.getDeudas);
      this.router.post('/deudas', administradoresController.addDeuda);
      this.router.get('/deudores', administradoresController.getDeudores);
      this.router.post('/deudores', administradoresController.createDeudor);
      this.router.get('/conceptos/:id', administradoresController.verConceptos);
      this.router.post('/pago/:id', administradoresController.addPago);
      this.router.get('/pago', administradoresController.getPagos);
   }

}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;