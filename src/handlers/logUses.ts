import {Request, Response} from 'express';
import { executeQuery } from '../db/interactor';
import { checkKey } from '../checker/keyChecker';

export const logUses = async (req: Request, res: Response): Promise<void> => {
    if(!checkKey(req.body.key)){
        res.status(403);
        res.end();
    }

    try{
        if(req.body.layerId && req.body.timestamp){
            const sql = 'INSERT INTO LayerUsage (LayerId, Timestamp) VALUES (?, ?)';
            const result = await executeQuery(sql, [req.body.layerId, req.body.timestamp]);

            if(result){
                res.status(200);
                res.json(result);
            }else {
                res.status(400);
                res.end();
            }
        }
    }catch(e){
        res.status(204);
        res.end();
    }
};