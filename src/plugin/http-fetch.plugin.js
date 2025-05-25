


export const customFetch = async (url, method, { baseHeaders = {}, headers = {}, body = null }) => {
    try {
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                ...baseHeaders,
                ...headers
            }
        };

        // Aqui se evita que el metodo get contenga body.
        if (body && method !== "GET") {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        // Rechaza la transaccion.
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Manejo seguro del JSON si retorna un objeto vacio.
        const data = await response.json().catch(() => null);

        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
};