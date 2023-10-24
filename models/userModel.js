import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

/* SCHEMA ADD */
const userSchema = new mongoose.Schema(
  {
    Firstname: {
      type: String,
      required: [true, "FirstName is Require"],
      validate: validator.isAlphanumeric,
    },
    lastname: {
      type: String,
      required: [true, "LastName is Require"],
    },
    email: {
      type: String,
      required: [true, "Email is Require"],
      unique: true,
      validate: validator.isEmail,
    },
    mobileNo: {
      type: Number,
      required: [true, "Mobile Number is Require"],
      unique: true,
      validate: {
        validator: function (value) {
          return /^\d{10}$/.test(value);
        },
        message:
          "Invalid mobile number format. Please enter a 10-digit mobile number.",
      },
    },
    password: {
      type: String,
      required: [true, "Password is Require"],
      minlength: [8, "Password length should be greater than 8 character"],
      select: true,
    },
    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

/*MIDDLEWARE FOR HASHING THE PASSWORD*/
userSchema.pre("save", async function () {
  if (!this.isModified) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/* COMPARE PASSWORD */
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

/*JSON WEBTOKEN*/
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default mongoose.model("user", userSchema);
