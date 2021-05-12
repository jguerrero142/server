import {Request, Response} from 'express';
import pool from '../database';

class ProductController {
   public async list  (req: Request, res: Response){ 
    const product = await pool.query('SELECT * FROM producto');
    res.json(product);  
    }
    public async getOne  (req: Request, res: Response): Promise<any>{ 
        const { id } = req.params;
        const product = await pool.query('SELECT * FROM producto WHERE id_producto =?',[id]);
        if (product.length > 0){
            return res.json(product[0]);
        }
        res.status(404).json({text: 'el producto no existe'});  
        }

    public async create(req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO producto set ?', [req.body]);
        res.json({message: 'producto guardados'});
    }
    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM producto WHERE id_producto = ?', [id]);
        res.json({message: 'the producto was deleted'});
    }
    public async update(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query ('UPDATE producto set ? WHERE id_producto =?',[req.body, id]);
        res.json({text: 'el  producto fue actualizado '});
    }
}

const productController = new ProductController();
export default productController;