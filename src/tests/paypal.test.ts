import { generateAccessToken, paypal } from '../src/utils/paypal';

describe('paypal', () => {
  it('should generates token from paypal', async () => {
    const token = await generateAccessToken();

    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  it('should creates a paypal order', async () => {
    const price = 10.0;

    const order = await paypal.createOrder(price);

    expect(order).toHaveProperty('id');
    expect(order).toHaveProperty('status');
    expect(order.status).toBe('CREATED');
  });

  it('should captures a payment order', async () => {
    const mockCapturePayment = jest
      .spyOn(paypal, 'capturePayment')
      .mockResolvedValue({
        status: 'COMPLETED',
      });

    const orderId = '100';

    const capturePayment = await paypal.capturePayment(orderId);

    expect(mockCapturePayment).toHaveBeenCalledWith(orderId);
    expect(capturePayment).toHaveProperty('status', 'COMPLETED');
    expect(capturePayment.status).toBe('COMPLETED');

    mockCapturePayment.mockRestore();
  });
});
