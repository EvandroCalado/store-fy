import { constantsSchema } from '@/schemas/constants';
import { ShippingAddress } from '@/types/shipping-address';
import { SignInUser } from '@/types/sign-in-user';

export const CONSTANTS = constantsSchema.parse({
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  LATEST_PRODUCTS_LIMIT: process.env.NEXT_PUBLIC_LATEST_PRODUCTS_LIMIT,
  PAYMENT_METHODS: process.env.NEXT_PUBLIC_PAYMENT_METHODS?.split(','),
  DEFAULT_PAYMENT_METHOD: process.env.NEXT_PUBLIC_DEFAULT_PAYMENT_METHOD,
  PAGE_SIZE: process.env.NEXT_PUBLIC_PAGE_SIZE,
  USER_ROLES: process.env.NEXT_PUBLIC_USER_ROLES?.split(','),
});

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

export const PRODUCT_DEFAULT = {
  name: '',
  slug: '',
  category: '',
  images: [],
  brand: '',
  description: '',
  details: '',
  isFeatured: false,
  price: 0,
  stock: 0,
  rating: 0,
  numReviews: 0,
  banner: null,
};
