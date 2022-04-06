import { Request, Response } from "express";
import { checkKey } from "../checker/keyChecker";
import { checkIfStation, lookUpStation } from "../stations/lookupStation";

export const stationCode = async (req: Request, res: Response) => {
    if(!checkKey(req.query.key as string)){
        res.status(403);
        res.end();
        return;
    }
    try{
        if(!req.query.stationName || !req.query.stationPostcode){
            res.status(400);
            res.end();
            return;
        }

        const station = await lookUpStation(req.query.stationName as string, req.query.stationPostcode as string);

        if(station.code === 'Not found'){
            res.status(404);
        }else{
            res.status(200);
        }
        res.json(station);
    }catch(e){
        console.error(e);
        res.status(500);
        res.end();
    }
}

export const checkStation = async (req: Request, res: Response) => {
    if(!checkKey(req.query.key as string)){
        res.status(403);
        res.end();
        return;
    }

    try{
        if(!req.query.stationName){
            res.status(400);
            res.end();
            return;
        }

        const stationExists = await checkIfStation(req.query.stationName as string);

        res.status(200);
        res.send(stationExists);
    }catch (e){
        console.error(e);
        res.status(500);
        res.end();
    }
}