import SwaggerJSDoc from 'swagger-jsdoc'
import { serve, setup } from 'swagger-ui-express'

const options: SwaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Devcamper API Docs',
      version: '1.0.0',
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/**/*.ts'],
}

const swaggerSpec = SwaggerJSDoc(options)
const swaggerUi = setup(swaggerSpec)

export { swaggerUi, serve as swaggerServe }
