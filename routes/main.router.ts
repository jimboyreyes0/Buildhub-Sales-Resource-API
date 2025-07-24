import express, { Router } from "express";
const router: Router = express.Router();

import { versioning } from "../utils/version";

router.get("/version", versioning);

export default router;
