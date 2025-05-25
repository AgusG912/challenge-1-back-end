import { prisma } from "../../database/dbConnection.js";
import { buildHttpClient } from "../../plugin/http-client.plugin.js";
import { updatedProductFieldsDiff } from "./updatedProductFieldsDiff.js";
import { pluginDefaultSettings } from "../../schema/buildHttp-client.schema.js";

export const client = buildHttpClient(pluginDefaultSettings);
export const updatedProductFields = async (product, updatedFields, productID) => {
    const {
        /** Boolean */
        updateProduct,
        updateMarketplace,

        /** Objetos  */
        productFields,
        marketplaceFields,
    } = updatedProductFieldsDiff(product, updatedFields);

    /**
     * Aqui validamos si existen campos que actualizar en la base de datos interna.
     */
    if (updateProduct) {
        try {
            await prisma.product.update({
                where: { id: productID },
                data: {
                    ...productFields
                }
            });

        } catch (err) {
            console.log('[PATCH] La peticion a nuestra base de datos ha fallado:', err)
            return {
                updateCheck: false,
            }
        }

    }

    /**
     * Aqui validamos si existen campos que actualizar en la base de datos interna.
     */
    if (updateMarketplace) {
        try {
            const localSaveMarketplace = await prisma.marketplace.update({
                where: { productId: productID },
                data: {
                    ...marketplaceFields
                }
            });

            //Usamos el client personalizado para realizar las peticiones al endpoint externo.
            const { success } = await client.patch(
                `/products/update/${localSaveMarketplace.productCode}`,
                {
                    ...marketplaceFields
                }
            );

            //En caso de fallar, pero no rompe la aplicacion manejamos el error y retornamos un problema.
            if (!success) {
                console.log('[PATCH] La peticion al endpoint externo a fallado.')
                return {
                    updateCheck: false,
                }
            }

        } catch (error) {
            console.log('[PATCH] La peticion al servicio mixto ha fallado:', err)
            return {
                updateCheck: false,
            }
        }
    }


    return {
        updateCheck: true,
    };
}
