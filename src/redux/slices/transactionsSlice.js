import Cookies from "js-cookie";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchTransactions = createAsyncThunk(
 "transactions/fetchTransactions",
 async (offset = 0, { getState }) => {
  let token = getState().login.token;

  if (!token) {
   token = Cookies.get("authToken");
  }
  const response = await fetch(
   `https://take-home-test-api.nutech-integrasi.com/transaction/history?offset=${offset}&limit=3`,
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
  return data.data.records;
 }
);

export const processTransaction = createAsyncThunk(
 "transactions/processTransaction",
 async (service_code, { getState, rejectWithValue }) => {
  let token = getState().login.token;

  if (!token) {
   token = Cookies.get("authToken");
  }
  try {
   const response = await fetch(
    `https://take-home-test-api.nutech-integrasi.com/transaction`,
    {
     method: "POST",
     headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
     },
     body: JSON.stringify(service_code),
    }
   );
   const data = await response.json();
   if (!response.ok) throw new Error(data.message || "Transaksi gagal");

   return data;
  } catch (error) {
   return rejectWithValue(error.message);
  }
 }
);

const transactionsSlice = createSlice({
 name: "transactions",
 initialState: {
  transactions: [],
  isFetched: false,
  loading: true,
  error: null,
  transaction: null,
 },
 reducers: {
  resetTransactions: (state) => {
   state.transactions = [];
   state.isFetched = false;
  },
  resetTransaction: (state) => {
   state.transaction = null;
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
   })
   .addCase(processTransaction.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(processTransaction.fulfilled, (state, action) => {
    state.loading = false;
    state.transaction = action.payload.message;
   })
   .addCase(processTransaction.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
   });
 },
});

export const { resetTransactions, resetTransaction } =
 transactionsSlice.actions;
export default transactionsSlice.reducer;
