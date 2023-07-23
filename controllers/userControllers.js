import userModel from "../models/userModel.js";

export const updateUserController = async (req, res, next) => {
  const { Firstname, lastname, email, mobileNo, location } = req.body;
  if (!Firstname || !lastname || !email || !mobileNo || !location) {
    next("Please Provide All fields");
  }
  const user = await userModel.findOne({ _id: req.user.userId });
  (user.Firstname = Firstname),
    (user.lastname = lastname),
    (user.email = email),
    (user.mobileNo = mobileNo),
    (user.location = location);
  await user.save();
  const token = user.createJWT();
  res.status(200).json({
    user,
    token,
  });
};

export const getUserController = async (req, res) => {
  const { Firstname, email, mobileNo } = req.body;
  /*VALIDATION */
  if (!Firstname || !email || !mobileNo) {
    return next("Please Provide All Field ");
  }
  try {
    const user = await userModel.findOne({ Firstname, email, mobileNo });
    if (!user) {
      next("User Not Found");
    }
    return res.status(200).json({
      user: {
        Firstname: user.Firstname,
        lastname: user.lastname,
        email: user.email,
        mobileNo: user.mobileNo,
        location: user.location,
      },
    });
  } catch (error) {
    return next("Error occurred while fetching user details");
  }
};

// export const getUserController = async (req, res, next) => {
//   const user = await userModel.findOne({ createdBy: req.user.userId });
//   res.status(200).json({
//     totalUsers: user.length,
//     user,
//   });
// };
