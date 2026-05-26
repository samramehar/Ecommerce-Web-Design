

// Product data
const productsData = [
  {
    id: 1,
    name: "Canon Camera EOS 2000, Black 10x zoom",
    subtitle: "Canon Camera EOS 2000, Black 10x zoom",
    price: 998.0,
    originalPrice: 1128.0,
    rating: 7.5,
    orders: 154,
    image: "../images/18.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam temporibus voluptatem excepturi, nihil aliquam magni iste hic voluptatibus quia tempora.",
  },
  {
    id: 2,
    name: "Canon Camera EOS 2000, Black 10x zoom",
    subtitle: "Canon Camera EOS 2000, Black 10x zoom",
    price: 998.0,
    originalPrice: 1128.0,
    rating: 7.5,
    orders: 154,
    image: "../images/20.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam temporibus voluptatem excepturi, nihil aliquam magni iste hic voluptatibus quia tempora.",
  },
  {
    id: 3,
    name: "Canon Camera EOS 2000, Black 10x zoom",
    subtitle: "Canon Camera EOS 2000, Black 10x zoom",
    price: 998.0,
    originalPrice: null,
    rating: 7.5,
    orders: 154,
    image: "../images/19.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam temporibus voluptatem excepturi, nihil aliquam magni iste hic voluptatibus quia tempora.",
  },
  {
    id: 4,
    name: "Canon Camera EOS 2000, Black 10x zoom",
    subtitle: "Canon Camera EOS 2000, Black 10x zoom",
    price: 998.0,
    originalPrice: 1128.0,
    rating: 7.5,
    orders: 154,
    image: "../images/24.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam temporibus voluptatem excepturi, nihil aliquam magni iste hic voluptatibus quia tempora.",
  },
  {
    id: 5,
    name: "Canon Camera EOS 2000, Black 10x zoom",
    subtitle: "Canon Camera EOS 2000, Black 10x zoom",
    price: 998.0,
    originalPrice: 1128.0,
    rating: 7.5,
    orders: 154,
    image: "../images/23.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam temporibus voluptatem excepturi, nihil aliquam magni iste hic voluptatibus quia tempora.",
  },
  {
    id: 6,
    name: "Canon Camera EOS 2000, Black 10x zoom",
    subtitle: "Canon Camera EOS 2000, Black 10x zoom",
    price: 998.0,
    originalPrice: null,
    rating: 7.5,
    orders: 154,
    image: "../images/25.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam temporibus voluptatem excepturi, nihil aliquam magni iste hic voluptatibus quia tempora.",
  },
  {
    id: 7,
    name: "Canon Camera EOS 2000, Black 10x zoom",
    subtitle: "Canon Camera EOS 2000, Black 10x zoom",
    price: 998.0,
    originalPrice: 1128.0,
    rating: 7.5,
    orders: 154,
    image: "../images/26.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam temporibus voluptatem excepturi, nihil aliquam magni iste hic voluptatibus quia tempora.",
  },
  {
    id: 8,
    name: "Canon Camera EOS 2000, Black 10x zoom",
    subtitle: "Canon Camera EOS 2000, Black 10x zoom",
    price: 998.0,
    originalPrice: null,
    rating: 7.5,
    orders: 154,
    image: "../images/21.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam temporibus voluptatem excepturi, nihil aliquam magni iste hic voluptatibus quia tempora.",
  },
  {
    id: 9,  
    name: "Canon Camera EOS 2000, Black 10x zoom",
    subtitle: "Canon Camera EOS 2000, Black 10x zoom",
    price: 998.0,
    originalPrice: null,
    rating: 7.5,
    orders: 154,
    image: "../images/22.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam temporibus voluptatem excepturi, nihil aliquam magni iste hic voluptatibus quia tempora.",
  }
];

// Main Initialization
document.addEventListener("DOMContentLoaded", function () {
  initFilters();
  initViewToggle();
  initPagination();
  initFilterTags();
  generateProducts();

  const sortDropdown = document.querySelector(".sort-dropdown");
  if (sortDropdown) {
    sortDropdown.addEventListener("change", function () {
      let sortBy = "featured";
      switch (this.value) {
        case "Price: Low to High":
          sortBy = "price-low";
          break;
        case "Price: High to Low":
          sortBy = "price-high";
          break;
        case "Newest":
          sortBy = "newest";
          break;
      }
      sortProducts(sortBy);
    });
  }
});

// Init Filters
function initFilters() {
  document.querySelectorAll(".filter-title").forEach((title) => {
    title.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const icon = this.querySelector("i");
      content.classList.toggle("collapsed");
      if (icon) {
        icon.style.transform = content.classList.contains("collapsed")
          ? "rotate(0deg)"
          : "rotate(180deg)";
      }
    });
  });

  initCheckboxes();
  initPriceRange();
}

