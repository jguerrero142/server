import {Request, Response} from 'express';
import pool from '../database';

class TicketController {

    

   public async list(req: Request, res: Response){ 
    const ticket = await pool.query('SELECT * FROM ticket');
    res.json(ticket);  
    }
    public async getOne(req: Request, res: Response): Promise<any>{ 
        const { id } = req.params;
        const ticket = await pool.query('SELECT * FROM ticket WHERE id_ticket =?',[id]);
        if (ticket.length > 0){
            return res.json(ticket[0]);
        }
        res.status(404).json({text: 'el ticket no existe'});  
        }

    public async getTicket (req: Request, res: Response): Promise<any>{ 
            const { id } = req.params;
            const ticket = await pool.query('SELECT id_ticket,producto.name, producto.valor FROM ticket INNER JOIN producto ON producto.id = ticket.producto WHERE id_pedido =?',[id]);
            if (ticket.length > 0){
                return res.json(ticket);
            }
            res.status(404).json({text: 'el pedido no tiene tickets'});  
            }

    //Consulta todos los ticket en true 
    public async getData (req: Request, res: Response){
        const { id } = req.params;   
        const ticket = await pool.query('SELECT id_ticket,producto.name, producto.valor FROM ticket INNER JOIN producto ON producto.id = ticket.producto WHERE estado = true AND user_ticket = ?',[id]);
        res.json(ticket); 
        }
    //Consulta el valor TOTAL de los tickets en true
    public async getTotal (req: Request, res: Response){
        const { id } = req.params;   
        const total = await pool.query('SELECT SUM(producto.valor) AS Total FROM ticket INNER JOIN producto ON producto.id = ticket.producto WHERE estado = true AND user_ticket = ?',[id]);
        res.json(total); 
        }

    public async addPedido (req: Request, res: Response): Promise<void>{
            const { id } = req.params;
            await pool.query('UPDATE ticket set id_pedido = ? WHERE estado = true',[id, req.body]);
            await pool.query('UPDATE ticket set estado = 0 WHERE estado = 1');
            res.json({message: 'ticket asignado'});
            }
  
    public async create(req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO ticket set ?', [req.body]);
        res.json({message: 'ticket guardados'});
    }
    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM ticket WHERE id_ticket = ?', [id]);
        res.json({message: 'the ticket was deleted'});
    }
    public async update(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query ('UPDATE ticket set ? WHERE id_ticket =?',[req.body, id]);
        res.json({text: 'el  ticket fue actualizado '});
    }

    
}

const ticketController = new TicketController();
export default ticketController;