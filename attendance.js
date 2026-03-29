const router = require("express").Router();
const Attendance = require("../models/Attendance");

router.post("/mark", async(req, res) => {
    const attendance = new Attendance({
        studentId: req.body.studentId,
        status: "present"
    });

    await attendance.save();
    res.send("Marked");
});

router.get("/", async(req, res) => {
    const data = await Attendance.find();
    res.json(data);
});

module.exports = router;