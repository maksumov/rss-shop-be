import axios from "axios";

/**
 * @returns products list wrapped in promise
 */
export default async () =>
  axios
    .get("https://d2uyqlu9f4x6jx.cloudfront.net/products.json")
    .then((response) => response.data)
    .catch((err) => err.toJSON());
