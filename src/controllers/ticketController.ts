import {Request, Response} from 'express';
import pool from '../database';

class TicketController {
   public async list  (req: Request, res: Response){ 
    const ticket = await pool.query('SELECT * FROM ticket');
    res.json(ticket);  
    }
    public async getOne  (req: Request, res: Response): Promise<any>{ 
        const { id } = req.params;
        const ticket = await pool.query('SELECT * FROM ticket WHERE id_ticket =?',[id]);
        if (ticket.length > 0){
            return res.json(ticket[0]);
        }
        res.status(404).json({text: 'el ticket no existe'});  
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