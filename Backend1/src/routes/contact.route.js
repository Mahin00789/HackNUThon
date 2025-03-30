import { Router } from "express";
import { submitContactForm, getAllContactMessages } from "../controllers/contact.controller.js";

const router = Router();

router.route("/contact").post(submitContactForm);
router.route("/contacts").get(getAllContactMessages);

export default router;
