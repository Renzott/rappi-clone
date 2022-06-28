import { configureStore } from "@reduxjs/toolkit";
import user from "./../features/user/userSlice";
import autocomplete from "./../features/autocomplete/autoCompleteSlice";
import shoppingCart from "./../features/shoppingCart/shoppingCartSlice";
import products from "./../features/products/productsSlice";
import categories from "./../features/categories/categoriesSlice";
import { saveShopingCart } from "../features/shoppingCart/shoppingCartStorage";

export const store = configureStore({
    reducer: {
        user,
        autocomplete,
        shoppingCart,
        products,
        categories,
    }
});


// Persistance list of shopping cart items
store.subscribe(() => {
    const { shoppingCart } = store.getState()
    if (shoppingCart.items.length) {
        saveShopingCart(shoppingCart.items);
    }
})