import {Router} from 'express';
import ticketController from '../controllers/ticketController';


class TicketRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
        }

    config(): void{
        
        this.router.get('/', ticketController.list);
        this.router.get('/:id', ticketController.getOne);
        this.router.get('/data/ticket', ticketController.getData);
        this.router.get('/data/total', ticketController.getTotal);
        this.router.post('/', ticketController.create);
        this.router.put('/:id', ticketController.update);
        this.router.delete('/:id', ticketController.delete);
        this.router.put('/pedido/id/:id', ticketController.addPedido);
    }
}

const ticketRoutes = new TicketRoutes();
export default ticketRoutes.router;