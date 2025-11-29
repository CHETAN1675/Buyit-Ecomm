import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const FIREBASE_DB_URL = "https://buyite-comm-default-rtdb.firebaseio.com"; 


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch(`${FIREBASE_DB_URL}/products.json`);
    const data = await res.json();

    return Object.keys(data || {}).map((key) => ({
      id: key,
      ...data[key],
    }));
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    loading: false,
    error: null,
    search: "",
    category: "all",
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.error = "Failed to load products";
        state.loading = false;
      });
  },
});

export const { setSearch, setCategory } = productSlice.actions;
export default productSlice.reducer;
