import { query } from "express-validator";

export const checkQueryAllowKeys = (allowedKeys = []) => {
    return query().custom((_, { req }) => {
        const params = req.query;
        const queryKeys = Object.keys(params);

        // Aqui filtramos las claves no permitidas.
        const extraKeys = queryKeys.filter((key) => !allowedKeys.includes(key));

        // Verifica si al menos un parámetro permitido está presente considerando el tipo de solicitud.
        const validKeys = queryKeys.filter((queryKey) => allowedKeys.includes(queryKey));
        if (validKeys.length === 0) {
            throw new Error(`Debes proporcionar al menos un parámetro válido: ${allowedKeys.join(", ")}`);
        }

        // Rechazamos los parametros que no esten permitidos.
        if (extraKeys.length > 0) {
            throw new Error(`Existen parámetros no permitidos en la consulta: ${extraKeys.join(", ")}`);
        }

        return true;
    });
};