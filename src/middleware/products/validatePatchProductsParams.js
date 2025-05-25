import { param } from "express-validator";

export const validatePatchProductsParams =
    param('id')
        .exists()
        .withMessage('El id del producto es obligatorio.')
        .isInt({ min: 1 })
        .withMessage('El id del producto debe ser un numero entero. Mayor que cero (0).');