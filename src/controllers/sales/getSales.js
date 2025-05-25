import { response } from "express";
import { buildHttpClient } from "../../plugin/http-client.plugin.js";
import { pluginDefaultSettings } from "../../schema/buildHttp-client.schema.js";
import { prisma } from "../../database/dbConnection.js";
import { mergeProductWithSale } from "../../helpers/sales/mergeProductsWithSales.js";

const client = buildHttpClient(pluginDefaultSettings)

export const getSales = async (_, res = response) => {
    try {
        const { data: externalData, success } = await client.get('/v2/sales');

        // Si falla, debemos retornar un codigo 502 para dar a entender a los consumidores que algo ajeno a nosotros ha fallado.
        if (!success) {
            console.log('[GET] Algo ha fallado al conectar con el servicio externo.')
            return res.status(502).json({
                success, msg: 'Ha ocurrido un error inesperado.'
            });
        }

        const products = await prisma.product.findMany({
            include: {
                marketplace: {
                    select: {
                        productCode:true
                    }
                }
            }
        })

        const {sales} = externalData;

        const salesJoinProducts = mergeProductWithSale(products,sales);
        res.status(200).json({
            sucess: true,
            sales:salesJoinProducts,
        })
    } catch (e) {
        console.log('[GET - ADMIN] Fallo al obtener los logs');

        res.status(500).json({
            sucess: false,
            details: e.message
        })
    }
}