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
    servers: [
      {
        url: 'http://localhost:3000',
      },
      {
        url: 'https://devcamper-bboj.onrender.com',
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/**/*.ts'],
}

const swaggerSpec = SwaggerJSDoc(options)
const swaggerUi = setup(swaggerSpec, { explorer: true })

export { swaggerUi, serve as swaggerServe }
