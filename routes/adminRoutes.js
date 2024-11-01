const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getDonarsListController, getHospitallListController, getOrgListController, deleteDonarController } = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

// ROUTER OBJECT
const router = express.Router();

// ROUTES 

//  GET || DONAR LIST
router.get('/donar-list', authMiddleware, adminMiddleware, getDonarsListController);

//  GET || HOSPITAL LIST
router.get('/hospital-list', authMiddleware, adminMiddleware, getHospitallListController);

//  GET || ORGANISATION LIST
router.get('/org-list', authMiddleware, adminMiddleware, getOrgListController);

// ==============================
// Delete Donar || Get
router.delete('/delete-donar/:id', authMiddleware, adminMiddleware, deleteDonarController);

// EXPORT
module.exports = router;
