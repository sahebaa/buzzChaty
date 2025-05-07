import mongoose from "mongoose";

// Replace with your correct MongoDB URI and DB name
const uri = "mongodb+srv://aj299530:qjiDq7lyXu58T959@messages.7sb883w.mongodb.net/chat-app?retryWrites=true&w=majority&appName=messages";

// Define a simple User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model("User", userSchema);

// Connect and insert test data
async function testConnection() {
  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

    const newUser = await User.create({
      name: "Test User",
      email: "test@example.com"
    });

    console.log("✅ User inserted:", newUser);
    process.exit(0); // success
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1); // failure
  }
}

testConnection();
