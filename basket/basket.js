function updateBasketCount() {
    let basketCount = getBasketCountFromLocalStorage() || 0;
    basketCount++;
    saveBasketCountToLocalStorage(basketCount);
    updateBasketDisplay(basketCount);
}

document.addEventListener("DOMContentLoaded", function () {
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    const selectedProductImage = document.querySelector(".selected-product");
    if (selectedProduct) {
        selectedProductImage.src = selectedProduct.image;
    }
});

function saveBasketCountToLocalStorage(count) {
    localStorage.setItem("basketCount", count);
}

function getBasketCountFromLocalStorage() {
    return parseInt(localStorage.getItem("basketCount"));
}

function updateBasketDisplay(count) {
    const redCircle = document.querySelector(".red-circle p.my-basket");
    redCircle.textContent = count.toString();
}

const initialBasketCount = getBasketCountFromLocalStorage() || 0;
updateBasketDisplay(initialBasketCount);
