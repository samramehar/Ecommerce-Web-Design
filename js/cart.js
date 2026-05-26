
document.addEventListener('DOMContentLoaded', function() {
    initCartItems();
    initOrderSummary();
    initSavedItems();
    initPromoBanner();
    updateCartTotal();
});

// Initialize cart items functionality
function initCartItems() {
    const quantitySelects = document.querySelectorAll('.quantity-select:not(.initialized)');
    const removeButtons = document.querySelectorAll('.btn-remove:not(.initialized)');
    const saveButtons = document.querySelectorAll('.btn-save:not(.initialized)');
    const removeAllButton = document.querySelector('.btn-remove-all');
    const backButton = document.querySelector('.btn-back');
    
    // Quantity change handlers
    quantitySelects.forEach(select => {
        select.classList.add('initialized');
        select.addEventListener('change', function() {
            const cartItem = this.closest('.cart-item');
            const priceElement = cartItem.querySelector('.price');
            const basePrice = parseFloat(priceElement.getAttribute('data-base-price') || priceElement.textContent.replace('$', ''));
            const quantity = parseInt(this.value);
            const newPrice = basePrice * quantity;
            
            priceElement.textContent = `$${newPrice.toFixed(2)}`;
            updateCartTotal();
            
            console.log('Quantity updated:', { quantity, newPrice });
            
            if (window.EcommerceApp) {
                window.EcommerceApp.showNotification('Quantity updated!');
            }
        });
        
        // Set base price attribute for calculations
        const priceElement = select.closest('.cart-item').querySelector('.price');
        if (!priceElement.getAttribute('data-base-price')) {
            const basePrice = parseFloat(priceElement.textContent.replace('$', ''));
            priceElement.setAttribute('data-base-price', basePrice);
        }
    });
    
    // Remove item handlers
    removeButtons.forEach(button => {
        button.classList.add('initialized');
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const itemName = cartItem.querySelector('h3').textContent;
            
            cartItem.style.opacity = '0';
            cartItem.style.transform = 'translateX(-100%)';
            
            setTimeout(() => {
                cartItem.remove();
                updateCartTotal();
                updateCartCount();
            }, 300);
            
            console.log('Item removed from cart:', itemName);
            
            if (window.EcommerceApp) {
                window.EcommerceApp.showNotification('Item removed from cart!');
            }
        });
    });
    
    // Save for later handlers
    saveButtons.forEach(button => {
        button.classList.add('initialized');
        button.addEventListener('click', function() {
            // Prevent multiple clicks
            if (this.classList.contains('processing')) return;
            this.classList.add('processing');
            
            const cartItem = this.closest('.cart-item');
            const itemName = cartItem.querySelector('h3').textContent;
            
            // Move item to saved items section
            moveToSavedItems(cartItem);
            
            console.log('Item saved for later:', itemName);
            
            if (window.EcommerceApp) {
                window.EcommerceApp.showNotification('Item saved for later!');
            }
            
            // Re-enable button after animation
            setTimeout(() => {
                this.classList.remove('processing');
            }, 1000);
        });
    });
    
    // Remove all items handler
    if (removeAllButton) {
        removeAllButton.addEventListener('click', function() {
            const cartItems = document.querySelectorAll('.cart-item');
            
            if (cartItems.length > 0) {
                cartItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(-100%)';
                        
                        setTimeout(() => {
                            item.remove();
                            if (index === cartItems.length - 1) {
                                updateCartTotal();
                                updateCartCount();
                            }
                        }, 300);
                    }, index * 100);
                });
                
                console.log('All items removed from cart');
                
                if (window.EcommerceApp) {
                    window.EcommerceApp.showNotification('All items removed from cart!');
                }
            }
        });
    }
    
    // Back to shop handler
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
}

// Initialize order summary functionality
function initOrderSummary() {
    const applyButton = document.querySelector('.btn-apply');
    const checkoutButton = document.querySelector('.btn-checkout');
    const couponInput = document.querySelector('.coupon-input input');
    
    // Apply coupon handler
    if (applyButton) {
        applyButton.addEventListener('click', function() {
            const couponCode = couponInput.value.trim();
            
            if (couponCode) {
                applyCoupon(couponCode);
            } else {
                if (window.EcommerceApp) {
                    window.EcommerceApp.showNotification('Please enter a coupon code', 'error');
                }
            }
        });
    }
    
    // Checkout handler
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            const cartItems = document.querySelectorAll('.cart-item');
            
            if (cartItems.length === 0) {
                if (window.EcommerceApp) {
                    window.EcommerceApp.showNotification('Your cart is empty. Please add some items before checkout.', 'error');
                }
                return;
            }
            
            console.log('Proceeding to checkout...');
            
            if (window.EcommerceApp) {
                window.EcommerceApp.showNotification('Redirecting to checkout page...');
            }
        });
    }
    
    // Enter key for coupon input
    if (couponInput) {
        couponInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyButton.click();
            }
        });
    }
}

// Initialize saved items functionality
function initSavedItems() {
    const moveToCartButtons = document.querySelectorAll('.btn-move-to-cart:not(.initialized)');
    
    moveToCartButtons.forEach(button => {
        button.classList.add('initialized');
        button.addEventListener('click', function() {
            // Prevent multiple clicks
            if (this.classList.contains('processing')) return;
            this.classList.add('processing');
            
            const savedItem = this.closest('.saved-item');
            const itemName = savedItem.querySelector('h4').textContent;
            
            // Move item back to cart
            moveToCart(savedItem);
            
            console.log('Item moved to cart:', itemName);
            
            if (window.EcommerceApp) {
                window.EcommerceApp.showNotification('Item moved to cart!');
            }
            
            // Re-enable button after animation
            setTimeout(() => {
                this.classList.remove('processing');
            }, 1000);
        });
    });
}

