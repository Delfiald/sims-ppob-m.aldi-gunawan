import Cookies from "js-cookie";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchServices = createAsyncThunk(
 "services/fetchServices",
 async (_, { getState }) => {
  let token = getState().login.token;
  if (!token) {
   token = Cookies.get("authToken");
  }

  const response = await fetch(
   "https://take-home-test-api.nutech-integrasi.com/services",
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

  return data.data;
 }
);

const servicesSlice = createSlice({
 name: "banners",
 initialState: {
  services: [],
  loading: true,
  error: null,
 },
 reducers: {
  setServices: (state, action) => {
   state.services = action.payload;
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(fetchServices.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(fetchServices.fulfilled, (state, action) => {
    state.loading = false;
    state.services = action.payload;
   })
   .addCase(fetchServices.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
   });
 },
});

export const { setServices } = servicesSlice.actions;
export default servicesSlice.reducer;
