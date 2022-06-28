
export function saveShopingCart(shopingCart) {
    localStorage.setItem('shopingCart', JSON.stringify(shopingCart));
}

export function readShopingCart() {
    return JSON.parse(localStorage.getItem('shopingCart'));
}
