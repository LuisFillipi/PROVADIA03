import express, { request, response} from 'express';
import conn from './config/conn.js';
import cors from "cors"
import "dotenv/config"
import path from "node:path";


import routerPalestrante from './router/routerPalestrante.js';
import routerParticipante from './router/routerParticipante.js';

import "./models/palestranteModel.js"
import "./models/participanteModel.js"
import "./models/eventoModel.js"

const PORT = process.env.PORT  || 3333;
const app = express();

app.use(express.json());


app.use('/palestrante', routerPalestrante);
app.use('/participantes', routerParticipante)

app.get("*", (request, response)=>{
    response.status(404).json({message: "rota nao encontrada, ajuda jesus!!!!!!"});
})

app.listen(PORT, () => {
  console.log( `Servidor on no servidor ${PORT} `);
});
// base do desapega!