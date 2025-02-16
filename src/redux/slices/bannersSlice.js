const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchBanners = createAsyncThunk(
 "banners/fetchBanners",
 async () => {
  const response = await fetch(
   "https://take-home-test-api.nutech-integrasi.com/banner",
   {
    headers: {
     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAbnV0ZWNoLWludGVncmFzaS5jb20iLCJtZW1iZXJDb2RlIjoiTExLUjZKTDEiLCJpYXQiOjE3Mzk2MDk4OTAsImV4cCI6MTczOTY1MzA5MH0.VBxuPx4c4rnH3PNM_prMfOzR54tDoJYZt4m4BEsBwlI`,
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

const bannersSlice = createSlice({
 name: "banners",
 initialState: {
  banners: [],
  loading: true,
  error: null,
 },
 reducers: {
  setBanners: (state, action) => {
   state.banners = action.payload;
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(fetchBanners.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(fetchBanners.fulfilled, (state, action) => {
    state.loading = false;
    state.banners = action.payload;
   })
   .addCase(fetchBanners.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
   });
 },
});

export const { setBanners } = bannersSlice.actions;
export default bannersSlice.reducer;
