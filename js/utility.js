const loadCategories = async () => {
    const url = "https://fakestoreapi.com/products/categories";
    const res = await fetch(url);
    const data = await res.json();
    showCategories(data);
};
loadCategories();

const showCategories = (categories = []) => {
    const categoriesContainer = document.getElementById("categories");
    categoriesContainer.innerHTML = `<button onclick=loadProducts() class="capitalize rounded-full btn btn-primary">all</button>`;
    categories.forEach((category = "") => {
        const categoryBtn = document.createElement("button");
        categoryBtn.setAttribute("onclick", `loadProducts("${category}")`);
        categoryBtn.setAttribute(
            "class",
            "capitalize rounded-full btn btn-outline btn-primary",
        );
        categoryBtn.innerText = category;
        categoriesContainer.appendChild(categoryBtn);
    });
};

const loadProducts = async (category = "") => {
    let url;
    if (!category) url = "https://fakestoreapi.com/products";
    else url = `https://fakestoreapi.com/products/category/${category}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    showProducts(data);
};
loadProducts();

const showProducts = (products = []) => {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";
    products.forEach((product) => {
        const { id, title, price, description, category, image, rating } =
            product || {};
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `
        <div class="card bg-base-100 shadow-sm border-1 border-gray-100">
            <figure class="bg-gray-200 h-80">
                <img class="max-w-full max-h-full p-4" src="${image}" alt="${title}" />
            </figure>
            <div class="card-body px-4">
                <div class="flex justify-between">
                    <div class="bg-[#e1e8ff] text-[#4f39f6] capitalize rounded-xl font-bold px-3 py-0.5 w-max text-xs">${category}</div>
                    <div>
                        <span class="text-yellow-500">
                            <i class="fa-solid fa-star"></i>
                        </span>
                        <span class="text-gray-400 font-semibold">
                            ${rating.rate} (${rating.count})
                        </span>
                    </div>
                </div>
                <h2 class="card-title pt-4">${title.length > 25 ? title.slice(0, 24) + "..." : title}</h2>
                <div>
                    <p class="font-bold text-xl">$${price}</p>
                </div>
                <div class="card-actions justify-between">
                    <button class="btn btn-outline flex-1 rounded-lg shadow-md border-2 border-gray-200 text-gray-500">
                        <i class="fa-regular fa-eye"></i> Details
                    </button>
                    <button class="btn btn-primary flex-1 rounded-lg">
                        <i class="fa-solid fa-cart-shopping"></i>Add
                    </button>
                </div>
            </div>
        </div>`;
        productsContainer.appendChild(productDiv);
    });
};
