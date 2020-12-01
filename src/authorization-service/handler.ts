import "source-map-support/register";

const generatePolicy = (principalId: string, resource, effect = "Allow") => {
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

export const basicAuthorizer = async (event, _context, cb) => {
  console.log("basicAuthorizer invoked", JSON.stringify(event, null, 2));

  if (event["type"] != "TOKEN") {
    cb("Unauthorized");
  }

  try {
    const encodedCreds = event.authorizationToken.split(" ")[1];
    const buff = Buffer.from(encodedCreds, "base64");
    const plainCreds = buff.toString("utf-8").split(":");
    const [username, password] = plainCreds;

    console.log(`username: ${username} and password: ${password}`);

    const storedUserPassword = process.env[username];
    const effect =
      !storedUserPassword || storedUserPassword != password ? "Deny" : "Allow";

    const policy = generatePolicy(encodedCreds, event.methodArn, effect);

    cb(null, policy);
  } catch (e) {
    cb(`Unauthorized: ${e.message}`);
  }
};
