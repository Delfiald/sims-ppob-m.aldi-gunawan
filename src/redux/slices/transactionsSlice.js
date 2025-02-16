const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchTransactions = createAsyncThunk(
 "transactions/fetchTransactions",
 async (offset = 0) => {
  const response = await fetch(
   `https://take-home-test-api.nutech-integrasi.com/transaction/history?offset=${offset}&limit=3`,
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
  return data.data.records;
 }
);

const transactionsSlice = createSlice({
 name: "transactions",
 initialState: {
  transactions: [],
  isFetched: false,
  loading: true,
  error: null,
 },
 reducers: {
  resetTransactions: (state) => {
   state.transactions = [];
   state.isFetched = false;
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(fetchTransactions.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(fetchTransactions.fulfilled, (state, action) => {
    state.loading = false;
    state.transactions = [...state.transactions, ...action.payload];
    state.isFetched = true;
   })
   .addCase(fetchTransactions.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
   });
 },
});

export const { resetTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
