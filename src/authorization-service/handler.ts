import {
  APIGatewayAuthorizerCallback,
  APIGatewayTokenAuthorizerEvent,
} from "aws-lambda";
import "source-map-support/register";

const generatePolicy = (
  principalId: string,
  resource: string,
  effect = "Allow"
) => {
  return {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
};

export const basicAuthorizer = (
  event: APIGatewayTokenAuthorizerEvent,
  _context,
  cb: APIGatewayAuthorizerCallback
) => {
  console.log("basicAuthorizer invoked", JSON.stringify(event, null, 2));

  if (event["type"] != "TOKEN") {
    return cb("Unauthorized");
  }

  try {
    const encodedCreds = event.authorizationToken.split(" ")[1];
    const buff = Buffer.from(encodedCreds, "base64");
    const plainCreds = buff.toString("utf-8").split(":");
    const [username, password] = plainCreds;

    console.log(`username: ${username} and password: ${password}`);

    const users = JSON.parse(process.env?.CREDENTIALS || "");
    console.log("users", users);
    const storedUserPassword = users[username];

    console.log("storedUserPassword", storedUserPassword);
    const effect =
      !storedUserPassword || storedUserPassword !== password ? "Deny" : "Allow";

    const policy = generatePolicy(encodedCreds, event.methodArn, effect);

    console.log(JSON.stringify(policy, null, 2));

    cb(null, policy);
  } catch (e) {
    console.log("Error catched!");
    cb(`Unauthorized: ${e.message}`);
  }
};
