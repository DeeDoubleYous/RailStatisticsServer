import { Request, Response } from "express";
import { checkKey } from "../checker/keyChecker";
import { executeQuery } from "../db/interactor";

export const logUse = async (req: Request, res: Response): Promise<void> => {
    if(!checkKey(req.body.key as string)){
        res.status(403);
        res.end();
    }

    try{
        if(req.body.layerId && req.body.timeStamp){
            const sql = 'INSERT INTO LayerUsage (LayerId, Timestamp) VALUES (?, ?)';
            const result = await executeQuery(sql, [req.body.layerId, req.body.timeStamp]);
            if(result){
                res.status(200);
                res.json(result);
            }else {
                res.status(400);
                res.end();
            }
        }else{
            res.status(400);
            res.end();
        }
    }catch(e){
        res.status(204);
        console.error(e);
        res.end();
    }
}