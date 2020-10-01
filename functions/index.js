const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request, response } = require("express");
const stripe = require("stripe")(
  "sk_test_51HSJKyEcpWfEcDCc9tB6Pve1LyTl4PMzyxjUzEJzWblZr7N3l0atoxqOrWXvWXC7RrcIN2Ari6x6EN2qCbkFSzzI00c9l1UMxF"
);
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("Hello World"));

//Start From Herecd
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("payment request generated", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);
