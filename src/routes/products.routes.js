import { Router } from "express";
import { validateJWT } from "../middleware/auth/validateJWT.js";
import { getProducts } from "../controllers/products/getProducts.js";
import { patchProducts } from "../controllers/products/patchProducts.js";
import { getSearchProducts } from "../controllers/products/getSearchProducts.js";
import { validateQueryAtProducts } from "../middleware/products/validateQueryAtProducts.js";
import { validatePatchProducts } from "../middleware/products/validatePatchProducts.js";
import { getSales } from "../controllers/sales/getSales.js";

// Instancia el enrutador de Express
const router = Router();

// Ruta para obtener la lista de productos
// Se valida que el usuario esté autenticado con validateJWT
router.get('/products', validateJWT, getProducts);

// Ruta para buscar productos con filtros personalizados
// Se valida que el usuario esté autenticado y los parámetros de consulta sean correctos
router.get('/products/search', [validateJWT, validateQueryAtProducts], getSearchProducts);

// Ruta para actualizar un producto mediante su ID
// Se valida que el usuario esté autenticado y los datos de la petición sean correctos
router.patch('/products/:id', [validateJWT, validatePatchProducts], patchProducts);

router.get('/sales', validateJWT, getSales);

// Exporta el enrutador para su uso en la configuración principal del servidor
export default router;