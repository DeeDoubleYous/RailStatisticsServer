import express from 'express';
import { json, urlencoded } from 'body-parser';
import { readLog, readTotal } from './handlers/readLog';
import { logUse } from './handlers/logUse';

const app = express();

const port = 8080;
const appName = `railvisstats`;

app.use(json());
app.use(urlencoded());

app.post(`/${appName}/log`, logUse);

app.get(`/${appName}/log`, readLog);

app.get(`/${appName}/log/total`, readTotal);

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`);
});