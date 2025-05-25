export function mergeProductWithSale(products, sales) {
    return sales.map((sale) => {
        const { productId, ...rest} = sale;
        products.forEach( product => {
            if(productId === product.id) {
                rest['name'] = product.name;
                rest['productCode'] = product.marketplace.productCode;
            }
        });
        return rest
    });
}
