import {Request, Response} from 'express';
import pool from '../database';

class HeroesController {
   public async list  (req: Request, res: Response){ 
    const heroes = await pool.query('SELECT * FROM heroes');
    res.json(heroes);  
    }
    public async getOne  (req: Request, res: Response): Promise<any>{ 
        const { id } = req.params;
        const heroes = await pool.query('SELECT * FROM heroes WHERE id =?',[id]);
        if (heroes.length > 0){
            return res.json(heroes[0]);
        }
        res.status(404).json({text: 'el heroe no existe'});  
        }

    public async create(req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO heroes set ?', [req.body]);
        res.json({message: 'heroe guardados'});
    }
    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM heroes WHERE id = ?', [id]);
        res.json({message: 'the heroe was deleted'});
    }
    public async update(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query ('UPDATE heroes set ? WHERE id=?',[req.body, id]);
        res.json({text: 'el  heroe fue actualizado '});
    }
}

const heroesController = new HeroesController();
export default heroesController;