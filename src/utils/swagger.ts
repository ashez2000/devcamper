import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Devcamper API Docs',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts', './src/schemas/*.ts'],
}

export default swaggerJsdoc(options)
