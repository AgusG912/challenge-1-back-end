import { prisma } from "../../database/dbConnection.js";
import { detectNewChanges } from "./detectNewChanges.history.js";

export const updateProductsHistory = async (productID, before, user) => {
    try {
        // Obtenemos el objeto actualizado.
        const after = await prisma.marketplace.findUnique({
            where: { productId: Number(productID) },
            include: { product: true }
        });

        // Refinamos los datos y dependiendo de su resultado agregaremos los valores al historico.
        const { newChanges, newChangesValue } = await detectNewChanges(before, after);

        if (newChanges) {
            await prisma.productHistory.create({
                data: {
                    productId: productID,
                    stateDiff: newChangesValue,
                    modifiedBy: String(user)
                }
            });
        }

    } catch (err) {
        console.log('[PATCH] Ha ocurrido un error al momento de generar el historico:', err);
    }

}