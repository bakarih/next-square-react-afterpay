import { CreditCard, PaymentForm, Ach } from 'react-square-web-payments-sdk';

const MyPaymentForm = () => (
  <PaymentForm
    /**
     * Identifies the calling form with a verified application ID generated from
     * the Square Application Dashboard.
     */
    applicationId="sandbox-XXXXXX-XXXXXXXXXXXXXXX"
    /**
     * Invoked when payment form receives the result of a tokenize generation
     * request. The result will be a valid credit card or wallet token, or an error.
     */
     cardTokenizeResponseReceived={ async (token, buyer) => {
      const response = await fetch('/api/pay', {
        method: "POST",
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify({
          sourceId: token.token
        })
      })
      alert(JSON.stringify(await response.json(), null , 2));
    }}
    /**
     * Identifies the location of the merchant that is taking the payment.
     * Obtained from the Square Application Dashboard - Locations tab.
     */
    locationId="XXXXXXXXXXXXXX"
  >
  {/* Component for taking Credit Card payments */}
  <CreditCard />

  <p></p>
  {/*Component for paying with Direct Debit (ACH) */}
  <Ach accountHolderName="John Don't" redirectURI="https://example.com/" transactionId="54321" />
  </PaymentForm>
);

export default MyPaymentForm;