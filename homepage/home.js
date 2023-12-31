const productContainerElement = document.querySelector(".products-list");

let basketCount = getBasketCountFromLocalStorage() || 0;
function updateBasketCount() {
    basketCount++;
    saveBasketCountToLocalStorage();
    const redCircle = document.querySelector(".red-circle p.my-basket");
    redCircle.textContent = basketCount.toString();
    Toastify({
        text: "Item added to the basket!",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { }
    }).showToast();
}
function saveBasketCountToLocalStorage() {
    localStorage.setItem("basketCount", basketCount);
}

function getBasketCountFromLocalStorage() {
    return parseInt(localStorage.getItem("basketCount"));
}
function saveBasketItemsToLocalStorage(items) {
    localStorage.setItem("basketItems", JSON.stringify(items));
}

function getBasketItemsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("basketItems")) || [];
}
function fillProducts(products) {
    products.forEach((product) => {
   
        const productElement = document.createElement("div");
        productElement.className = "product";
     
        const productImageContainer = document.createElement("div");
        productImageContainer.className = "product-image";
      
        const hotItemContainer = document.createElement("div");
        hotItemContainer.className = "hot-item";
        const hotItemText = document.createElement("h5");
        hotItemText.textContent = "HOT";
        hotItemContainer.appendChild(hotItemText);

        const imageElement = document.createElement("img");
        imageElement.src = product.image;
      
        const hoverLayer = document.createElement("div");
        hoverLayer.className = "hover-layer";

        const actionButtonsContainer = document.createElement("div");
        actionButtonsContainer.className = "action-buttons";

        const heartButton = document.createElement("button");
        const heartIcon = document.createElement("img");
        heartIcon.src = "./svg-icons/heart.svg";
        heartButton.appendChild(heartIcon);

        const basketButton = document.createElement("button");
        const basketIcon = document.createElement("img");
        basketIcon.src = "./svg-icons/basket.svg";
        basketButton.addEventListener("click", () => {
            updateBasketCount();
            addToBasket(product);
           
        });
        basketButton.appendChild(basketIcon);

        actionButtonsContainer.appendChild(heartButton);
        actionButtonsContainer.appendChild(basketButton);

        hoverLayer.appendChild(actionButtonsContainer);

        productImageContainer.appendChild(hotItemContainer);
        productImageContainer.appendChild(imageElement);
        productImageContainer.appendChild(hoverLayer);
        const productDescriptionContainer = document.createElement("div");
        productDescriptionContainer.className = "product-description";
       
        const productNameContainer = document.createElement("div");
        productNameContainer.className = "product-name";
        const productName = document.createElement("h4");
        productName.textContent = product.title;
        productNameContainer.appendChild(productName);
        productName.addEventListener("click", () => {
          
            localStorage.setItem("selectedProduct", JSON.stringify(product));
            window.open("http://127.0.0.1:5500/basket/basket.html", "_blank");
        });
       
        const productRateContainer = document.createElement("div");
        productRateContainer.className = "product-rate";
        const productRateIcon = document.createElement("img");
        productRateIcon.src = "./svg-icons/rating.svg";
        productRateContainer.appendChild(productRateIcon);

        const productPriceContainer = document.createElement("div");
        productPriceContainer.className = "product-price";

        const newPriceElement = document.createElement("p");
        newPriceElement.className = "new-price";
        newPriceElement.textContent = `$ ${product.price}`;

        const initialPriceElement = document.createElement("p");
        initialPriceElement.className = "initial-price";
        initialPriceElement.textContent = "$534,33"; 

        const discountElement = document.createElement("p");
        discountElement.className = "discount";
        discountElement.textContent = "24% Off"; 

        productPriceContainer.appendChild(newPriceElement);
        productPriceContainer.appendChild(initialPriceElement);
        productPriceContainer.appendChild(discountElement);

        productDescriptionContainer.appendChild(productNameContainer);
        productDescriptionContainer.appendChild(productRateContainer);
        productDescriptionContainer.appendChild(productPriceContainer);

        productElement.appendChild(productImageContainer);
        productElement.appendChild(productDescriptionContainer);

        productContainerElement.appendChild(productElement);
    });
}
function addToBasket(product) {
    let basketItems = JSON.parse(localStorage.getItem("basketItems")) || [];
    basketItems.push(product);
    saveBasketItemsToLocalStorage(basketItems);
}
fillProducts(products);
const redCircle = document.querySelector(".red-circle p.my-basket");
redCircle.textContent = basketCount.toString();

