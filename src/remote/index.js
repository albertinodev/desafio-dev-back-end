const mailServices = require("../services/email")
const firedata = require('../datastore/database');

const models = require('../models');
const modelAdmin = require('../models/Tool');
const modelParticipant = require("../models/participant");
const services = require('../services');

const login = async (req, res) => {
    try {
        const authorization = req.headers?.authorization;
        const idToken = authorization ? authorization.split(" ")[1] : null;

        if (!idToken) {
            return res.status(401).json({ type: "error", message: "Token de sessão não encontrado." });
        }

        const decodedToken = await firedata.auth.verifyIdToken(idToken);
        if (!decodedToken) {
            return res.status(401).json({ type: "error", message: "Usuário ou senha invalida, tente denovo!" });
        }

        const admin = await modelAdmin.getAdmin(decodedToken.uid);
        if (admin.data()) {
            res.status(200).json({ type: "success", userType: "admin", message: "Usuário logado com sucesso!" });
        } else {
            const participant = await modelParticipant.getParticipant(decodedToken.uid);
            if (participant.data()) {
                res.status(200).json({ type: "success", userType: "participant", message: "Usuário logado com sucesso!" });
            }
        }
    } catch (err) {
        const code = err?.code;
        if (code === "auth/id-token-expired") {
            res.status(401).json({ type: "error", message: "Token expirado" });
        } else {
            res.status(500).json({ type: "error", message: "Erro ao responder a requisição" });
        }
    }
}


const invoice = async (req, res) => {
    try {
        const { id } = req.params;
        const invoiceDoc = await models.getInvoiceById(id);
        if (invoiceDoc.data()) {
            const invoice = invoiceDoc.data();
            res.status(200).json({ type: "success", data: { invoice } });
        } else {
            res.status(404).json({ type: "error", message: "Fatura não encontrada" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ type: "error", message: "Erro ao buscar os dados." });
    }
}



const addNewView = async (req, res) => {
    try {
        const refreshDoc = await models.getRefresh();
        const refresh = refreshDoc.data();
        const views = parseInt(refresh.views) + 1;

        await models.addAppView("A9lDah36qjNXcWCfMmMU", { views });
        res.status(200).json({ type: "success", data: { views } });
    } catch (err) {
        res.status(500).json({ type: "error", message: "Erro ao dar view a plataforma." });
    }
}



const countRequisitions = async (req, res) => {
    try {
        const requisitionsDocs = await modelAdmin.getRequisitions();
        const total = requisitionsDocs.docs.length;

        res.status(200).json({ type: "success", data: { total } });
    } catch (err) {
        console.log(err);
        res.status(500).json({ type: "error", message: "Erro ao responder a requisição" });
    }
}



const subscribe = async (req, res) => {
    try {
        const authorization = req.headers?.authorization;
        const idToken = authorization ? authorization.split(" ")[1] : null;

        const { participant } = req.body;
        if (!idToken) {
            return res.status(401).json({ type: "error", message: "Não autorizado devido a  falta de token" });
        }
        
        const decodedToken = await firedata.auth.verifyIdToken(idToken);
        if (decodedToken.uid) {
            
            const partDocs = await modelParticipant.getParticipantsByEmail(participant.email)
            const length = partDocs.docs.length;
            if (length > 0) {
                res.status(201).json({ type: "success", data: { redirect: "/participant" } });
            } else {
                await modelParticipant.setParticipant(participant);
                res.status(201).json({ type: "success", data: { redirect: "/participant" } });
            }
        } else {
            res.status(401).json({ type: "error", message: "Usuário não logado" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ type: "error", message: "Erro ao responder a requisição" });
    }
}


const courses = async (req, res) => {
    try {
        const categoriesDocs = await models.getCourses();
        const courses = [];
        if (categoriesDocs.docs) {
            categoriesDocs.docs.forEach(course => {
                courses.push(course.data().description);
            });
        } 
        res.status(200).json({ type: "success", data: { courses } });
    } catch (err) {
        console.log(err);
        res.status(500).json({ type: "error", message: "Erro ao buscar os dados." });
    }
}


const showParticipant = async (req, res) => {
    try {
        const { id } = req.params;
        const participantDoc = await modelParticipant.getParticipant(id);
        if (participantDoc.data()) {
            res.status(200).json({ type: "success", data: { participant : participantDoc.data() } });
        } else {
            res.status(404).json({ type: "error", message: "Participante não encontrado." });
        }
    } catch (err) {
        res.status(500).json({ type: "error", message: "Erro ao buscar os dados." });
    }
}


const sendInstructions = async (req, res) => {
    try {
        const { email } = req.body;
        const firebaseUser = await modelParticipant.getParticipantByEmail(email);
        const user = firebaseUser.toJSON();
        const participantDoc = await modelParticipant.getParticipant(user.uid);
        if (participantDoc.data()) {
            const participant = participantDoc.data();
            mailServices.sendEmail(2, user.uid, participant.name, user.email);
            res.status(200).json({ type: "success", data: { participant } });
        } else {
            res.status(404).json({ type: "error", message: "Usuário não encontrado" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ type: "error", message: "Erro ao responder a requisição" });
    }
}


const getDate = (req, res) => {
    try {
        res.status(200).send(services.getDate());
    } catch (err) {
        console.log(err);
        res.status(500).json({ type: "error", message: "Erro ao buscar os dados." });
    }
}

module.exports = {
    login,
    invoice,
    courses,
    getDate,
    subscribe,
    addNewView,
    showParticipant,
    sendInstructions,
    countRequisitions
}