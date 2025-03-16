import React, { useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess }) => {
  return (
    <PayPalScriptProvider options={{ 
      "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID 
    }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toString(),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            onSuccess(details);
          });
        }}
        style={{ layout: "horizontal" }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton; 