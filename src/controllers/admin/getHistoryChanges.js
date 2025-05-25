import { response } from "express";
import { prisma } from "../../database/dbConnection.js"

export const getHistoryChanges = async (_, res = response) => {
    try {
        const allChanges = await prisma.productHistory.findMany({
            include: {
                product: {
                    select: {
                        name: true
                    }
                },
                modified: {
                    select: {
                        email: true
                    }
                }
            }
        });


        const changes = allChanges.map(({ modifiedBy, productId, stateDiff, product, modified, ...rest }) => ({
            ...rest,
            changes: stateDiff.marketplace,
            product: product.name,
            modifiedBy: modified.email
        }));



        res.status(200).json({
            sucess: true,
            changes,
        })
    } catch (e) {
        console.log('[GET - ADMIN] Fallo al obtener los logs');

        res.status(500).json({
            sucess: false,
            details: e.message
        })
    }
}