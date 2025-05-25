/**
 * Array de claves utilizadas para actualizar productos mediante una operación de "patch".
 * Define los atributos permitidos para modificación en la entidad de productos.
 *
 * Uso:
 * Este conjunto de claves se emplea para filtrar y validar los datos que se pueden actualizar 
 * en un producto dentro del sistema, asegurando que solo los valores especificados sean modificados.
 */

export const patchProductsDefaultKeys = [
    'activo',
    'costoFabricacion',
    'iva',
    'name',
    'originalPrice',
    'price'
];