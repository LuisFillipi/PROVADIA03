import { Router } from "express";
import {createEvent, getAgenda, createParticipante, inscreverParticipante, enviarFeedBack, editarEvento, cancelarEvento, enviarFeedBack} from "../controller/eventosController.js";
import verificarToken from '../helpers/get-token.js';

const router = Router(); 


router.post("/eventos/criar", verificarToken, createEvent);
router.get("/eventos/agenda", getAgenda);
router.post("/eventos/inscrever", verificarToken, inscreverParticipante);
router.post("/eventos/participantes/registrar", createParticipante);
router.post("/eventos/feedback", verificarToken, enviarFeedBack);
router.put("/eventos/editar", verificarToken, editarEvento);
router.delete("/eventos/cancelar", verificarToken, cancelarEvento);

export default router;

// base do desapega!