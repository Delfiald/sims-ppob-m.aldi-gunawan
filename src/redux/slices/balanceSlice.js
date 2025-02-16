const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchBalance = createAsyncThunk(
 "balance/fetchBalance",
 async (_, { getState }) => {
  let token = getState().login.token;

  if (!token) {
   token = Cookies.get("authToken");
  }
  const response = await fetch(
   `https://take-home-test-api.nutech-integrasi.com/balance`,
   {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   }
  );

  if (!response.ok) {
   throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
 }
);

const balanceSlice = createSlice({
 name: "balance",
 initialState: {
  balance: 0,
  loading: false,
  error: null,
 },
 reducers: {},
 extraReducers: (builder) => {
  builder
   .addCase(fetchBalance.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(fetchBalance.fulfilled, (state, action) => {
    state.loading = false;
    state.balance = action.payload.data;
   })
   .addCase(fetchBalance.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
   });
 },
});

export default balanceSlice.reducer;
