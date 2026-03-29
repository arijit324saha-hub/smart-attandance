const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    studentId: mongoose.Schema.Types.ObjectId,
    date: { type: Date, default: Date.now },
    status: String
});

module.exports = mongoose.model("Attendance", attendanceSchema);