import utils from "aws-lambda-test-utils";
import { getAllProducts } from "./getAllProducts";

const product = {
  id: "317700",
  title: "Cок SWELL гранатовый, 0,25л x 8 шт",
  description:
    "Cок SWELL гранатовый – это 100% гранатовый продукт без добавления консервантов и красителей. На Востоке сок из граната, как и сам плод, ценились с древних времен. Этот фрукт считался и по сей день рассматривается как крайне полезный в лечебных целях. Гранатовый сок повышает гемоглобин, регулирует деятельность желудка, тонизирует и улучшает общее самочувствие, а также является натуральным противорадиационным средством, повышает работоспособность.",
  price: 754,
};

test("should get products", async () => {
  // const testEvent = {
  //   pathParameters: {
  //     id: "317700",
  //   },
  // };
  const testEvent = utils.mockEventCreator.createAPIGatewayEvent();
  const mockContextCreator = utils.mockContextCreator;
  const ctxOpts = {
    functionName: "LambdaTest",
    functionVersion: "1",
    invokedFunctionArn:
      "arn:aws:lambda:eu-west-1:655240711487:function:LambdaTest:ci",
  };
  const context = mockContextCreator(ctxOpts, test);

  const products = await getAllProducts(testEvent, context, null);
  expect(products).arrayContaining(product);
});
