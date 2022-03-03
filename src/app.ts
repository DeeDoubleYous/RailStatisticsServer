import express from 'express';
import { logUses } from './handlers/logUses';

const app = express();

const port = 8000;

app.use(express.json());

app.put('/railvisstats/log', logUses);

app.listen(port, () => {
    console.log(`App is listening on https://localhost:${port}`);
});