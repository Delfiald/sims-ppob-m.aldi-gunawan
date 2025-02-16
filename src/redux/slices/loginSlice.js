import Cookies from "js-cookie";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const loginUser = createAsyncThunk(
 "login/loginUser",
 async (userData, { rejectWithValue }) => {
  try {
   const response = await fetch(
    "https://take-home-test-api.nutech-integrasi.com/login",
    {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(userData),
    }
   );

   const data = await response.json();
   if (!response.ok) throw new Error(data.message || "Login gagal");
   return data;
  } catch (error) {
   return rejectWithValue(error.message);
  }
 }
);

const loginSlice = createSlice({
 name: "login",
 initialState: {
  token: Cookies.get("authToken") || null,
  loading: false,
  error: {},
 },
 reducers: {
  resetError: (state) => {
   state.error = {};
  },
  logout: (state) => {
   state.token = null;
   Cookies.remove("authToken");
   Cookies.remove("authExpire");
   window.location.replace("/login");
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(loginUser.pending, (state) => {
    state.loading = true;
    state.error = {};
   })
   .addCase(loginUser.fulfilled, (state, action) => {
    state.loading = false;
    state.token = action.payload.data.token;

    const token = action.payload.data.token;
    const expiration = new Date().getTime() + 12 * 60 * 60 * 1000;

    Cookies.set("authToken", token, { expires: expiration, path: "/" });
    Cookies.set("authExpire", expiration, {
     expires: expiration,
     path: "/",
    });
   })
   .addCase(loginUser.rejected, (state, action) => {
    state.loading = false;
    const message = action.payload;

    const errorMessages = {
     "Paramter email tidak sesuai format":
      "Parameter email tidak sesuai format",
     "Parameter email harus di isi": "Email harus diisi",
     "Parameter password harus di isi": "Password harus diisi",
    };

    const fieldMapping = {
     email: [
      "Paramter email tidak sesuai format",
      "Parameter email harus di isi",
     ],
     password: ["Parameter password harus di isi"],
    };

    let errorFields = {};

    Object.entries(fieldMapping).some(([field, errors]) => {
     return errors.some((errorMsg) => {
      if (message.includes(errorMsg)) {
       errorFields[field] = errorMessages[errorMsg];
       return true;
      }
      return false;
     });
    });

    if (Object.keys(errorFields).length === 0) {
     errorFields.general = message;
    }

    state.error = errorFields;
   });
 },
});

export const { resetError, logout } = loginSlice.actions;
export default loginSlice.reducer;
