const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const registerUser = createAsyncThunk(
 "register/registerUser",
 async (userData, { rejectWithValue }) => {
  try {
   const response = await fetch(
    "https://take-home-test-api.nutech-integrasi.com/registration",
    {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(userData),
    }
   );

   const data = await response.json();
   if (!response.ok) throw new Error(data.message || "Registrasi gagal");
   return data;
  } catch (error) {
   return rejectWithValue(error.message);
  }
 }
);

const registerSlice = createSlice({
 name: "register",
 initialState: {
  user: null,
  loading: false,
  error: {},
 },
 reducers: {
  resetError: (state) => {
   state.error = {};
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(registerUser.pending, (state) => {
    state.loading = true;
    state.error = {};
   })
   .addCase(registerUser.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload;
   })
   .addCase(registerUser.rejected, (state, action) => {
    state.loading = false;
    const message = action.payload;

    const errorMessages = {
     "Paramter email tidak sesuai format":
      "Parameter email tidak sesuai format",
     "Parameter email harus di isi": "Email harus diisi",
     "Email sudah terdaftar": "Email sudah terdaftar",
     "Parameter first_name harus di isi": "Nama depan harus diisi",
     "Parameter last_name harus di isi": "Nama belakang harus diisi",
     "Parameter password harus di isi": "Password harus diisi",
     "Password length minimal 8 karakter": "Password length minimal 8 karakter",
    };

    const fieldMapping = {
     email: [
      "Paramter email tidak sesuai format",
      "Parameter email harus di isi",
      "Email sudah terdaftar",
     ],
     first_name: ["Parameter first_name harus di isi"],
     last_name: ["Parameter last_name harus di isi"],
     password: [
      "Parameter password harus di isi",
      "Password length minimal 8 karakter",
     ],
    };

    let errorFields = {};

    Object.keys(errorMessages).forEach((key) => {
     if (message.includes(key)) {
      Object.entries(fieldMapping).forEach(([field, errors]) => {
       if (errors.includes(key)) {
        errorFields[field] = errorMessages[key];
       }
      });
     }
    });

    state.error = errorFields;
   });
 },
});

export const { resetError } = registerSlice.actions;
export default registerSlice.reducer;
