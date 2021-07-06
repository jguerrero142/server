import {Request, Response} from 'express';
import pool from '../database';

class PedidoController {
   public async list  (req: Request, res: Response){ 
    const pedido = await pool.query('SELECT * FROM pedido');
    res.json(pedido);  
    }

    public async listOne(req: Request, res: Response){
        const { id } = req.params;
        const pedido = await pool.query('SELECT * FROM pedido WHERE id_user = ?',[id]);
        res.json(pedido);  
        }

    public async listDataUser(req: Request, res: Response){
            const { id } = req.params;
            const dataUserPedido = await pool.query('SELECT (pedido.id),(pedido.created_at),(pedido.valor),(user.id_user) ,(user.nickname),(user.name),(user.picture),(user.email) FROM pedido INNER JOIN user ON user.id_user = pedido.id_user WHERE pedido.id_user = ?',[id]);
            res.json(dataUserPedido);  
            }

    public async getOne  (req: Request, res: Response): Promise<any>{ 
        const { id } = req.params;
        const pedido = await pool.query('SELECT * FROM pedido WHERE id_user = ?',[id]);
        if (pedido.length > 0){
            return res.json(pedido[0]);
        }
        res.status(404).json({text: 'el pedido no existe'});  
        }

    public async create(req: Request, res: Response){
        await pool.query('INSERT INTO pedido set ?', [req.body]);
        const id_pedido = await pool.query('SELECT id FROM pedido WHERE estado_ped = true');
        await pool.query('UPDATE pedido set estado_ped = false WHERE estado_ped = true');
        return res.json(id_pedido[0]);
        }
        
    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM pedido WHERE id_user = ?', [id]);
        res.json({message: 'the pedido was deleted'});
    }
    public async update(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query ('UPDATE pedido set ? WHERE id_user=?',[req.body, id]);
        res.json({text: 'el  pedido fue actualizado '});
    }
}

const pedidoController = new PedidoController();
export default pedidoController;