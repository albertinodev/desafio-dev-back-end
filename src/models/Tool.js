const firedata = require('../datastore/database');

const getAdmin = (id) => {
  return firedata.firestore.collection("admins").doc(id).get();
}

const getRequisitions= () => {
  return firedata.firestore.collection("requisitions").orderBy('count', 'desc').get();
}

const getUnckedRequisitions = () => {
  return firedata.firestore.collection("requisitions").where("status", "==", false).get();
}

const getInvoices = () => {
  return firedata.firestore.collection("invoices").get();
}

const getInvoicesByRequisitionId = (requisitionId) => {
  return firedata.firestore.collection("invoices").where("requisitionId", "==", requisitionId).get();
}

const getParticipants = () => {
  return firedata.firestore.collection("participants").get();
}

const getViews = () => {
  return firedata.firestore.collection("refreshes").doc("A9lDah36qjNXcWCfMmMU").get();
}

const checkRequisition = (requisitionId) => {
  return firedata.firestore.collection("requisitions").doc(requisitionId).update({ status: true });
}

const checkInvoice = (requisitionId) => {
  return firedata.firestore.collection("invoices").doc(requisitionId).update({ status: true });
}

const deleteParticipant = (id) => {
  return firedata.admin.auth().deleteUser(id);
}

const deactivateParticipant = (id) => {
  return firedata.firestore.collection("participants").doc(id).update({ active: false });
}

module.exports = { getAdmin, getRequisitions, getUnckedRequisitions, getInvoices, getInvoicesByRequisitionId, getParticipants, getViews, checkRequisition, checkInvoice, deleteParticipant, deactivateParticipant}