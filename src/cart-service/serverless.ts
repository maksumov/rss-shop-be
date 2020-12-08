import type { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: {
    name: "cart-service",
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
    runtime: "nodejs12.x",
    region: "eu-west-1",
    stage: "dev",
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
  },

  functions: {
    proxy: {
      handler: "handler.hello",
      events: [
        {
          http: {
            path: "/{proxy+}",
            method: "any",
            integration: "http-proxy",
            request: {
              uri: "https://www.redirectToHere.com/{proxy}",
              parameters: {
                paths: {
                  proxy: true,
                },
              },
            },
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
