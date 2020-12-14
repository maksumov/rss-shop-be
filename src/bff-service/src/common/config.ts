const recipients: { [key: string]: string } = {
  // products: 'https://12yhrnlj11.execute-api.eu-west-1.amazonaws.com/dev/products',
  // cart: 'http://maksumov-cart-api-dev.eu-west-1.elasticbeanstalk.com/'
};

['products', 'cart'].forEach(
  (key) => (recipients[key] = <string>process.env[key])
);

console.log('recipients', recipients);

export { recipients };
