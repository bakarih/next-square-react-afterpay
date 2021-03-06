// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client } from 'square';
import { randomUUID } from 'crypto';
BigInt.prototype.toJSON = function() { return this.toString(); }

// Creating an instance of the Square Client and saving in paymentsAPI variable
// Note we are using the Square access token we saved earlier and running this in 
// "sandbox" mode.
const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: 'sandbox',
}) 

console.info("New Client created", paymentsApi)
export default async function handler(req, res) {
  if ( req.method === 'POST' ) {
    const { result } = await paymentsApi.createPayment({
      // An idempotency key is a unique value generated by the client 
      // which the resource server uses to recognize subsequent retries of the same request.
      // the sourceId comes from the id sent back in the body of the front end fetch request
      idempotencyKey: randomUUID(),
      sourceId: req.body.sourceId,
      amountMoney: {
        currency: 'USD',
        amount: 100
      }
    })
    console.log("The api token handler returned ", result);
    // don't forget to check the server logs!
    res.status(200).json(result);
  } else {
    res.status(500).send();
  }
}
