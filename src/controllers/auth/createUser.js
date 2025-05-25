
import { response } from "express";
import { prisma } from '../../database/dbConnection.js';
import { userExistsCheck } from "../../helpers/auth/userExistsCheck.js";
import { generateJWT } from "../../helpers/auth/jwt.js";
import { encryptPassword } from "../../helpers/auth/encryptPassword.js";

export const createUser = async (req, res = response) => {
    try {
        let user = req.body;

        // * Verificamos que el usuario NO exista en la base de datos. */
        //   Y retornamos un mensaje mas generico para no dar tanta informacion al consumidor.
        const userExists = await userExistsCheck(user.email);
        if (userExists) {
            return res.status(400).json({
                success: false,
                error: 'El usuario ya posee una cuenta.'
            })
        }

        // * Encriptamos la contraseña utilizando el metodo por defecto del Salt. */
        user.password = encryptPassword(user.password)

        // * Creamos un nuevo usuario y posteriormente le retornamos la informacion al consumidor. */
        const newUser = await prisma.user.create({
            data: {
                ...user,
                roleId: 3
            },
            include: {
                role: true,
            }
        });

        // * Generar el JWT. */
        const token = await generateJWT(newUser.id, newUser.alias);

        res.status(201).json({
            success: true,
            msg: 'El usuario fue creado satisfactoriamente.',
            user: {
                alias: newUser.alias,
                email: newUser.email,
                token,
                role: newUser.role.name
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