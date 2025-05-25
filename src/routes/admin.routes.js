import { Router } from "express";
import { validateJWT } from "../middleware/auth/validateJWT.js";
import { getUsers } from "../controllers/admin/getUsers.js";
import { getHistoryChanges } from "../controllers/admin/getHistoryChanges.js";

// Instancia el enrutador de Express
const router = Router();

router.get('/users', validateJWT, getUsers);
router.get('/changes', validateJWT, getHistoryChanges);

export default router;