import type { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: {
    name: "authorization-service",
  },
  org: "maksumov",
  app: "rss-store",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    region: "eu-west-1",
    stage: "dev",
    runtime: "nodejs12.x",
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
  },

  resources: {
    Description: "RS School Node in AWS course - authorization service stack",
    Resources: {},
  },

  functions: {
    hello: {
      handler: "handler.hello",
      events: [
        {
          http: {
            method: "get",
            path: "hello",
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
