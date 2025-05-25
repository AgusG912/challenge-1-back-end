import { check } from "express-validator";
import { checkBody } from "../general/checkBody.js";
import { handleErrorMessage } from "../general/handleErrorMessage.js";
import { checkBodyAllowKeys } from "../general/checkBodyAllowKeys.js";
import { validatePatchProductsParams } from "./validatePatchProductsParams.js";
import { patchProductsDefaultKeys } from "../../schema/patch-products.config.js";

const checkBodyKeys = checkBodyAllowKeys(patchProductsDefaultKeys);

export const validatePatchProducts = [
    checkBody,
    checkBodyKeys,
    validatePatchProductsParams,

    check("activo")
        .optional()
        .isBoolean({strict:true})
        .withMessage("El campo 'activo' debe ser un valor booleano (true o false)."),

    check("costoFabricacion")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("El costo de fabricación debe ser un número decimal positivo o 0."),

    check("iva")
        .optional()
        .isInt({ min: 0 })
        .withMessage("El IVA debe ser un número entero positivo o 0."),

    check("name")
        .optional()
        .isString()
        .withMessage("El campo 'name' debe ser una cadena de texto.")
        .isLength({ min: 3 })
        .withMessage("El campo 'name' debe tener al menos 3 caracteres."),

    check("originalPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("El precio original debe ser un número decimal positivo o 0."),

    check("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("El price debe ser un número decimal positivo o 0."),

    handleErrorMessage,
];