const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY'); // Replace with your secret key
const path = require('path');

app.use(express.static('public'));
app.use(express.json());

// Track registration count
let hunterCount = 0;
let mealCount = 0;

app.post('/create-payment-intent', async (req, res) => {
  const mealTicket = req.body.mealTicket;
  const hunterPrice = 10000; // $100
  const mealPrice = mealTicket ? 2000 : 0; // $20
  const total = hunterPrice + mealPrice;

  if (hunterCount >= 100) {
    return res.status(400).json({ error: 'Hunter registration is full.' });
  }
  if (mealTicket && mealCount >= 100) {
    return res.status(400).json({ error: 'Meal tickets are sold out.' });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
  });

  // Tentative reservation
  hunterCount++;
  if (mealTicket) mealCount++;

  res.send({ clientSecret: paymentIntent.client_secret });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
