import { body } from "express-validator";

export const checkBodyAllowKeys = (allowedKeys = []) => {
    return body().custom((_, { req }) => {
        const keys = req.body;
        const bodyKeys = Object.keys(keys);

        // Filtramos las claves no permitidas.
        const extraKeys = bodyKeys.filter((key) => !allowedKeys.includes(key));

        // Verifica si al menos un parámetro permitido está presente.
        const validKeys = bodyKeys.filter((bodyKey) => allowedKeys.includes(bodyKey));
        if (validKeys.length === 0) {
            throw new Error(`Debes proporcionar al menos un parámetro válido: ${allowedKeys.join(", ")}`);
        }

        // Rechazamos los parámetros que no estén permitidos.
        if (extraKeys.length > 0) {
            throw new Error(`Existen llaves que no son permitidas en el cuerpo de la petición: ${extraKeys.join(", ")}`);
        }

        return true;
    });
};