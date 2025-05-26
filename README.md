# 🚀 Proyecto Challenge 1 - E-commerce Backend

Este proyecto corresponde al backend de una aplicación de e-commerce, diseñado para gestionar la autenticación, validaciones y conexión con la base de datos PostgreSQL utilizando Prisma ORM. Construido con Express, permite una comunicación eficiente con el frontend y la API externa Marketplace-API.

<details>

<summary> 📍 Este repositorio forma parte de un grupo.</summary>

<br/>

 > [Frontend](https://github.com/AgusG912/challenge-1-front-end)

 > **📌 Backend**

 > [Marketplace](https://github.com/AgusG912/challenge-1-marketplace-api)

</details>

## 🛠 Características principales
- ✅ `Framework Express` → Backend ligero y escalable.
- ✅ `Autenticación con JWT` → Tokens seguros para la gestión de sesiones.
- ✅ `Prisma ORM` → Manejo de base de datos eficiente con migraciones automatizadas.
- ✅ `Validaciones con Express Validator` → Seguridad en las entradas de datos.
- ✅ `Gestión de estado en base de datos` → Creación de usuarios, productos y más.
- ✅ `Cifrado de contraseñas con Bcrypt.js` → Almacenamiento seguro de credenciales.
- ✅ `Configuración flexible con dotenv` → Variables de entorno para diferentes entornos.

## 📦 Librerías utilizadas

### 📌 Dependencias principales
- `Express` → Framework backend ligero y rápido.
- `Prisma ORM` → Abstracción de base de datos con migraciones automatizadas.
- `JWT (jsonwebtoken)` → Manejo de autenticación segura.
- `Express Validator` → Validaciones robustas en las rutas.
- `Bcrypt.js` → Cifrado seguro de contraseñas.
- `Dotenv` → Gestión de variables de entorno.
- `CORS` → Protección de accesos entre dominios.

### 🛠 Dependencias de desarrollo
- `Nodemon` → Reinicio automático del servidor en desarrollo.
- `Prisma CLI` → Herramienta para manejar esquemas y migraciones de la base de datos.


## ⚡Como ejecutar el proyecto

- Clonar el repositorio.

```
    git clone <repo-url>
    cd ecommerce-backend
```

- Renombra `.env.template` a `.env`. Y Configurar las variables de entorno.

```
    # Es el puerto en el cual correra la aplicacion.
    PORT=[NUMBER]

    # Se refiere a la base del http client que se utiliza para hacer peticiones.
    BASE_MARKETPLACE_API

    # Es la key que te permite realizar peticiones en el marketplace Api (Ambas deben coincidir).
    AUTHORIZATION_MARKETPLACE_API

    # Es la palabra secreta que se utiliza para cifrar/descifrar JWT.
    SECRET_JWT_SEED=BACKEND_CHALLENGE_EXAMPLE

    # Tiempo de vida del token [5m = 5 minutos], [1h = 1 hora]
    TOKEN_LIFE_TIME=[7m]
```

- Instalar las dependencias.

```
    npm install
```

- Crear base de datos con `Docker` [✅].

``` docker
    docker compose up -d
```

- Crear base de datos con `Postgresql` [ALTERNATIVA].

```
    # Postgresql - configuracion manual

    # Cadena de conexion.
    POSTGRES_URL="postgresql://postgres:123456@localhost:5432/contoso_db"

    # Detalles sobre la base de datos.
    POSTGRES_USER=[postgres]
    POSTGRES_DB=[contoso_db]
    POSTGRES_PASSWORD=[123456]

    📌 Si PostgreSQL no está en localhost, usa la IP de tu servidor.
```

- Crear las migraciones de la base de datos, generar el cliente `ORM` y ejecutar el seed [🌱].

```
    npm run setup-db
```

- Ejecutar el proyecto en modo de desarrollo.

```
    npm run dev
```

## 📁 Estructura de carpetas

```

    - Tree files
    │
    ├───prisma
    │       schema.prisma
    │       seed.js
    │
    └───src
        │   index.js
        │
        ├───controllers
        │   ├───admin
        │   │       getHistoryChanges.js
        │   │       getUsers.js
        │   │
        │   ├───auth
        │   │       createUser.js
        │   │       loginUser.js
        │   │       renewToken.js
        │   │
        │   ├───products
        │   │       getProducts.js
        │   │       getSearchProducts.js
        │   │       patchProducts.js
        │   │
        │   └───sales
        │           getSales.js
        │
        ├───database
        │       dbConnection.js
        │
        ├───helpers
        │   ├───auth
        │   │       encryptPassword.js
        │   │       jwt.js
        │   │       userExistsCheck.js
        │   │
        │   ├───products
        │   │       detectChanges.js
        │   │       marketplaceSync.js
        │   │       refineGetProducts.js
        │   │       updatedProductFields.js
        │   │       updatedProductFieldsDiff.js
        │   │
        │   ├───productsHistory
        │   │       detectNewChanges.history.js
        │   │       updateProductsHistory.js
        │   │
        │   └───sales
        │           mergeProductsWithSales.js
        │
        ├───middleware
        │   ├───auth
        │   │       validateJWT.js
        │   │       validateNewLogin.js
        │   │       validateNewUser.js
        │   │
        │   ├───general
        │   │       checkBody.js
        │   │       checkBodyAllowKeys.js
        │   │       checkQueryAllowKeys.js
        │   │       handleErrorMessage.js
        │   │
        │   └───products
        │           validatePatchProducts.js
        │           validatePatchProductsParams.js
        │           validateQueryAtProducts.js
        │
        ├───plugin
        │       http-client.plugin.js
        │       http-fetch.plugin.js
        │
        ├───routes
        │       admin.routes.js
        │       auth.routes.js
        │       products.routes.js
        │
        └───schema
                buildHttp-client.schema.js
                patch-products.config.js

```
