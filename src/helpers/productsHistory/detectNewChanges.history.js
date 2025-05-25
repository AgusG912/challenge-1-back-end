import { patchProductsDefaultKeys as fields } from "../../schema/patch-products.config.js"

export const detectNewChanges = async (before, after) => {
    // Separamos el contenido de producto y markeplace antes y despues de los cambios.
    const { product: beforeProduct, ...beforeMarketplace } = before;
    const { product: afterProduct, ...afterMarketplace } = after;

    // Creamos una function para comparar el largo de los objetos.
    const length = (obj) => Object.keys(obj).length > 0;
    const changes = {};

    // Hacemos una verificacion profunda del objeto que valida cada propiedad, y solo si son diferentes las agregara al objeto.
    const marketplace = {};
    fields.forEach((temp) => {
        //Aqui se hace este ajuste debido a que en marketplace no existe name, y debemos controlar ese cambio.
        const key = temp === 'name' ? 'title' : temp;
        if (beforeMarketplace[key] !== afterMarketplace[key]) {
            marketplace[key] = [beforeMarketplace[key], afterMarketplace[key]];
        }
    });

    // Hacemos una verificacion profunda del objeto que valida cada propiedad, y solo si son diferentes las agregara al objeto.
    const product = {};
    fields.forEach((key) => {
        if (beforeProduct[key] !== afterProduct[key]) {
            product[key] = [beforeProduct[key], afterProduct[key]];
        }
    });

    const checkMarketplace = length(marketplace);
    const checkProduct = length(product);

    if (checkMarketplace) {
        changes.marketplace = marketplace;
    }

    if (checkProduct) {
        changes.product = product;
    }

    return {
        newChanges: checkMarketplace || checkProduct,
        newChangesValue: changes
    };
}