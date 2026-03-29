const router = require("express").Router();
const User = require("../models/User");

// ➕ Add user
router.post("/add", async(req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send("User added");
});

// 📋 Get all users
router.get("/", async(req, res) => {
    const users = await User.find();
    res.json(users);
});

// ❌ Delete user
router.delete("/:id", async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send("User deleted");

    router.post("/register-face", async(req, res) => {
        const { userId, descriptor } = req.body;

        await User.findByIdAndUpdate(userId, {
            faceDescriptor: descriptor
        });

        res.send("Face registered");
    });
});

module.exports = router;