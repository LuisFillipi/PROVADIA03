// com base na atividade do "desapega"!

import mysql from "mysql2"

const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Sen@iDev77!.",
    database: "evento",
    port: "3306"
})

conn.query((err) => {
    if (err) {
        console.error(err);
        return
    }
    console.log('Conectado ao MySQL!');
  });
  
export default conn;