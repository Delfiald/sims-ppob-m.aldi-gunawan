const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const processTopup = createAsyncThunk(
 "topup/processTopup",
 async (amount, { getState, rejectWithValue }) => {
  let token = getState().login.token;

  if (!token) {
   token = Cookies.get("authToken");
  }
  try {
   const response = await fetch(
    `https://take-home-test-api.nutech-integrasi.com/topup`,
    {
     method: "POST",
     headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
     },
     body: JSON.stringify(amount),
    }
   );
   const data = await response.json();
   if (!response.ok) throw new Error(data.message || "Top Up gagal");

   return data;
  } catch (error) {
   return rejectWithValue(error.message);
  }
 }
);

const topupSlice = createSlice({
 name: "topup",
 initialState: {
  topup: null,
  loading: false,
  error: null,
 },
 reducers: {
  resetTopup: (state) => {
   state.topup = null;
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(processTopup.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(processTopup.fulfilled, (state, action) => {
    state.loading = false;
    state.topup = action.payload.message;
   })
   .addCase(processTopup.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
   });
 },
});

export const { resetTopup } = topupSlice.actions;
export default topupSlice.reducer;
