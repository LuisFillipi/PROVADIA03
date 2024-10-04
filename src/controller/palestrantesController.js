import express from 'express';
import conn from '../config/conn.js';
import bcrypt from "bcrypt"
import { Jwt } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

// base do desapega!

const router = express.Router()

router.post('/palestrantes', (request, response) =>{

  const { nome, cargo, telefone, } = request.body
  const query = 'INSERT INTO palestrantes (nome, cargo, telefone) VALUES (?, ?, ?)';

  conn.query(query, [nome, cargo, telefone],(err, response) => {
    if (err) 
    console.error(err)
    response.status(500).json({err: "erro ao adicionar o palestrante!"})
    return
  })
  return response.status(200).json({message: "palestrante adicionado!"})
})

router.get('/palestrantes', (request, response)=> {
  const query = 'SELECT * FROM palestrantes'

  conn.query(query, (err, response)=> {
    if(err) 
    console.error(err)
    return response.status(500).json({err: "erro ao buscar palestrantes"})
  })
  return response.status(200).json({message: "palestrante adicionado!"})
})

export default router;
