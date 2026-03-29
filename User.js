const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    faceDescriptor: [Number] // 🔥 important
});