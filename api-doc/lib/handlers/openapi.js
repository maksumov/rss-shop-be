const apiSpec = {
    swagger: "3.0",
    info: {
        description: "Additional info at the https://github.com/maksumov/rss-shop-be/pull/1",
        version: "1.0.0",
        title: "Maksumov's Store",
        contact: {
            name: "Marat Maksumov",
            url: "https://github.com/maksumov/rss-shop-be/pull/1",
        },
        license: {
            name: "Apache 2.0",
            url: "http://www.apache.org/licenses/LICENSE-2.0.html",
        },
    },
    servers: [
        {
            url: "https://wnxy68e0x6.execute-api.eu-west-1.amazonaws.com/dev",
            description: "API deployment",
        },
    ],
    paths: {
        "/product/available/": {
            get: {
                tags: ["product"],
                description: "Returns a List of Products",
                operationId: "getAllProducts",
                parameters: [],
                produces: ["application/json"],
                responses: {
                    "200": {
                        description: "successful operation",
                        schema: {
                            $ref: "#/definitions/Product",
                        },
                        "x-swagger-router-controller": "Product",
                    },
                },
            },
        },
        "/product/available/{id}": {
            get: {
                tags: ["product"],
                summary: "Get Products By Id",
                description: "Returns a single product",
                operationId: "getProductById",
                parameters: [],
                produces: ["application/json"],
                responses: {
                    "200": {
                        description: "successful operation",
                        schema: {
                            $ref: "#/definitions/Product",
                        },
                        "x-swagger-router-controller": "Product",
                    },
                    "404": {
                        description: "Product not found",
                        schema: {
                            $ref: "#/definitions/Product",
                        },
                        "x-swagger-router-controller": "Product",
                    },
                },
            },
        },
    },
    definitions: {
        Product: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                },
                title: {
                    type: "string",
                },
                description: {
                    type: "string",
                },
                price: {
                    type: "number",
                },
            },
            example: {
                id: "523123",
                title: "Apple iPhone",
                description: "Apple iPhone description",
                price: 500,
            },
        },
    },
    externalDocs: {
        description: "Find out more about Task",
        url: "https://github.com/rolling-scopes-school/nodejs-aws-tasks/blob/main/task3-product-api/task.md",
    },
};
export default apiSpec;
//# sourceMappingURL=openapi.js.map