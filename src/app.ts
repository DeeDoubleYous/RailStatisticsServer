import express from 'express';
import { logUses } from './handlers/logUses';
import { readLog } from './handlers/readLog';

const app = express();

const port = 8080;

app.use(express.json());

app.put('/railvisstats/log', logUses);

app.get('/railvisstats/log', readLog);

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`);
});