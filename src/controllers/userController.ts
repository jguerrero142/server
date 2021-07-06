import {Request, Response} from 'express';
import pool from '../database';

class UserController {
   public async list  (req: Request, res: Response){ 
    const user = await pool.query('SELECT * FROM user');
    res.json(user);  
    }
    public async getOne  (req: Request, res: Response): Promise<any>{ 
        const { id } = req.params;
        const user = await pool.query('SELECT * FROM user WHERE sub =?',[id]);
        if (user.length > 0){
            return res.json(user[0]);
        }
        res.status(404).json({text: 'el usuario no existe'});  
        }
    
    public async getUser  (req: Request, res: Response): Promise<any>{ 
            const { id } = req.params;
            const user = await pool.query('SELECT * FROM user WHERE id_user =?',[id]);
            if (user.length > 0){
                return res.json(user[0]);
            }
            res.status(404).json({text: 'el usuario no existe'});  
            }

    public async create(req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO user set ?', [req.body]);
        res.json({message: 'usuario guardados'});
    }
    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM user WHERE id_user = ?', [id]);
        res.json({message: 'the user was deleted'});
    }
    public async update(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query ('UPDATE user set ? WHERE id_user=?',[req.body, id]);
        res.json({text: 'el  usuario fue actualizado '});
    }
}

const userController = new UserController();
export default userController;