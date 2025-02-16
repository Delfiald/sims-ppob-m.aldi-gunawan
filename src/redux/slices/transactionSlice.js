export const fetchTransaction = createAsyncThunk(
 "transaction/fetchTransaction",
 async (service_code, { getState }) => {
  let token = getState().login.token;

  if (!token) {
   token = Cookies.get("authToken");
  }
  const response = await fetch(
   `https://take-home-test-api.nutech-integrasi.com/balance`,
   {
    method: "POST",
    headers: {
     Authorization: `Bearer ${token}`,
     "Content-Type": "application/json",
    },
    body: JSON.stringify(service_code),
   }
  );

  if (!response.ok) {
   throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
 }
);
