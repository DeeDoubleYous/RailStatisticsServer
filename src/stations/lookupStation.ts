import fetch from 'node-fetch';

interface IStation {
    code: string,
    name: string,
    postcode: string
}

type resultsArray = [string, string, number, number, number, number, number, number, number, string, string];

const baseURL = 'https://ojp.nationalrail.co.uk/find/stationsDLRLU/';

const convertToStation = (station: resultsArray): IStation => {
    return {
        code: station[0],
        name: station[1],
        postcode: station[9]
    }
}

export const getStation = async (stationName: string) => {
    const searchUrl = `${baseURL}${encodeURIComponent(stationName)}`;

    const request = await fetch(searchUrl);

    const result = await request.json() as resultsArray[];

    if(result.length === 0){
        return null;
    }

    return result.map(convertToStation);
}


export const lookUpStation = async (stationName: string, stationPostCode: string) => {
    const results = await getStation(stationName);

    if(!results){
        return {
            code: 'Not Found',
            name: stationName,
            postcode: 'Likely not a station'
        };
    }
    
    return results.length === 1 && results[0].name.includes(stationName) ? results[0] : results.filter(station => station.postcode.includes(stationPostCode))[0];
}

export const checkIfStation = async (passedName: string): Promise<boolean> => {
    const results = await getStation(passedName);

    return results ? true : false;
}