import express from 'express';
import { json, urlencoded } from 'body-parser';
import { readLog } from './handlers/readLog';
import { logUse } from './handlers/logUse';

const app = express();

const port = 8080;

app.use(json());
app.use(urlencoded());

app.post('/railvisstats/log', logUse);

app.get('/railvisstats/log', readLog);

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`);
});