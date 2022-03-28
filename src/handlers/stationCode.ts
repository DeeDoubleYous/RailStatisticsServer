import { executeQuery } from "../db/interactor";
import { Request, Response } from "express";
import { checkKey } from "../checker/keyChecker";

export const stationCode = async (req: Request, res: Response) => {
    console.log(req);
    if(!checkKey(req.query.key as string)){
        res.status(403);
        res.end();
        return;
    }
    try{
        if(req.query.station){
            const sql = 'SELECT s.code as code, s.station as station FROM Stations s WHERE s.Station = UPPER(?)';

            const request = await executeQuery(sql, [req.query.station]);

            if(request){
                res.status(200);
                res.json(request);
                return;
            }
        }else{
            res.status(204);
            res.end();
        }
    }catch(e){
        console.error(e);
        res.status(500);
        res.end();
    }
}