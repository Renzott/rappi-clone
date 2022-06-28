import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchFinishOrden } from "./shoppingCartService";
import { readShopingCart, saveShopingCart } from "./shoppingCartStorage";


function loadShopingCart() {
    const shoppingCart = readShopingCart();
    if (shoppingCart) {
        return shoppingCart;
    }
    return [];
}

export const addShopingCartItem = (query) => (dispatch) => {
    dispatch(addItem(query));
}

export const clearShoppingCart = () => (dispatch) => {
    saveShopingCart([]);
    dispatch(clearItems());
}

export const addListShopingCartItem = (query) => (dispatch) => {
    dispatch(addListItem(query));
}

export const clickSidebarShoppingCart = (query) => (dispatch) => {
    dispatch(clickSidebar(query));
}

export const finishOrden = createAsyncThunk("shoppingCart/finishOrden", async (query, thunkAPI) => {
    
    const state = thunkAPI.getState();
    try {
        // calculate totalPrice
        var totalPrice = state.shoppingCart.items.reduce((acc, item) => acc + item.price, 0).toFixed(2);

        var order = {
            listProduct: state.shoppingCart.items,
            client: state.user.user,
            status: "Ready",
            date : Date.now().toString(),
            // date unix add 5 minutes
            totalPrice,
            finishedDate: (Date.now() + (1000 * 60 * 5)).toString(),
        }

        const response = await fetchFinishOrden(order);
        console.log(response);
        return response;
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || "Something went wrong";
        return thunkAPI.rejectWithValue(message);
    }
})

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: {
        items: loadShopingCart(),
        isShoppingCartOpen: false,
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        addListItem: (state, action) => {
            state.items = action.payload;
        },
        clearItems: (state) => {
            state.items = [];
        },
        clickSidebar: (state, action) => {
            state.isShoppingCartOpen = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(finishOrden.fulfilled, (state, action) => {
                state.items = [];
                saveShopingCart([]);
            })
            .addCase(finishOrden.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(finishOrden.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.items = [];
            })
    }
});

export const { addItem, addListItem, clickSidebar, clearItems } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;