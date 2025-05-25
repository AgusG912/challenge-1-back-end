import jwt from 'jsonwebtoken';

export const generateJWT = (uid, alias, timeAlive = process.env.TOKEN_LIFE_TIME) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, alias };

        // Firma el token utilizando una clave secreta almacenada en las variables de entorno.
        jwt.sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: timeAlive }, (err, token) => {

            // Manejo de errores: si la firma del token falla, la promesa se rechaza.
            if (err) reject('No se pudo generar el token.');

            resolve(token);
        });
    });
}