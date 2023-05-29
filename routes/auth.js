import express from "express";
import { login, register } from "../controllers/auth.js";//.js is required while using import not in require

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;