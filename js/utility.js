const skeletonContainer = document.getElementById("skeleton");
const productsContainer = document.getElementById("products");

const loadCategories = async () => {
    const url = "https://fakestoreapi.com/products/categories";
    const res = await fetch(url);
    const data = await res.json();
    showCategories(data);
};
loadCategories();

const showCategories = (categories = []) => {
    const categoriesContainer = document.getElementById("categories");
    if (!categoriesContainer) return;
    categoriesContainer.innerHTML = `<button onclick="loadProducts('', this)" class="capitalize rounded-full btn btn-primary category-btn">all</button>`;
    categories.forEach((category = "") => {
        const categoryBtn = document.createElement("button");
        categoryBtn.setAttribute(
            "onclick",
            `loadProducts("${category}", this)`,
        );
        categoryBtn.setAttribute(
            "class",
            "capitalize rounded-full btn btn-outline btn-primary category-btn",
        );
        categoryBtn.innerText = category;
        categoriesContainer.appendChild(categoryBtn);
    });
};

const showActiveCategory = (clickedBtn = null) => {
    const categoryBtns = document.querySelectorAll("#categories>.category-btn");
    categoryBtns.forEach((btn) => {
        if (!btn.classList.value.includes("btn-outline"))
            btn.classList.add("btn-outline");
    });
    clickedBtn && clickedBtn.classList.remove("btn-outline");
};

const loadProducts = async (category = "", clickedBtn) => {
    if (!productsContainer) return;
    productsContainer.innerHTML = "";
    if (skeletonContainer) skeletonContainer.classList.remove("hidden");
    showActiveCategory(clickedBtn);
    let url;
    if (!category) url = "https://fakestoreapi.com/products";
    else url = `https://fakestoreapi.com/products/category/${category}`;
    const res = await fetch(url);
    const data = await res.json();
    if (skeletonContainer) skeletonContainer.classList.add("hidden");
    showProducts(data);
};
loadProducts();

const showProducts = (products = []) => {
    products.forEach((product) => {
        const { id, title, price, description, category, image, rating } =
            product || {};
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `
        <div class="card bg-base-100 shadow-sm border-1 border-gray-100 hover:scale-[1.05] z-0 hover:z-10 transition-transform hover:shadow-xl hover:border-gray-200">
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

const loadSkeleton = () => {
    if (skeletonContainer) {
        for (let i = 0; i < 4; i++) {
            const skeletonDiv = document.createElement("div");
            skeletonDiv.innerHTML = `
            <div class="flex w-full gap-4 flex-col-reverse">
                <div class="flex items-center gap-4">
                    <div class="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                    <div class="flex flex-col gap-4">
                        <div class="skeleton h-4 w-20"></div>
                        <div class="skeleton h-4 w-28"></div>
                    </div>
                </div>
                <div class="skeleton h-32 w-full"></div>
            </div>`;
            skeletonContainer.appendChild(skeletonDiv);
        }
    }
};
loadSkeleton();
