import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Response, Request } from 'express';

@Injectable()
export class PaymentService {
  constructor() {}

  CLIENT_ID = process.env.CLIENT_ID;
  SECRET_KEY = process.env.SECRET_KEY;
  PAYPAL_API = 'https://api-m.sandbox.paypal.com';

  generateAccessToken = async () => {
    try {
      if (!this.CLIENT_ID || !this.SECRET_KEY) {
        throw new Error("MISSING_API_CREDENTIALS");
      }
      const auth = Buffer.from(
        this.CLIENT_ID + ":" + this.SECRET_KEY,
      ).toString("base64");
      const response = await fetch(`${this.PAYPAL_API}/v1/oauth2/token`, {
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

  async createOrder(req: Request, res: Response) {
    const order = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: req.body.product.cost,
          },
        },
      ],
      application_context: {
        brand_name: 'Clinic Online',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `http://localhost:3000/payment/capture-order`,
        cancel_url: `http://localhost:3000/payment/cancel-order`,
      },
    };

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const {
      data: { access_token },
    } = await axios.post(`${this.PAYPAL_API}/v1/oauth2/token`, params, {
      auth: {
        username: this.CLIENT_ID,
        password: this.SECRET_KEY,
      },
    });

    const response = await axios.post(
      `${this.PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    return res.json(response.data);
  }

  async captureOrder(req: Request, res: Response) {
    const accessToken = await this.generateAccessToken();
    const { orderID } = req.body;
    const response = await axios.post(
      `${this.PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        auth: {
          username: this.CLIENT_ID,
          password: this.SECRET_KEY,
        },
      },
    );
    return res.json({status: 'success'})
  }

  async cancelPayment(req: Request, res: Response) {
    res.send('Payment canceled');
  }
}
