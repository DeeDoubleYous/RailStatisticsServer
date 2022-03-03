import { Request, Response } from 'express';
import { executeQuery } from '../db/interactor';

export const readLog =async (req: Request, res: Response) => {
    try{
        const sql = 'SELECT l.LayerTitle, COUNT(lu.UsageID) AS UsageCount FROM Layers l INNER JOIN LayerUsage lu ON l.LayerID = lu.LayerId GROUP BY l.LayerID';

        const results = await executeQuery(sql, []);

        if(results){
            res.status(200);
            res.json(results);
        }
    }catch(e){
        res.status(204);
        res.end();
    }
}