function initCheckboxes() {
  document
    .querySelectorAll('.checkbox-item input[type="checkbox"]')
    .forEach((cb) => {
      cb.addEventListener("change", filterProducts);
    });
}

function initPriceRange() {
  const applyBtn = document.querySelector(".apply-btn");
  if (applyBtn) {
    applyBtn.addEventListener("click", filterProducts);
  }
}

function initViewToggle() {
  const productsGrid = document.getElementById("productsGrid");
  const viewBtns = document.querySelectorAll(".view-btn");

  viewBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      viewBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      const viewType = this.getAttribute("data-view");
      if (productsGrid) {
        // Toggle list-view class only for list view, remove for grid
        productsGrid.classList.toggle("list-view", viewType === "list");
      }
    });
  });
}

function initPagination() {
  const paginationBtns = document.querySelectorAll(".pagination-btn");

  paginationBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (this.disabled) return;
      paginationBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

function initFilterTags() {
  const clearBtn = document.querySelector(".clear-filters");

  document.querySelectorAll(".filter-tag i").forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.stopPropagation();
      const parent = this.parentElement;
      if (parent) parent.remove();
      filterProducts();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelectorAll(".filter-tag").forEach((tag) => tag.remove());
      document
        .querySelectorAll(".checkbox-item input")
        .forEach((cb) => (cb.checked = false));
      document
        .querySelectorAll(".radio-item input")
        .forEach((rb) => (rb.checked = false));
      const priceInputs = document.querySelectorAll(".price-input");
      if (priceInputs[0]) priceInputs[0].value = "0";
      if (priceInputs[1]) priceInputs[1].value = "999999";
      filterProducts();
    });
  }
}

function generateProducts() {
  const productsGrid = document.getElementById("productsGrid");
  if (!productsGrid) return;

  productsGrid.innerHTML = "";
  const fragment = document.createDocumentFragment();

  productsData.forEach((product) => {
    fragment.appendChild(createProductCard(product));
  });

  productsGrid.appendChild(fragment);
  initProductCardInteractions();
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card-detailed";
  card.setAttribute("data-product-id", String(product.id));

  const originalPriceHtml = product.originalPrice
    ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>`
    : "";

  card.innerHTML = `
    <div class="product-image">
      <div class="product-image-section">
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null; this.src='images/placeholder.jpg';">
          <button class="wishlist-btn" onclick="toggleWishlist(${product.id})">
            <i class="far fa-heart"></i>
          </button>
      </div>
      <div class="product-info">
        <h3 class="product-name"> ${product.name}</h3>
        <div class="product-price">
          <span class="current-price">$${product.price.toFixed(2)}</span>
          ${originalPriceHtml}
        </div>
        <div class="product-rating">
          <div class="stars">★★★★★</div>
          <span class="rating-value">${product.rating}</span>
          <span class="orders-count">${product.orders} orders</span>
        </div>
        <div class="shipping-info">Free Shipping</div>
        <p class="product-subtitle">${product.subtitle}</p>
        <p class="product-description">${product.description}</p>
        <a href="product-details.html" id=${product.id}" class="view-details">View details</a>
      </div>
    </div>  
  `;

  return card;
}

function initProductCardInteractions() {
  const productCards = document.querySelectorAll(".product-card-detailed");

  productCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      if (e.target.closest(".wishlist-btn") || e.target.closest(".view-details")) return;
      const productId = this.getAttribute("data-product-id");
      if (productId) {
        window.location.href = `product-details.html?id=${productId}`;
      }
    });

    // Keep lightweight hover feedback
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
      this.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "";
    });
  });
}

function toggleWishlist(productId) {
  const icon = document.querySelector(
    `[data-product-id="${productId}"] .wishlist-btn i`
  );
  if (!icon) return;

  if (icon.classList.contains("far")) {
    icon.classList.replace("far", "fas");
    icon.style.color = "#ff4444";
  } else {
    icon.classList.replace("fas", "far");
    icon.style.color = "";
  }
}

function filterProducts() {
  generateProducts();
}

function sortProducts(sortBy) {
  let sorted = [...productsData];

  switch (sortBy) {
    case "price-low":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      sorted.sort((a, b) => b.id - a.id);
      break;
    default:
      break;
  }

  const productsGrid = document.getElementById("productsGrid");
  if (!productsGrid) return;

  productsGrid.innerHTML = "";
  const fragment = document.createDocumentFragment();
  sorted.forEach((p) => fragment.appendChild(createProductCard(p)));
  productsGrid.appendChild(fragment);

  initProductCardInteractions();
}

window.ProductsPage = {
  toggleWishlist,
  filterProducts,
  sortProducts,
  generateProducts
};
