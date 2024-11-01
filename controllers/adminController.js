const userModel = require("../models/userModel");

// GET DONAR LIST
const getDonarsListController = async (req, res) => {
    try {
        const donarData = await userModel
            .find({ role: "donar" })
            .sort({ createdAt: -1 });

        return res.status(200).send({
            success: true,
            TotalCount: donarData.length, // Total count of donars
            message: "Donar List Fetched Successfully",
            donarData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Donar List API",
            error,
        });
    }
};

// GET HOSPITAL LIST
const getHospitallListController = async (req, res) => {
    try {
        const hospitalData = await userModel
            .find({ role: "hospital" })
            .sort({ createdAt: -1 });

        return res.status(200).send({
            success: true,
            TotalCount: hospitalData.length, // Total count of hospital
            message: "Hospital List Fetched Successfully",
            hospitalData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Hospital List API",
            error,
        });
    }
};
// GET ORGANISATION LIST
const getOrgListController = async (req, res) => {
    try {
        const orgData = await userModel
            .find({ role: "organisation" })
            .sort({ createdAt: -1 });

        return res.status(200).send({
            success: true,
            TotalCount: orgData.length, // Total count of organisation
            message: "Organisation List Fetched Successfully",
            orgData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Organisation List API",
            error,
        });
    }
};

// =====================

// delete donar
const deleteDonarController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message: "Record Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while deleting ",
            error,
        });
    }
};



// EXPORTS
module.exports = {
    getDonarsListController,
    getHospitallListController,
    getOrgListController,
    deleteDonarController,
};