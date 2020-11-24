import type { Serverless } from "serverless/aws";

const BUCKET_NAME = "maksumov-bucket-for-images";

const serverlessConfiguration: Serverless = {
  service: {
    name: "import-service",
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
      SQS_URL: {
        Ref: "SQSQueue",
      },
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "s3:ListBucket",
        Resource: [`arn:aws:s3:::${BUCKET_NAME}`],
      },
      {
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`],
      },
      {
        Effect: "Allow",
        Action: "sqs:*",
        Resource: {
          "Fn::GetAtt": ["SQSQueue", "Arn"],
        },
      },
    ],
  },

  resources: {
    Resources: {
      SQSQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "catalog-items-queue",
        },
      },
    },
    Outputs: {
      SQSQueueArn: {
        Value: {
          "Fn::GetAtt": ["SQSQueue", "Arn"],
        },
      },
    },
  },

  functions: {
    importProductsFile: {
      handler: "handler.importProductsFile",
      events: [
        {
          http: {
            method: "get",
            path: "/import",
            cors: true,
            request: {
              parameters: {
                querystrings: {
                  name: true,
                },
              },
            },
          },
        },
      ],
    },
    importFileParser: {
      handler: "handler.importFileParser",
      events: [
        {
          s3: {
            bucket: BUCKET_NAME,
            event: "s3:ObjectCreated:*",
            rules: [{ prefix: "uploaded/", suffix: "" }],
            existing: true,
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
