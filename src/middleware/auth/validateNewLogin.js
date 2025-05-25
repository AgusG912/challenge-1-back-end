import { check } from "express-validator";
import { checkBody } from "../general/checkBody.js";
import { handleErrorMessage } from "../general/handleErrorMessage.js";
import { checkBodyAllowKeys } from "../general/checkBodyAllowKeys.js";

const regexPassword = /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
const checkBodyKeys = checkBodyAllowKeys(['email', 'password']);

export const validateNewLogin = [
    checkBody,
    checkBodyKeys,
    check('email')
        .isEmail()
        .withMessage('Debe ser un email válido.')
        .normalizeEmail(),

    check('password')
        .trim()
        .escape()
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres.')
        .matches(regexPassword)
        .withMessage('La contraseña debe contener una mayúscula, un número y un carácter especial.'),

    handleErrorMessage
];