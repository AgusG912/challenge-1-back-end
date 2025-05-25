import { response } from "express";
import jwt from 'jsonwebtoken'

const headerKey = 'x-user-token';

export const validateJWT = (req, res = response, next) => {

    const token = req.header(headerKey);
    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'No hay ningun token en la peticion.'
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.auth = {
            uid: decoded.uid,
            alias: decoded.alias
        }

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            error: 'Token invalido.'
        });
    }
}