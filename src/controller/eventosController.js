import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js"
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt"

// base do desapega!

export const createEvent = async (request, response) => {
    const { titulo, data,} = request.body

    const token = getToken (request);
    const user = await getUserByToken(token)

    if (!titulo){
        return response.status(400).json({message: "O titulo do evento é obrigatorio!"})
    }
    if(!data){
        return response.status(400).json({message: " A data do evento é obrigatoria!"})
    }
    
    const evento_id = uuidv4()

    const insertEventoSql = /*sql*/ `insert into eventos (evento_id, titulo, data, usuarios_id) VALUES (?, ?, ?, ?)`;
    const eventoData = [evento_id, titulo, data, user.usuario_id];

    conn.query(insertEventoSql, eventoData, (err) => {
        if (err) {
            console.error(err)
            return response.status(500).json({ err: "erro ao criar o evento"})
        }
        const insertPalestranteSql = /*sql*/ `insert into evento_palestrante(evento_palestrante_id, evento_id, palestrante_id) VALUES ?`;

        conn.query(insertPalestranteSql, [palestranteValues], (err) => {
            if (err){
                console.error(err)
                return response.status(500).json({err: " erro ao associar palestrante pro evento"});
            }
            return response.status(201).json({message: "evento criado!"})
        })
    })
}
export const getAgenda = (request, response) => {
const selectSql = /*sql*/` SELECT e.evento_id, e.titulo, e.data, GROUP_CONCAT(p.nome SEPARATOR ', ') AS palestrantes from eventos e 
LEFT JOIN evento_palestrante AS on e.evento_id = ep.evento_id
LEFT JOIN palestrante p on ep.palestrante_id = p.palestrante_id GROUP BY e.evento_id, e.titulo, e.data `

conn.query(selectSql, (err, data) => {
    if (err) {
        console.error(err)
        return response.status(500).json({err: " erro ao listar eventos"})
    }
    return response.status(200).json(data)
})

}
export const createParticipante = async (request, response) => {
    const { nome, email } = request.body;

    if (!nome) {
        return response.status(400).json({ message: "O nome do participante é obrigatório" })
    }
    if (!email) {
        return response.status(400).json({ message: "O e-mail do participante é obrigatório" })
    }

    const participante_id = uuidv4()

    const insertParticipanteSql = /*sql*/ `INSERT INTO participantes(participante_id, nome, email) VALUES(?, ?, ?)`;
    const participanteData = [participante_id, nome, email]

    conn.query(insertParticipanteSql, participanteData, (err) => {
        if (err) {
            console.error(err)
            return response.status(500).json({ err: "Erro ao cadastrar participante" })
        }
        return response.status(201).json({ message: "Participante cadastrado com sucesso" })
    })
}

export const inscreverParticipante = (request, response) => {
    const { participantesId, eventoId } = request.body;

    if (!participantesId || !eventoId) {
        return response.status(400).json({ message: "Participante e evento são obrigatórios" });
    }

    const insertInscricaoSql = /*sql*/ `INSERT INTO evento_participante(evento_participante_id, evento_id, participante_id) VALUES(?, ?, ?)`;
    const inscricaoData = [uuidv4(), eventoId, participantesId];

    conn.query(insertInscricaoSql, inscricaoData, (err) => {
        if (err) {
            console.error(err);
            return response.status(500).json({ err: "Erro ao inscrever participante no evento" });
        }
        return response.status(201).json({ message: "Participante inscrito com sucesso" });
    });
};

export const enviarFeedBack = (request, response) => {
    const {participantesId, eventoId, nota, comentario } = request.body

    if (!participantesId || !eventoId || !nota) {
        return response.status(400).json({message: "participante, evento e nota sao obrigatorios! "})

    }

    const feedback_id = uuidv4()

    const insertFeedBackSql = /*sql*/`
    INSERT INTO feedbacks(feedback_id, participante_id, evento_id, nota, comentario) VALUES (?, ?, ?, ?, ?)
    `
    const feedbackData = [feedback_id, participantesId, eventoId, nota, comentario]

    conn.query(insertFeedBackSql, feedbackData, (err) => {
        if(err)
        console.error(err)
        return response.status(500).json({err: "erro ao enviar feedback"})
    })
    return response.status(201).json({message: "feedback enviado com sucesso!"})
}

export const editarEvento = async ( request, response) => {
    const { eventoId, titulo, data, palestranteId } = request.body

    if (!eventoId || !titulo || !data || !palestranteId ) {
        return response.status(400).json({err: "evento, titulo, data e palestrante sao obrigatorios!"})
    }

    const updateEventoSql = /*sql*/ `
        UPDATE eventos SET titulo = ?, data = ? WHERE evento_id = ?`;

    const eventoData = [titulo, data, eventoId];

    conn.query  (updateEventoSql, eventoData, (err) => {
        if (err) {
            console.error(err);
            return response.status(500).json({err: "erro ao editar evento!"})
        }

        conn.query(updateEventoSql, [palestranteId, eventoId], (err) => {
            if (err) {
                console.error(err)
                return response.status(500).json({err: "Erro ao atualizar palestrante do evento."})
            }
            return response.status(500).json({message: "evento atualizado!"})
        })
    })
}

export const cancelarEvento = async (request, response) => {
    const {eventoId} = request.body

    if(!eventoId){
        return response.status(400).json({message: "o id do evento é obrigatorio!"})
    }

    const deleteEventosSql = /*sql*/`
    delete from eventos where evento_id = ?`

    conn.query(deleteEventosSql, [eventoId], (err) => {
        if(err) {
            console.error(err)
            return response.status(500).json({err: "erro ao cancelar evento"})
        }
        return response.status(200).json({message: "evento cancelado!"})
    })
}