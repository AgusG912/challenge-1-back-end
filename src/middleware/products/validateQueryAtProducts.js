import { query } from "express-validator";
import { handleErrorMessage } from "../general/handleErrorMessage.js";
import { checkQueryAllowKeys } from "../general/checkQueryAllowKeys.js";

const checkQueryKeys = checkQueryAllowKeys(['id', 'name', 'productCode']);

export const validateQueryAtProducts = [
    checkQueryKeys,

    query('id')
        .optional()
        .isInt()
        .withMessage('El id del producto debe ser un número entero'),

    query('name')
        .optional()
        .isString()
        .notEmpty()
        .withMessage("El nombre del producto debe ser un texto válido."),

    query('productCode')
        .optional()
        .isString()
        .notEmpty()
        .withMessage("El codigo del producto debe ser un texto válido."),

    handleErrorMessage
];