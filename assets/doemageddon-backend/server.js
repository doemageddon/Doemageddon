const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
require("dotenv").config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

let hunterCount = 0;
let mealCount = 0;

const MAX_HUNTERS = 100;
const MAX_MEALS = 100;

app.use(cors());
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { mealTicket } = req.body;

    if (hunterCount >= MAX_HUNTERS) {
      return res.status(400).json({ error: "Hunter registration is full." });
    }

    if (mealTicket && mealCount >= MAX_MEALS) {
      return res.status(400).json({ error: "Meal tickets are sold out." });
    }

    const amount = 10000 + (mealTicket ? 2000 : 0); // $100 + optional $20

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    hunterCount++;
    if (mealTicket) mealCount++;

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4242, () => console.log("✅ Server running at http://localhost:4242"));

