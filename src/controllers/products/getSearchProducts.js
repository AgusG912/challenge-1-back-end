import { response } from "express"
import { prisma } from "../../database/dbConnection.js";
import { buildHttpClient } from '../../plugin/http-client.plugin.js';
import { marketplaceSync } from "../../helpers/products/marketplaceSync.js";
import { refineGetProducts } from "../../helpers/products/refineGetProducts.js";
import { pluginDefaultSettings } from "../../schema/buildHttp-client.schema.js";

const client = buildHttpClient(pluginDefaultSettings)
export const getSearchProducts = async (req, res = response) => {
    try {
        // Hacemos una consulta externa a nuestro sistema utilizando el cliente http.
        const { data: externalData, success } = await client.get('/products');

        // Si falla, debemos retornar un codigo 502 para dar a entender a los consumidores que algo ajeno a nosotros ha fallado.
        if (!success) {
            console.log('[GET] Algo ha fallado al conectar con el servicio externo.')
            return res.status(502).json({
                success, msg: 'Ha ocurrido un error inesperado.'
            });
        }


        // * Lista de tareas
        //      1. Consultamos los datos internos del marketplace.
        //      2. Seguido sincronizamos los datos internos con los obtenidos previamente.
        //      3. Obtenemos los parametros que el consumidor solicito.
        //      4. Refinamos el resultado de la peticion y retornamos a nuestro consumidor un archivo limpio
        //         con una estructura simple. Pero al agregarle los params, va a retornar unicamente las coincidencias.
        //
        const internalData = await prisma.marketplace.findMany();
        await marketplaceSync(internalData, externalData);
        const params = req.query;
        const products = await refineGetProducts(params);

        res.status(200).json({
            success: true,
            products
        });

    } catch (err) {
        console.error("[GET - getProducts] Error al obtener los productos: ", err);

        res.status(500).json({
            success: false,
            error: "Error al obtener los productos.",
            details: err.message
        });
    }
}