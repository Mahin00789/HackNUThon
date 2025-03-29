import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Contact } from "../model/contact.model.js";

const submitContactForm = asyncHandler(async (req, res) => {
  // console.log("sample");
  const { name, email, phone, message } = req.body;
  console.log(req.body);
  if (!name || !email || !phone || !message) {
    console.log("Krish Krish Krish");
    throw new ApiError(400, "All fields are required");
  }

  const contactEntry = await Contact.create({ name, email, phone, message });

  if (!contactEntry) {
    throw new ApiError(500, "Something went wrong while submitting the form");
  }

  return res.status(201).json(new ApiResponse(201, contactEntry, "Message sent successfully"));
});

const getAllContactMessages = asyncHandler(async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });

  return res.status(200).json(new ApiResponse(200, messages, "All Contact Messages"));
});

export { submitContactForm, getAllContactMessages };
