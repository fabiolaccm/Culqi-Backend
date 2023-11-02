# Tokenización de Tarjetas para Culqi - Backend

Proyecto de tokenización de tarjetas con NodeJs, Vue y Redis.

## Usuarios de Prueba

La contraseña para los usuarios es: 123456
user1
user2
user3

## Tarjetas de Crédito de Prueba

Mastercard 5031-7557-3453-0604
CVV 123
Fecha caducidad 11/25

Visa 4009-1753-3280-6176
CVV 123
Fecha caducidad 11/25

## Pasos para la Instalación

Para la clonación del repositorio debe seguir lo siguiente:

```bash
git clone https://github.com/fabiolaccm/Culqi-backend/tree/master
```
Instalar las dependencias:

```bash
npm install
```
Instalar Redis para ejecutar y desplegar la aplicación en Docker para el ambiente local y si se tiene instalado Redis, sólo cambiar los datos de conexión en el archivo env.yaml:

`REDIS_URL: 'redis://localhost:8080'`

```bash
npm run deploy-docker:build
```
## Ejecutar los siguientes comandos:

En local:

```bash
npm run dev
```

En producción:

```bash
npm npm run start o run prod
```
Generación de Build:

```bash
npm run build
```
Para ejecución de las pruebas:

```bash
npm run test
npm run test:watch
npm run coverage
```

En Docker:

```bash
# -> para ejecución
npm run deploy-docker:build

# -> para desplegar nuevamente
npm run deploy-docker:rebuild

# -> para ejecución cuando se encuentra detenido
npm run deploy-docker:start

# -> para detener 
npm run deploy-docker:stop
```

## Variables de entorno
 Modificar en el archivo `.env.yaml`. Vienen con valores predeterminados:


```bash
development:
  HOST:
    BASE_PATH: 
    CORS_URL: '*'
    PORT: 4700
  DATABASE:
    REDIS_URL: 'redis://localhost:6379'
  TOKEN:
    ENCRYPTION_SECRET_KEY: 'WnZr4u7x!A%D*G-KaPdSgVkYp2s5v8y/'
production:
  HOST:
    BASE_PATH:
    CORS_URL: '*'
    PORT: 4700
  DATABASE:
    REDIS_URL: 'redis://redis-db:6379'
  TOKEN:
    ENCRYPTION_SECRET_KEY: 'WnZr4u7x!A%D*G-KaPdSgVkYp2s5v8y/'
    
# App Information
app_info:
  APP_NAME: 'ms-card-token'
  APP_DESCRIPTION: 'card tokenization'
  APP_VERSION: 1.0

```

## API Endpoints

Lista de rutas:
`POST /v1/login` - login\

**Card routes**:\
`POST /v1/tokens` - registrar\
 - Header \
    `POST commerce-identifier -> Indentificador del comercio. (pk_test_A19A5C2C980345AE)`    
    
`GET /v1/tokens/card-info` - información de tarjetas
 - Header \
    `POST commerce-identifier -> Indentificador del comercio. (pk_test_A19A5C2C980345AE)`\
    `POST Authorization -> token. (900f2bF4A3F39d47)`


## Error Handling

Para el manejo de errores se tiene el siguiente formato:
:

```json
{
    "code": "10001",
    "status": 400,
    "message": "Bad Request",
    "errors": []
}
```

## Validación

Los datos se validan en: [Class Validator](https://www.npmjs.com/package/class-validator).