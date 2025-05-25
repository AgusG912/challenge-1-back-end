import { response } from "express";
import { generateJWT } from "../../helpers/auth/jwt.js";
import { prisma } from '../../database/dbConnection.js';

export const renewToken = async (req, res = response) => {
    const { uid, alias } = req.auth;
    const token = await generateJWT( uid, alias);
    const { role } = await prisma.user.findUnique({
        where: { id:uid },
        include: { role: true }
    })

    res.json({
        success: true,
        msg: 'Token renovado.',
        user: {
            uid,
            alias,
            token,
            role:role.name
        }
    })
}