// Initialize promotional banner
function initPromoBanner() {
    const shopNowButton = document.querySelector('.promo-banner .btn');
    
    if (shopNowButton) {
        shopNowButton.addEventListener('click', function() {
            console.log('Shop now button clicked');
            window.location.href = 'products.html';
        });
    }
}

// Update cart total
function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let subtotal = 0;
    
    cartItems.forEach(item => {
        const priceElement = item.querySelector('.price');
        const price = parseFloat(priceElement.textContent.replace('$', ''));
        subtotal += price;
    });
    
    // Update subtotal display
    const subtotalElement = document.querySelector('.price-row:not(.discount):not(.tax):not(.total) span:last-child');
    if (subtotalElement) {
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }
    
    // Calculate discount (if any)
    const discount = 60.00; // This would come from applied coupons
    const tax = 14.00; // This would be calculated based on location
    const total = subtotal - discount + tax;
    
    // Update total display
    const totalElement = document.querySelector('.price-row.total span:last-child');
    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    console.log('Cart total updated:', { subtotal, discount, tax, total });
}

// Update cart count
function updateCartCount() {
    const cartItems = document.querySelectorAll('.cart-item');
    const cartCount = cartItems.length;
    const cartTitle = document.querySelector('.cart-items h2');
    
    if (cartTitle) {
        cartTitle.textContent = `My cart (${cartCount})`;
    }
    
    // Update header cart count if it exists
    const headerCartCount = document.querySelector('.user-item.active span');
    if (headerCartCount) {
        headerCartCount.textContent = `My cart (${cartCount})`;
    }
}

// Apply coupon
function applyCoupon(couponCode) {
    // Simulate coupon validation
    const validCoupons = ['SAVE10', 'DISCOUNT20', 'WELCOME15'];
    
    if (validCoupons.includes(couponCode.toUpperCase())) {
        console.log('Coupon applied:', couponCode);
        
        if (window.EcommerceApp) {
            window.EcommerceApp.showNotification('Coupon applied successfully!');
        }
        
        // Update discount display
        const discountElement = document.querySelector('.price-row.discount span:last-child');
        if (discountElement) {
            discountElement.textContent = '- $60.00';
        }
        
        updateCartTotal();
    } else {
        console.log('Invalid coupon code:', couponCode);
        
        if (window.EcommerceApp) {
            window.EcommerceApp.showNotification('Invalid coupon code!', 'error');
        }
    }
}

// Move item to saved items
function moveToSavedItems(cartItem) {
    const savedGrid = document.querySelector('.saved-grid');
    
    if (savedGrid) {
        const itemName = cartItem.querySelector('h3').textContent;
        const itemImage = cartItem.querySelector('.item-image img').src;
        const itemPrice = cartItem.querySelector('.price').textContent;
        
        // Create saved item element
        const savedItem = document.createElement('div');
        savedItem.className = 'saved-item';
        savedItem.innerHTML = `
            <img src="${itemImage}" alt="${itemName}">
            <div class="saved-info">
                <h4>${itemName}</h4>
                <p class="price">${itemPrice}</p>
            </div>
            <button class="btn-move-to-cart">
                <i class="fas fa-shopping-cart"></i>
                Move to cart
            </button>
        `;
        
        // Add to saved items
        savedGrid.appendChild(savedItem);
        
        // Remove from cart
        cartItem.remove();
        
        // Update cart
        updateCartTotal();
        updateCartCount();
        
        // Reinitialize saved items
        initSavedItems();
    }
}

// Move item to cart
function moveToCart(savedItem) {
    const cartItems = document.querySelector('.cart-items');
    
    if (cartItems) {
        const itemName = savedItem.querySelector('h4').textContent;
        const itemImage = savedItem.querySelector('img').src;
        const itemPrice = savedItem.querySelector('.price').textContent;
        
        // Create cart item element
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-image">
                <img src="${itemImage}" alt="${itemName}">
            </div>
            <div class="item-details">
                <h3>${itemName}</h3>
                <p class="item-specs">Size: medium, Color: blue, Material: Plastic</p>
                <p class="seller">Seller: Artel Market</p>
            </div>
            <div class="item-price">
                <span class="price" data-base-price="${itemPrice.replace('$', '')}">${itemPrice}</span>
            </div>
            <div class="item-quantity">
                <select class="quantity-select">
                    <option value="1" selected>Qty: 1</option>
                    <option value="2">Qty: 2</option>
                    <option value="3">Qty: 3</option>
                    <option value="4">Qty: 4</option>
                    <option value="5">Qty: 5</option>
                </select>
            </div>
            <div class="item-actions">
                <button class="btn-remove">Remove</button>
                <button class="btn-save">Save for later</button>
            </div>
        `;
        
        // Add to cart
        cartItems.appendChild(cartItem);
        
        // Remove from saved items
        savedItem.remove();
        
        // Update cart
        updateCartTotal();
        updateCartCount();
        
        // Reinitialize cart items
        initCartItems();
    }
}

// Export functions for global access
window.CartPage = {
    updateCartTotal,
    updateCartCount,
    applyCoupon,
    moveToSavedItems,
    moveToCart
};