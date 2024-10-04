import jwt from "jsonwebtoken"
import conn from "../config/conn.js"

const getUserByToken = async (token) => {
    return new Promise((resolve, reject) => {
        if(!token){
            return response.status(401).json({err: "Acesso negado"})
        }
        const decoded = jwt.verify(token, "SENHASUPERDIFICIL")
        const palestranteId = decoded.id 

        const checkSql = /*sql*/ `SELECT * FROM evento WHERE ?? = ?`
        const checkData = ["palestrante_id", palestranteId]

        conn.query(checkSql, checkData, (err, data) => {
            if(err){
                reject({status: 500, message: "Erro ao buscar evento ou palestrante"})
                return
            }else{
                resolve(data[0])
            }
        })
    })
}
export default getUserByToken;