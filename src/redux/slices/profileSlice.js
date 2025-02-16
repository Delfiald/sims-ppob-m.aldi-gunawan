import Cookies from "js-cookie";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchProfile = createAsyncThunk(
 "profile/fetchProfile",
 async (_, { getState }) => {
  let token = getState().login.token;

  if (!token) {
   token = Cookies.get("authToken");
  }
  const response = await fetch(
   `https://take-home-test-api.nutech-integrasi.com/profile`,
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

export const updateProfile = createAsyncThunk(
 "profile/updateProfile",
 async (userData, { getState, rejectWithValue }) => {
  let token = getState().login.token;

  if (!token) {
   token = Cookies.get("authToken");
  }
  try {
   const response = await fetch(
    `https://take-home-test-api.nutech-integrasi.com/profile/update`,
    {
     method: "PUT",
     headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
     },
     body: JSON.stringify(userData),
    }
   );
   const data = await response.json();
   if (!response.ok) throw new Error(data.message || "Update profile gagal");

   return data;
  } catch (error) {
   return rejectWithValue(error.message);
  }
 }
);

export const updateProfileImage = createAsyncThunk(
 "profile/updateProfileImage",
 async (file, { getState, rejectWithValue }) => {
  let token = getState().login.token;

  if (!token) {
   token = Cookies.get("authToken");
  }

  const formData = new FormData();
  formData.append("file", file);
  try {
   const response = await fetch(
    `https://take-home-test-api.nutech-integrasi.com/profile/image`,
    {
     method: "PUT",
     headers: {
      Authorization: `Bearer ${token}`,
     },
     body: formData,
    }
   );
   const data = await response.json();
   if (!response.ok)
    throw new Error(data.message || "Update profile image gagal");

   return data;
  } catch (error) {
   console.log(error);
   return rejectWithValue(error.message);
  }
 }
);

const profileSlice = createSlice({
 name: "profile",
 initialState: {
  user: null,
  loading: true,
  error: {},
 },
 reducers: {
  resetError: (state) => {
   state.error = {};
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(fetchProfile.pending, (state) => {
    state.loading = true;
    state.error = {};
   })
   .addCase(fetchProfile.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload.data;
    state.isFetched = true;
   })
   .addCase(fetchProfile.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
   })
   .addCase(updateProfile.pending, (state) => {
    state.loading = true;
    state.error = {};
   })
   .addCase(updateProfile.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload.data;
   })
   .addCase(updateProfile.rejected, (state, action) => {
    state.loading = false;
    const message = action.payload;
    const errorMessages = {
     "Paramter email tidak sesuai format":
      "Parameter email tidak sesuai format",
     "Parameter email harus di isi": "Email harus diisi",
     "Parameter first_name harus di isi": "Nama depan harus diisi",
     "Parameter last_name harus di isi": "Nama belakang harus diisi",
    };

    const fieldMapping = {
     email: [
      "Paramter email tidak sesuai format",
      "Parameter email harus di isi",
     ],
     first_name: ["Parameter first_name harus di isi"],
     last_name: ["Parameter last_name harus di isi"],
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
   })
   .addCase(updateProfileImage.pending, (state) => {
    state.loading = true;
    state.error = {};
   })
   .addCase(updateProfileImage.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload.data;
   })
   .addCase(updateProfileImage.rejected, (state, action) => {
    state.loading = false;
    const message = action.payload;
    const errorMessages = {
     "Format Image tidak sesuai": "Format Image tidak sesuai",
    };

    const fieldMapping = {
     profile_image: ["Format Image tidak sesuai"],
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

export const { resetError } = profileSlice.actions;
export default profileSlice.reducer;
