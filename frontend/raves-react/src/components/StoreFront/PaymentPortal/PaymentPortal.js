import React, {useState, useEffect} from "react";
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import "./PaymentPortal.css";

const PaymentPortal = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [submitMessage, setSubmitMessage] = useState(null);


  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      setSubmitMessage("Error with payments: " +  error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setSubmitMessage("Payment Successfull");
    }
  };

  //<span style ={{fontSize: 30}} className = "badge badge-primary m-2">{this.formatCount()}</span>
  return (

    <div class="text-white">
      <form onSubmit={handleSubmit}>

      <div class="container min-vh-100">
        <div class="row">
          <div class="col-sm">
            <div class = "card">
              <h1 style ={{fontSize: 30}}><b>Please Enter Your Payment Information</b></h1>
              {submitMessage ? <p id="success"> </p>:<p id="failure"> </p> }

            </div>
          </div>
        <div class="col-sm">

          <input
            type = "text"
            placeHolder = "Full Name"
            name = "full name"
            required/>

            <input
            type = "text"
            placeHolder = "Phone Number"
            name = "phone number"
            required />

            <input
            type = "text"
            placeHolder = "Email"
            name = "email"
            required />

            <input
            type = "text"
            placeHolder = "Address"
            name = "address"
            required />

            <CardElement
              options={{
                style: {
                  margin: '10px',
                  base: {
                      fontSize: '20px',
                  }
                }
              }
            }
            />
       <button style = {{fontSize: 20, frontWeight: "bold"}} className = "btn btn-primary" type="submit" disabled={!stripe}>
        Submit
        </button>

          </div>
        </div>
     </div>
   </form>
  </div>
  );
}
export default PaymentPortal;
