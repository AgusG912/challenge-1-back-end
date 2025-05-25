import { PrismaClient } from "@prisma/client";
import { encryptPassword } from "../src/helpers/auth/encryptPassword.js";

const prisma = new PrismaClient();

async function main() {
    console.log('[SEED] Ejecutando seed...');

    //* La creacion de los productos.
    await prisma.product.createMany({
        data: [
            {
                "name": "Guitar",
                "iva": 0.16,
                "costoFabricacion": 500
            },
            {
                "name": "Chair",
                "iva": 0.16,
                "costoFabricacion": 1000
            },
            {
                "name": "PC",
                "iva": 0.21,
                "costoFabricacion": 70000
            },
            {
                "name": "RAM1",
                "iva": 0.21,
                "costoFabricacion": 9000
            },
            {
                "name": "USB",
                "iva": 0.16,
                "costoFabricacion": 200
            }
        ],
    });
    console.log('[SEED] Productos agregados.');

    //* Los valores sincronizados con el marketplace.
    await prisma.marketplace.createMany({
        data: [
            {
                productCode: 'MLM1',
                originalPrice: 5000,
                price: 3000,
                title: 'Guitar',
                comision: 500,
                costoEnvio: 149.5,
                productId: 1,
                updatedAt: new Date()
            },
            {
                productCode: 'MLM2',
                originalPrice: 3000,
                price: 1500,
                title: 'Chair',
                comision: 500,
                costoEnvio: 170,
                productId: 2,
                updatedAt: new Date()
            },
            {
                productCode: 'MLM3',
                originalPrice: 100000,
                price: 80000,
                title: 'PC',
                comision: 20000,
                costoEnvio: 5000,
                productId: 3,
                updatedAt: new Date()
            },
            {
                productCode: 'MLM4',
                originalPrice: 15000,
                price: 8000,
                title: 'RAM1',
                comision: 2000,
                costoEnvio: 1000,
                productId: 4,
                updatedAt: new Date()
            },
            {
                productCode: 'MLM5',
                originalPrice: 500,
                price: 100,
                title: 'USB',
                comision: 50,
                costoEnvio: 10,
                productId: 5,
                updatedAt: new Date()
            },
        ]
    });
    console.log('[SEED] Marketplace agregados.');

    //* Creacion de los roles.
    await prisma.role.createMany({
        data: [
            {
                "name": "admin"
            },
            {
                "name": "moderador"
            },
            {
                "name": "visitante"
            }
        ]
    });
    console.log('[SEED] Roles agregados.');

    //* Creacion de los roles.
    await prisma.user.createMany({
        data: [
            {
                "email": "admin@contoso.com",
                "password": encryptPassword('1234Qwer$'),
                "alias": "Admin",
                "roleId": 1,
            },
            {
                "email": "moderador@contoso.com",
                "password": encryptPassword('1234Qwer$'),
                "alias": "Moderador",
                "roleId": 2,
            },
            {
                "email": "visitante@contoso.com",
                "password": encryptPassword('1234Qwer$'),
                "alias": "Visitante",
                "roleId": 3,
            }
        ]
    });
    console.log('[SEED] Usuarios agregados.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log('[SEED] Completado satisfactoriamente.');
    });