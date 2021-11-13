import { Router } from "express";
import { me, updateMe } from "./user.controllers.js";

const router = Router();

router.get("/", me);
router.put("/", updateMe);

export default router;
