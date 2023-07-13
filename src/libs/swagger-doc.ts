import swaggerDoc from 'swagger-jsdoc'

const apiSpec = swaggerDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Devcamper API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*', './src/schemas/*'],
})

export default apiSpec
