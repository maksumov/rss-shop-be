import type { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: {
    name: "product-service",
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: ["serverless-webpack", "serverless-dotenv-plugin"],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    region: "eu-west-1",
    stage: "dev",
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      PG_HOST: "${env:PG_HOST}",
      PG_PORT: "${env:PG_PORT}",
      PG_DATABASE: "${env:PG_DATABASE}",
      PG_USERNAME: "${env:PG_USERNAME}",
      PG_PASSWORD: "${env:PG_PASSWORD}",
    },
  },
  functions: {
    getAllProducts: {
      handler: "handler.getAllProducts",
      events: [
        {
          http: {
            method: "get",
            path: "product/available/",
            cors: true,
          },
        },
      ],
    },
    getProductById: {
      handler: "handler.getProductById",
      events: [
        {
          http: {
            method: "get",
            path: "product/available/{id}",
            cors: true,
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
