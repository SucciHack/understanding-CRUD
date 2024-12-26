const close = document.getElementById('close');
const searchDiv = document.querySelector('.search');
const search = document.getElementById('bx-search');

const closeBtn = document.querySelector('.closeBtn');
const slideNav = document.querySelector('.slideNav');
const slideNavShow = document.getElementById('slideNavShow');
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
        <div class="product">
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
            <p>$ 49.75</p>
        </div>
        `;
        products.insertAdjacentHTML('beforeend', productTemplate);  
        
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