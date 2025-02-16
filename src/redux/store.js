const { configureStore } = require("@reduxjs/toolkit");
import servicesReducer from "./slices/servicesSlice";
import bannersReducer from "./slices/bannersSlice";
import transactionsReducer from "./slices/transactionsSlice";
import registerReducer from "./slices/registerSlice";
import loginReducer from "./slices/loginSlice";
import profileReducer from "./slices/profileSlice";
import balanceReducer from "./slices/balanceSlice";
import topupReducer from "./slices/topupSlice";

export const store = configureStore({
 reducer: {
  services: servicesReducer,
  banners: bannersReducer,
  transactions: transactionsReducer,
  register: registerReducer,
  login: loginReducer,
  profile: profileReducer,
  balance: balanceReducer,
  topup: topupReducer,
 },
});

export default store;
