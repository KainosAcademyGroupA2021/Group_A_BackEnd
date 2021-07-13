const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swaggerFile.json'
const endpointsFiles = ['./routes.js']

const info = {
    info: {
        version: "1.0.0",
        title: "Group A Swagger",
        description: "Documentation of Group As APIs, using swagger"
    },
    host: "localhost:5000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json']
}

swaggerAutogen(outputFile, endpointsFiles, info)
