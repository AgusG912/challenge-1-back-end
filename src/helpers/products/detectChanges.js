export function detectChanges(verifyItem, marketplaceItem, keys) {
    const changes = {};
    const toUpdate = { ...verifyItem };

    keys.forEach((prop) => {
        // Compara los valores de cada propiedad especificada en `keys`
        // Si los valores son diferentes, registra el cambio y actualiza `toUpdate`
        if (verifyItem[prop] !== marketplaceItem[prop]) {
            toUpdate[prop] = marketplaceItem[prop];
            changes[prop] = [verifyItem[prop], marketplaceItem[prop]];
        }
    });

    return {
        // Indica si hubo al menos un cambio en los valores
        checkChanges: Object.keys(changes).length > 0,
        // Contiene los valores antes y después de cada cambio
        changesApply: changes,
        // Objeto actualizado con los nuevos valores de `marketplaceItem`
        toUpdate
    };
}