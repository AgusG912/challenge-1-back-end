


export const updatedProductFieldsDiff = (product, updatedFields) => {
    //* Lo primero que se va a generar es un nuevo producto a partir de las keys que no pertenezcan a products.
    //  Ya tendremos por entendido que aquello que no pertenezca al producto pertenece a la capa externa del sistema,
    //  es decir, debemos hacer una peticion externa al endpoint del marketplace para actualizar los cambios que solicito
    //  el usuario.
    //
    //  1. La logica detras de la siguiente function es tomar las keys de updatedFields
    //  2. filtramos por las keys que no sean parte del producto
    //  3. Creamos un nuevo objeto con reduce, y le asignamos el valor del updatedField (El nuevo valor que asigno el usuario)

    const marketplaceFields =
        Object
            .keys(updatedFields)
            .filter(key => {
                // Se hace una equivalencia extra, ya que el campo title no existe en el producto y se debe comprobar su existencia en marketplace
                return !product.hasOwnProperty(
                    key === 'name' ? 'title' : key
                );
            })
            .reduce((obj, key) => {
                const temp = key === 'name' ? 'title' : key;
                obj[temp] = updatedFields[key];
                return obj;
            }, {});

    // Hacemos una validacion parecida a la anterior, pero al ser el producto diretamente no hacen falta equivalencias.
    const productFields =
        Object
            .keys(updatedFields)
            .filter(key => product.hasOwnProperty(key))
            .reduce((obj, key) => {
                obj[key] = updatedFields[key];
                return obj;
            }, {});


    const updateProduct = Object.keys(productFields).length > 0;
    const updateMarketplace = Object.keys(marketplaceFields).length > 0;

    return {
        marketplaceFields,
        productFields,
        updateMarketplace,
        updateProduct
    }
}