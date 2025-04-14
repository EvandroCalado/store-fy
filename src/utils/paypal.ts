const base = process.env.PAYPAL_API_URL || '';

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }

  return res.json();
};

export const generateAccessToken = async () => {
  const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString(
    'base64',
  );

  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await handleResponse(res);

  return data.access_token;
};

export const paypal = {
  createOrder: async (price: number) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'BRL',
              value: price,
            },
          },
        ],
      }),
    });

    return handleResponse(res);
  },

  capturePayment: async (orderId: string) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderId}/capture`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return handleResponse(res);
  },
};
