import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { Firstname, lastname, email, mobileNo, password } = req.body;
  /*VALIDATION*/
  if (!Firstname) {
    next("Please Prvoide the Firstname");
  }
  if (!lastname) {
    next("Please Provide the Lastname");
  }
  if (!email) {
    next("Please Provide the Email");
  }
  if (!mobileNo) {
    next("Please Provide the Mobile Number");
  }
  if (!password) {
    next("Please Provide the Password");
  }
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next("Email is Already Register Please Login");
  }

  const user = await userModel.create({
    Firstname,
    lastname,
    email,
    mobileNo,
    password,
  });
  /* JWT TOKEN*/
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: "User Created Successfully",
    user: {
      Firstname: user.Firstname,
      lastname: user.lastname,
      email: user.email,
      mobileNo: user.mobileNo,
      location: user.location,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  /*  VALIDATION */
  if (!email || !password) {
    return next("Please Provide All Field");
  }

  try {
    /*FIND USER BY EMAIL*/
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return next("Invalid Password");
    }

    /* COMPARE PASSWORD */
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next("Invalid Password");
    }
    user.password = undefined;
    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      user,
    });
  } catch (error) {
    return next(error);
  }
};
