import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';

const appStore = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default appStore;

/**
 *  Crate Store:
 *  - configureStore() - imported from rtk (@reduxjs/toolkit)
 *
 *  Provided store to app:
 *  <Provider store = {store} /> // Provider imported from react-redux
 *
 *  Slice:
 *  CreateSlice - imported from rtk
 */
