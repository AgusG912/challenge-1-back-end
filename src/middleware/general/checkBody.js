import { body } from "express-validator";

export const checkBody =
    body()
        .exists().withMessage('El cuerpo de la solicitud es requerido.')
        .notEmpty().withMessage('La cuerpo de la solicitud no puede estar vacío.')