import { detectChanges } from "./detectChanges.js";
import { prisma } from "../../database/dbConnection.js";

const marketplaceKeys = ["comision", "costoEnvio", "originalPrice", "price", "title"];

export const marketplaceSync = async (internalInit, externalInit) => {
    // Convierte `externalInit.items` en un array, asegurando compatibilidad con objetos y listas
    const external = Array.isArray(externalInit.items) ? externalInit.items : Object.values(externalInit.items);

    // Crea un mapa para un acceso eficiente a los productos internos usando `productCode` como clave
    const internal = new Map();
    internalInit.forEach((item) => internal.set(item.productCode, item));

    const changes = [];

    /**
     * Se utiliza `for...of` en lugar de `.forEach()` debido a la necesidad de esperar llamadas asincrónicas (`await`).
     */
    for (const marketplaceItem of external) {
        const verifyItem = internal.get(marketplaceItem.productCode);

        if (!verifyItem) continue;

        // Identifica los cambios entre los datos internos y los de marketplace
        const { checkChanges, changesApply, toUpdate } = detectChanges(verifyItem, marketplaceItem, marketplaceKeys);

        if (checkChanges) {
            const updatedChanges = toUpdate;

            // Actualiza el producto en la base de datos con los nuevos valores detectados
            await prisma.marketplace.update({
                where: { id: verifyItem.id },
                data: {
                    ...toUpdate,
                    updatedAt: new Date() // Registra la fecha de actualización para control de cambios
                }
            });

            changes.push({
                productCode: verifyItem.productCode,
                cambios: changesApply
            });

            // Sincroniza el estado interno con las modificaciones aplicadas en la base de datos
            internal.set(verifyItem.productCode, updatedChanges);
        }
    }

    // Convierte el mapa de productos internos en un array para su retorno
    const marketplaceSynced = Array.from(internal.values());

    return {
        marketplaceSynced,
        type: '[Sync marketplace]',
        changes: changes.length > 0,
        changesItems: changes.length > 0 ? changes : null,
    };
};