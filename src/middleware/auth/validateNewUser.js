import { check } from "express-validator";
import { checkBody } from "../general/checkBody.js";
import { handleErrorMessage } from "../general/handleErrorMessage.js";
import { checkBodyAllowKeys } from "../general/checkBodyAllowKeys.js";

const hasUppercase = /(?=.*[A-Z])/;
const hasNumber = /(?=.*\d)/;
const hasSpecialChar = /(?=.*[@$!%*?&])/;
const regexPassword = /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
const checkBodyKeys = checkBodyAllowKeys(['email', 'password', 'alias']);

export const validateNewUser = [
    checkBody,
    checkBodyKeys,
    check('email')
        .isEmail()
        .withMessage('Debe ser un email válido.')
        .normalizeEmail(),

    check('alias')
        .isLength({ min: 3 })
        .withMessage('Debe tener un mínimo de tres (3) caracteres.')
        .trim()
        .escape(),

    check('password')
        .trim()
        .escape()
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres.')
        .matches(regexPassword)
        .withMessage('La contraseña debe contener una mayúscula, un número y un carácter especial.'),

    handleErrorMessage
];