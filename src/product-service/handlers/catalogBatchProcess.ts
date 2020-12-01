import { SQSEvent, SQSHandler } from "aws-lambda";
import { SNS } from "aws-sdk";
import logger from "./utils/logger";
import { pgQuery } from "./utils/pg-client";

export const catalogBatchProcess = (event: SQSEvent): SQSHandler => {
  logger.info(event, "catalogBatchProcessing");

  event.Records.forEach(async (record) => {
    const { title, description, price, count } = JSON.parse(record.body);
    // TODO: validate payload

    logger.info({ title, description, price, count }, "catalogBatchProcessing");

    try {
      await pgQuery({ text: "BEGIN" });

      const res = await pgQuery({
        name: "add product to products list and get its id",
        text: `INSERT INTO store.products (title,description,price) VALUES ($1, $2, $3) RETURNING id`,
        values: [title, description, parseInt(price, 10)],
      });
      const { id } = res[0];

      await pgQuery({
        name: "add stocks for new product",
        text: `INSERT INTO store.stocks (product_id,count) VALUES ($1, $2)`,
        values: [id, parseInt(count, 10)],
      });
      await pgQuery({ text: "COMMIT" });

      const sns = new SNS({ region: "eu-west-1" });
      const newProduct = {
        id,
        title,
        description,
        price: parseInt(price, 10),
        count: parseInt(count, 10),
      };

      sns.publish(
        {
          Subject: "Product created",
          Message: JSON.stringify(newProduct, null, 2),
          TopicArn: process.env.SNS_TOPIC_ARN,
        },
        () => {
          console.log("Send email for products creation: ", newProduct);
        }
      );
    } catch (err) {
      await pgQuery({ text: "ROLLBACK" });
      logger.error(err, "Error creating product");
    }
  });

  return;
};
