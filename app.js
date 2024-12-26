const close = document.getElementById('close');
const searchDiv = document.querySelector('.search');
const search = document.getElementById('bx-search');

const closeBtn = document.querySelector('.closeBtn');
const slideNav = document.querySelector('.slideNav');
const slideNavShow = document.getElementById('slideNavShow');
const productsDetails = document.querySelector('.productsDetails');

slideNavShow.addEventListener('click', () => {
    slideNav.classList.add('active');
})
closeBtn.addEventListener('click', () => {
    slideNav.classList.remove('active');
})



document.addEventListener( 'DOMContentLoaded', function () {
    new Splide('#image-carousel', {
        type   : 'loop',
        perPage: 1,
        perMove: 1,
        arrows : true,
        pagination: false,
    }).mount();
  } );


close.addEventListener('click', () => {
    searchDiv.style.display = 'none';
})
search.addEventListener('click', () => {
    searchDiv.style.display = 'flex';
})


let allProducts = [];
fetch('./app.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // You can now use the data from app.json
        allProducts = data.products;
        console.log(allProducts)
        renderData(data.products)
    })
    .catch(error => console.error('Error fetching the JSON file:', error));

function renderData(data) {
    const products = document.querySelector('.products');
    products.innerHTML = '';
    data.forEach(item => {
        productTemplate = `
        <div class="product" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
            <p>$ 49.75</p>
        </div>
        `;
        products.insertAdjacentHTML('beforeend', productTemplate);  
        
    });
    document.querySelectorAll('.product').forEach(product => {
        product.addEventListener('click', () => {
            const productId = product.getAttribute('data-id');
            const productDetails = allProducts.find(item => item.id == productId);
            localStorage.setItem('productDetails', JSON.stringify(productDetails));
            window.location.href = 'productDetails.html';
        });
    });
}


function filterBeds(){
  return allProducts.filter((item)=>item.image.includes('bed'));
}

const bed = document.getElementById('bed');
bed.addEventListener("click", ()=>{
    const filteredBeds = filterBeds()
    renderData(filteredBeds);
})



function filterFood(){
    return allProducts.filter((item)=>item.image.includes('food'));
}

const food = document.getElementById('food');
food.addEventListener("click", ()=>{
    const filteredFood = filterFood()
    renderData(filteredFood);
})

function filterCosmetics(){
    return allProducts.filter((item)=>item.image.includes('cosmetics'));
}

const cosmetics = document.getElementById('cosmetics');

cosmetics.addEventListener("click", ()=>{
    const filteredCosmetics = filterCosmetics()
    renderData(filteredCosmetics);
})


document.addEventListener('DOMContentLoaded', function () {
    const productDetails = JSON.parse(localStorage.getItem('productDetails'));
    if (productDetails) {
        const productDetailsContainer = document.getElementById('productDetails');
        const productDetailTemplate = `
        <div class="productDetails" data-id="${productDetails.id}">
            <img src="${productDetails.image}" alt="${productDetails.name}">
            <div class="productDetailsText">
                <h1>${productDetails.name}</h1>
                <p>${productDetails.description}</p>
                <p>$ 49.75</p>
            </div>
        </div>
        `;
        productDetailsContainer.insertAdjacentHTML('beforeend', productDetailTemplate);
    } else {
        productDetailsContainer.innerHTML = '<p>No product details found.</p>';
    }
});

const searchContainer = document.querySelector('.search');
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const  filteredProducts = allProducts.filter(item => item.name.toLowerCase().includes(searchTerm)|| item.description.toLowerCase().includes(searchTerm));
    renderData(filteredProducts);
});
