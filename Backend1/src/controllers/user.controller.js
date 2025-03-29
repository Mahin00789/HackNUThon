import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { User } from "../model/user.model.js";

import { uploadOnCloudinary } from "../utils/clodinary.js";
import { generateAccessToken } from "../model/user.model.js";
import { generateRefreshToken } from "../model/user.model.js";

const generateAccessAndRefreshToken = async(userId);
{
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating Access and Refresh token");
  }
}
const registerUser = asyncHandler(async (req, res) => {
  //Get user detail from frontend
  //validation
  //check if user already exist
  //check for images check for avatar
  //upload them to clodinary
  //create user object - create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return res
  console.log("Received files:", req.files);

  const { fullname, email, username, password } = req.body;
  console.log(email);
  if (!fullname || !email || !username || !password) {
    throw new ApiError(400, "All fields are required");
  }

  if (
    await User.findOne({
      $or: [{ username }, { email }],
    })
  ) {
    throw new ApiError(409, "User with email or username exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is hh required");
  }

  console.log(avatarLocalPath);
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if (!createdUser) {
    throw new ApiError("500", "Something went wrong while registering user");
  }

  return res.status(201).json(new ApiResponse(200, createdUser, "User Created Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //req body->data
  //user name or email
  //find user
  //passwrod check
  //access and refresh token
  //send cookies

  const { username, email, password } = req.body;
  if (!username || !email) {
    throw new ApiError(400, "User namae or Email not provided");
  }
  const user = await User.findOne({
    $or: [{ username, email }],
  });
  if (!user) {
    throw new ApiError(404, "User does not exixst");
  }
  const correct = await user.isPasswordCorrect(password);
  if (!correct) {
    throw new ApiError(401, "Invalid Password");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  const loggedInUser = user.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User loggedIn succesfully"
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  User.findById
});

export { registerUser, loginUser, logOutUser };
