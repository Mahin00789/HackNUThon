import { asyncHandler } from "../utils/asynchandler";
import { User } from "../model/user.model";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");

  if (!token) {
    throw new Apierror(401, "Unauthorized request");
  }
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(401, "Invalid Access Token");
  }

  req.user = user;
});
