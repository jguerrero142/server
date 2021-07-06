import {Router} from 'express';
import pedidoController from '../controllers/pedidoController';



class PedidoRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
        }

    config(): void{
        
        this.router.get('/', pedidoController.list);
        this.router.get('/user/:id', pedidoController.listOne);
        this.router.get('/dataPedido/:id', pedidoController.listDataUser);
        this.router.get('/:id', pedidoController.getOne);
        this.router.post('/', pedidoController.create);
        this.router.put('/:id', pedidoController.update);
        this.router.delete('/:id', pedidoController.delete);
    }
}

const pedidoRoutes = new PedidoRoutes();
export default pedidoRoutes.router;