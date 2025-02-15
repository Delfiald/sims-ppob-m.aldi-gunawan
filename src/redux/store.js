const { configureStore } = require("@reduxjs/toolkit");
import servicesReducer from "./slices/servicesSlice";
import bannersReducer from "./slices/bannersSlice";
import transactionsReducer from "./slices/transactionsSlice";

export const store = configureStore({
 reducer: {
  services: servicesReducer,
  banners: bannersReducer,
  transactions: transactionsReducer,
 },
});

export default store;
