

export const pluginDefaultSettings = {
    baseUrl: process.env.BASE_MARKETPLACE_API,
    baseHeaders: {
        'x-authorization-token': process.env.AUTHORIZATION_MARKETPLACE_API
    }
}