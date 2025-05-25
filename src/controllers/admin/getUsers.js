import { response } from "express";
import { prisma } from "../../database/dbConnection.js"

export const getUsers = async (_, res = response) => {
    try {
        const allUserInfo = await prisma.user.findMany({
            include: {
                role: {
                    select: {
                        name:true,
                    }
                }
            }
        });

        const users = allUserInfo.map(({password, roleId, role, ...rest}) => ({...rest, role:role.name}));
        res.status(200).json({
            sucess: true,
            users,
        })
    } catch (e) {
        console.log('[GET - ADMIN] Fallo al obtener los usuarios de la aplicacion');

        res.status(500).json({
            sucess: false,
            details: e.message
        })
    }
}