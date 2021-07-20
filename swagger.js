const options = {
    openapi: "3.0.0"
}

const swaggerAutogen = require('swagger-autogen')(options);
const outputFile = './swaggerFile.json'

const endpointsFiles = ['./routes.js']

const info = {
    info: {
        title: "Group A Swagger",
        description: "Documentation of Group As APIs, using swagger"
    },
    host: "my.api:50001",
    basePath: "/",
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    components: {
     securitySchemes: {
       bearerAuth: {
         type: "http",
         scheme: "bearer",
         in: "header",
         bearerFormat: "JWT"
       },
     }
   }
   ,
   security: [{
     bearerAuth: []
   }]
}

swaggerAutogen(outputFile, endpointsFiles, info)
