// Import builtin NodeJS modules to instantiate the service
import https from "https";
import fs from "fs";

// const express = require('express');
import express from "express";

// const fetch = require("node-fetch");
import fetch from "node-fetch";

// const config = require("dotenv/config")
import "dotenv/config";

// const path = require("path");
import path from "path";

// import express from "express";

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PORT = 8888 } = process.env;
const base = "https://api-m.sandbox.paypal.com";
const app = express();

// host static files
app.use(express.static("client"));

// parse post params sent in body in json format
app.use(express.json());

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async (cart) => {
  // use the cart information passed from the front-end to calculate the purchase unit details
  console.log(
    "shopping cart information passed from the frontend createOrder() callback:",
    cart,
  );

  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  /*
    const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "100.00",
        },
      },
    ],
  };
  */

  /* Dee https://developer.paypal.com/docs/api/orders/v2/ for guidance */
  const payload = {
    intent: "CAPTURE", 
    purchase_units: 
    [
      {
        amount: { currency_code: "USD", value: "123.45", breakdown: { "item_total": { value: "123.45", currency_code: "USD" }}},
        reference_id: "AI6BB_001",
        description: "Dues_and_Donations",
        /* payee:  { email_address: "info@coastsidearc.org", merchant_id: "Coastside ARC" }, */
        
        items: 
        [
          { name: "2023_Primary_Dues",      unit_amount: { currency_code: "USD",  value: "20.00" }, quantity: "0" }, //   0.00
          { name: "2023_Family_Dues",       unit_amount: { currency_code: "USD",  value:  "3.00" }, quantity: "0" }, //   0.00
          { name: "2024_Primary_Dues",      unit_amount: { currency_code: "USD",  value: "20.00" }, quantity: "1" }, //  20.00
          { name: "2024_Family_Dues",       unit_amount: { currency_code: "USD",  value:  "3.00" }, quantity: "1" }, //  23.00
          { name: "2025_Primary_Dues",      unit_amount: { currency_code: "USD",  value: "20.00" }, quantity: "1" }, //  43.00
          { name: "2025_Family_Dues",       unit_amount: { currency_code: "USD",  value:  "3.00" }, quantity: "1" }, //  46.00
          { name: "2026_Primary_Dues",      unit_amount: { currency_code: "USD",  value: "20.00" }, quantity: "0" }, //  46.00
          { name: "2026_Family_Dues",       unit_amount: { currency_code: "USD",  value:  "3.00" }, quantity: "0" }, //  46.00
          { name: "Repeater_Fund",          unit_amount: { currency_code: "USD",  value: "32.65" }, quantity: "1" }, //  78.65
          { name: "Digipeater_and_APRS",    unit_amount: { currency_code: "USD",  value: "40.00" }, quantity: "1" }, // 118.65
          { name: "Estimated_Paypal_Fees",  unit_amount: { currency_code: "USD",  value:  "4.80" }, quantity: "1" }  // 123.45
        ],
        
      },
    ],
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });

  return handleResponse(response);
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

app.post("/api/orders", async (req, res) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const { cart } = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

app.post("/api/orders/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

// serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./client/checkout.html"));
});

app.listen(PORT, () => {
  console.log(`Node server listening at http://localhost:${PORT}/`);
});