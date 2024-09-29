import express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const main = async () => {
    const config = JSON.parse(readFileSync(join(__dirname, 'data', 'config.json'), 'utf-8'));
    const temp = config.temp;

    const app = express();

    app.get('/hi', (req, res) => {
        res.status(200).send('Hi from imba!');
    });

    app.get('/config/temp', (req, res) => {
        res.status(200).send(temp);
    });

    app.post('/config/temp/:content', (req, res) => {
        const content = req.params.content;
        const newConfig = JSON.stringify({ temp: content }, null, '\t');
        writeFileSync(join(__dirname, 'data', 'config.json'), newConfig, 'utf-8');
        res.status(200).json(newConfig);
    });

    const server = app.listen(1111, () => {
        console.log('Express http server listening at 1111 port.');
    });
};

main();
