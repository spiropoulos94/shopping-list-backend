import { Router } from "express";
import controllers from "./list.controllers.js";

const router = Router();

// /api/list
router.route("/").get(controllers.getMany).post(controllers.createOne);

// /api/list/:id
router
  .route("/:id")
  .get(controllers.getOne)
  .put(controllers.updateOne) // check
  .delete(controllers.removeOne);

export default router;
