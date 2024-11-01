const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");
// GET BLOOD DATA
const bloodGroupDetailsController = async (req, res) => {
    try {
        const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
        const bloodGroupData = [];
        const organisation = mongoose.Types.ObjectId.createFromHexString(req.body.userId);
        // GET SINGLE BLOOD GROUP
        await Promise.all(bloodGroups.map(async (bloodGroup) => {
            // COUNT TOTAL IN
            const totalIn = await inventoryModel.aggregate([
                {
                    $match: {
                        bloodGroup: bloodGroup,
                        inventoryType: 'in',
                        organisation,
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$quantity" },
                    },
                },
            ]);
            // COUNT TOTAL OUT
            const totalOut = await inventoryModel.aggregate([
                {
                    $match: {
                        bloodGroup: bloodGroup,
                        inventoryType: 'out',
                        organisation,
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$quantity" },
                    },
                },
            ]);
            // CALCULATE TOTAL
            const availableBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

            // PUSH DATA
            bloodGroupData.push({
                bloodGroup,
                totalIn: totalIn[0]?.total || 0,
                totalOut: totalOut[0]?.total || 0,
                availableBlood,
            });
        }))

        return res.status(200).send({
            success: true,
            message: "Blood Group Data Fetch Successfully",
            bloodGroupData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Blood Group Data Analytics API",
            error,
        });

    }
};

module.exports = {
    bloodGroupDetailsController,
}