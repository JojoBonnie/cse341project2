const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const routeFiles = path.resolve(__dirname, './*.js');

// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      title: 'Dating App API',
      description: 'A REST API for a dating app with user and profile management.',
      version: '1.0.0'
    },
    host: process.env.HOST,
    basePath: '/',
    schemes: [process.env.HTTP_PROTOCOL],
    produces: ['application/json'],
    consumes: ['application/json'],
    definitions: {
      User: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'password'],
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      Profile: {
        type: 'object',
        required: ['user', 'bio', 'interests', 'dateOfBirth', 'gender', 'occupation', 'location'],
        properties: {
          user: { type: 'string', format: 'ObjectId' },
          bio: { type: 'string' },
          profilePic: { type: 'string' },
          interests: {
            type: 'array',
            items: { type: 'string' }
          },
          dateOfBirth: { type: 'string', format: 'date' },
          gender: { type: 'string' },
          occupation: { type: 'string' },
          location: {
            type: 'object',
            properties: {
              city: { type: 'string' },
              state: { type: 'string' },
              country: { type: 'string' }
            }
          },
          social: {
            type: 'object',
            properties: {
              facebook: { type: 'string' },
              twitter: { type: 'string' },
              linkedin: { type: 'string' },
              instagram: { type: 'string' }
            }
          },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      }
    }
  },
  apis: [routeFiles]
};

const uiOptions = {
  customSiteTitle: 'Dating App API',
  customCss: '.swagger-ui .topbar { display: none }'
};

// Initialize swagger-jsdoc
const swaggerDocument = swaggerJsDoc(swaggerOptions);

// export swaggerDocument to json file, if it doesn't not exists
const fs = require('fs');
const swaggerJsonFile = path.resolve(__dirname, 'swagger.json');
if (!fs.existsSync(swaggerJsonFile)) {
  fs.writeFileSync(swaggerJsonFile, JSON.stringify(swaggerDocument, null, 2));
}

// Set up Swagger UI
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument, uiOptions));

module.exports = router;
