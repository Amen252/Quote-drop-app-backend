import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is requried"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is requried"],
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    role:{
      type:String,
      enum:['admin', 'author'],
      default:'author'
    }
  },
  { timestamps: true },
);

//hash the password before saving to the database

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//compare the hashed password and the entredPassword
userSchema.methods.isMatchPassword = async function (entredPassword) {
  return await bcrypt.compare(entredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
