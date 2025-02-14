const { configureStore } = require("@reduxjs/toolkit");
import visibilityReducer from "@/redux/slices/visibilitySlice";

const store = configureStore({
 reducer: {},
});

export default store;
