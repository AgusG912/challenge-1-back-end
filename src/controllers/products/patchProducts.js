import { response } from "express"
import { prisma } from "../../database/dbConnection.js";
import { updatedProductFields } from "../../helpers/products/updatedProductFields.js";
import { updateProductsHistory } from "../../helpers/productsHistory/updateProductsHistory.js";

export const patchProducts = async (req, res = response) => {
    try {
        //Obtenemos las variables, que vienen de los parametros y el body.
        const productID = Number(req.params.id);
        const updatedFields = req.body;

        // Obtenemos todo lo relacionado al marketplace y el producto en cuestion.
        const beforeChanges = await prisma.marketplace.findUnique({
            where: { productId: productID },
            include: { product: true }
        });

        //Ejecutamos una function para actualizar los valores en los posible servicios.
        const { updateCheck } = await updatedProductFields(
            beforeChanges.product,
            updatedFields,
            productID,
        );

        // Verificamos que todo haya sucedido correctamente.
        if (!updateCheck) return res.status(502).json({
            success: false,
            msg: 'Ha ocurrido un error inesperado...'
        })

        // Agregamos la operacion en el historico de transacciones.
        await updateProductsHistory(
            productID,
            beforeChanges,
            req.auth.uid
        );

        // Retornamos el json.
        res.status(200).json({
            success: true,
        });


    } catch (err) {
        console.error("[PATCH] Error al actualizar los productos: ", err);

        res.status(500).json({
            success: false,
            error: "Error al actualizar los productos.",
            details: err.message
        });
    }
}