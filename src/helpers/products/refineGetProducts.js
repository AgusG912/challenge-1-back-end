import { prisma } from '../../database/dbConnection.js'


const buildWhereQuery = (queryParams) => {
    const hasFilters = Object.keys(queryParams).length > 0;

    // Aqui utilizamos el reduce para retornar un objeto directamente en filter.
    const filters = Object.entries(queryParams).reduce((acc, [key, value]) => {
        //En la siguiente linea evaluamos si el query param es name, lo cambia por title.
        //Ya que el valor name no existe en marketplace, y se hace esta manera para reducer
        //el tiempo de respuesta de la aplicacion al filtrar por la db en lugar del js.
        //De la misma forma tambien convertimos los valores numericos de forma automatica
        //con la intencion de facilitar el trabajo, y parsear a los requerimiento del prisma
        acc[key === 'name' ? 'title' : key] = isNaN(value)
            ? { contains: value, mode: 'insensitive' }
            : Number(value);
        return acc;
    }, {});


    return {
        hasFilters,
        filters
    };
};

export const refineGetProducts = async (queryParams = {}) => {
    // Construye la consulta WHERE según los parámetros recibidos.
    const { filters } = buildWhereQuery(queryParams);

    // Consulta la base de datos con los filtros (si existen) y ordena por ID ascendente.
    const data = await prisma.marketplace.findMany({
        // Aplicamos los filtros de manera dinamica si hay queryParams.
        where: {
            ...filters
        },
        // Agrega el join del producto.
        include: { product: true },
        orderBy: { id: 'asc' }
    });

    return data.map((item) => ({
        // Replicamos el resultado del producto y agregamos las propiedades adicionales.
        ...item.product,
        comision: item.comision,
        costoEnvio: item.costoEnvio,
        lastUpdatedAt: item.updatedAt,
        originalPrice: item.originalPrice,
        price: item.price,
        productCode: item.productCode
    }));
};