import express from "express";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51PCNEYSDMiaUW4NZPyJumkmS4wssDhhdOb0GeeZVNowaGLoKIDjmySqgzMMfIO9fw2WvHgVeGJ0ZZPCLyGKujkQP00N6vferyi";
const SECRET_KEY = "sk_test_51PCNEYSDMiaUW4NZvaNKQJIKovP1NvmbbwclyORf61YKtdQ1VOxZ0Y1GDXD8p35yaCgTzhrLuOzV4lJCeHiCKcjf00drIufqpd";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "inr",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});