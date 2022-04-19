const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');
// import express from 'express';

// const router = express.Router();

const options = {
//swagger문서 설정
    swaggerDefinition: {
        info: {
            title: 'Magazine Backend API',
            version: '1.0.0',
            description: 'Test API with express',
        },
        host: 'localhost:8080',
        basePath: '/'
    },
//swagger api가 존재하는 곳 입니다.
    apis: [
      './src/**/*.js',
    //   './src/post/*.js',
    //   './src/auth/*.js',
    //   './src/like/*.js',
    //   './src/comment/*.js'
    ]
};

const specs = swaggereJsdoc(options);

// router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// export default router;

module.exports = { swaggerUi, specs }