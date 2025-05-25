import bcrypt from "bcryptjs";
import { response } from "express";
import { userExistsCheck } from "../../helpers/auth/userExistsCheck.js";
import { generateJWT } from "../../helpers/auth/jwt.js";

export const loginUser = async (req, res = response) => {
    try {
        const userReq = req.body;

        // * Verificamos que el usuario exista en la base de datos. */
        //   Y retornamos un mensaje mas generico para no dar tanta informacion al consumidor.
        const user = await userExistsCheck(userReq.email);
        if (!user) {
            return res.status(400).json({
                success: false,
                error: 'El email/password no corresponde con el usuario.'
            })
        }

        // * Verificamos que las contraseñas hagan match. */
        const validPassword = bcrypt.compareSync( userReq.password, user.password );
        if(!validPassword) {
            return res.status(400).json({
                success: false,
                error: 'El password es incorrecto.'
            })
        }

        // * Generamos un nuevo token para el usuario. */
        const token = await generateJWT(user.id, user.alias);

        res.status(200).json({
            success: true,
            msg: 'Login realizado de manera satisfactoria.',
            user: {
                alias: user.alias,
                email: user.email,
                token,
                role: user.role.name,
            }
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: "La creacion del producto ha fallado.",
            details: err.message
        })
    }
}