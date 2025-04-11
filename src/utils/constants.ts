import { ShippingAddress } from '@/types/shipping-address';
import { SignInUser } from '@/types/sign-in-user';

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'StoreFy';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'StoreFy um novo jeito de comprar seus produtos.';
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.NEXT_PUBLIC_LATEST_PRODUCTS_LIMIT) || 8;
export const PAYMENT_METHODS = process.env.NEXT_PUBLIC_PAYMENT_METHODS?.split(
  ',',
) || ['PayPal, Stripe, Boleto'];
export const DEFAULT_PAYMENT_METHOD =
  process.env.NEXT_PUBLIC_DEFAULT_PAYMENT_METHOD || 'PayPal';

export const SIGN_IN_DEFAULT_VALUES: SignInUser = {
  email: 'admin@example.com',
  password: '123456',
};

export const SHIPPING_ADDRESS_DEFAULT_VALUES: ShippingAddress = {
  fullName: '',
  streetAddress: '',
  city: '',
  postalCode: '',
  country: '',
};
