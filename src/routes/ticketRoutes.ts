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
        this.router.post('/', ticketController.create);
        this.router.put('/:id', ticketController.update);
        this.router.delete('/:id', ticketController.delete);

        //Routes creadas
        //Obtiene los tickets de un pedido
        this.router.get('/ticketPedido/:id', ticketController.getTicket);
        //Obtiene los tickets que estan en estado true
        this.router.get('/data/ticket/:id', ticketController.getData);
        //Obtiene el valor total de los tickets en estado true.
        this.router.get('/data/total/:id', ticketController.getTotal);
        
        this.router.put('/pedido/id/:id', ticketController.addPedido);
    }
}

const ticketRoutes = new TicketRoutes();
export default ticketRoutes.router;