import { Router } from "express";
import { createUser } from "../controllers/auth/createUser.js";
import { validateNewUser } from "../middleware/auth/validateNewUser.js";
import { validateNewLogin } from "../middleware/auth/validateNewLogin.js";
import { loginUser } from "../controllers/auth/loginUser.js";
import { renewToken } from "../controllers/auth/renewToken.js";
import { validateJWT } from "../middleware/auth/validateJWT.js";

// Instancia el enrutador de Express
const router = Router();

// Ruta para iniciar sesión
// Se valida que los datos de inicio de sesión sean correctos antes de procesar la solicitud
router.post('/', validateNewLogin, loginUser);

// Ruta para registrar un nuevo usuario
// Se aplica validación a los datos enviados para la creación de la cuenta
router.post('/new', validateNewUser, createUser);

// Ruta para renovar el token de autenticación
// Se requiere autenticación previa con JWT para obtener un nuevo token válido
router.get('/renew', validateJWT, renewToken);

// Exporta el enrutador para su uso en la configuración principal del servidor
export default router;