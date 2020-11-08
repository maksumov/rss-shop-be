const serverlessConfiguration = {
    service: {
        name: "api-doc",
    },
    frameworkVersion: "2",
    custom: {
        webpack: {
            webpackConfig: "./webpack.config.js",
            includeModules: true,
        },
    },
    plugins: [
        "serverless-webpack",
        "serverless-offline",
        "serverless-plugin-typescript-express",
    ],
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
        apidoc: {
            handler: "handler.apidoc",
            events: [
                {
                    http: {
                        method: "get",
                        path: "api-doc",
                        cors: true,
                    },
                },
            ],
        },
    },
};
module.exports = serverlessConfiguration;
//# sourceMappingURL=serverless.js.map