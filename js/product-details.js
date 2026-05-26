
document.addEventListener('DOMContentLoaded', function() {
    initImageGallery();
    initTabs();
    initSaveForLater();
    initRelatedProducts();
    initPromoBanner();
    initSupplierActions();
    initPriceTiers();
    initProductSpecs();
});

// Initialize image gallery
function initImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    
    if (!thumbnails.length || !mainImage) return;
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            const imageSrc = this.getAttribute('data-image');
            mainImage.src = imageSrc;
            mainImage.alt = this.querySelector('img').alt;
            
            // Add fade effect
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 150);
        });
    });
    
    // Add transition effect to main image
    mainImage.style.transition = 'opacity 0.3s ease';
}

// Initialize tabs
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Initialize save for later functionality - FIXED VERSION
function initSaveForLater() {
    const saveButton = document.querySelector('.save-for-later');
    
    if (saveButton) {
        // Check if already initialized to prevent duplicate event listeners
        if (saveButton.dataset.initialized) return;
        saveButton.dataset.initialized = 'true';
        
        saveButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            // Toggle between far (outline) and fas (solid) classes
            if (icon.classList.contains('far')) {
                // Add to saved items
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#ff4444';
                
                // Show notification
                if (window.EcommerceApp) {
                    window.EcommerceApp.showNotification('Product saved for later!');
                } else {
                    console.log('Product saved for later!');
                }
            } else {
                // Remove from saved items
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
                
                // Show notification
                if (window.EcommerceApp) {
                    window.EcommerceApp.showNotification('Product removed from saved items!');
                } else {
                    console.log('Product removed from saved items!');
                }
            }
        });
    }
}

// Initialize related products
function initRelatedProducts() {
    const relatedItems = document.querySelectorAll('.related-item');
    
    relatedItems.forEach(item => {
        item.addEventListener('click', function() {
            const productName = this.querySelector('h4').textContent;
            console.log('Navigating to related product:', productName);
            alert(`Viewing details for: ${productName}`);
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Initialize promotional banner
function initPromoBanner() {
    const shopNowBtn = document.querySelector('.promo-banner .btn');
    
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', function() {
            console.log('Shop now button clicked');
            
            // Navigate to products page
            window.location.href = 'products.html';
        });
    }
}

// Initialize supplier actions
function initSupplierActions() {
    const sendInquiryBtn = document.querySelector('.supplier-actions .btn-primary');
    const sellerProfileBtn = document.querySelector('.supplier-actions .btn-outline');
    
    if (sendInquiryBtn) {
        sendInquiryBtn.addEventListener('click', function() {
            console.log('Send inquiry clicked');
            
            // Show inquiry form or modal
            showInquiryForm();
        });
    }
    
    if (sellerProfileBtn) {
        sellerProfileBtn.addEventListener('click', function() {
            console.log('Seller profile clicked');
            
            // Navigate to seller profile page
            alert('Navigating to seller profile...');
        });
    }
}

// Show inquiry form (placeholder function)
function showInquiryForm() {
    // Create a simple modal for inquiry form
    const modal = document.createElement('div');
    modal.className = 'inquiry-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div class="inquiry-form" style="
            background: white;
            padding: 30px;
            border-radius: 8px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        ">
            <h3 style="margin-bottom: 20px;">Send Inquiry</h3>
            <form>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">Subject:</label>
                    <input type="text" placeholder="Inquiry subject" style="
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                    ">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">Message:</label>
                    <textarea placeholder="Your inquiry message" rows="5" style="
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        resize: vertical;
                    "></textarea>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button type="submit" style="
                        background: #0066cc;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 4px;
                        cursor: pointer;
                    ">Send Inquiry</button>
                    <button type="button" onclick="closeInquiryModal()" style="
                        background: #6c757d;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 4px;
                        cursor: pointer;
                    ">Cancel</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    const form = modal.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Inquiry submitted');
        
        if (window.EcommerceApp) {
            window.EcommerceApp.showNotification('Inquiry sent successfully!');
        }
        
        closeInquiryModal();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeInquiryModal();
        }
    });
}

// Close inquiry modal
function closeInquiryModal() {
    const modal = document.querySelector('.inquiry-modal');
    if (modal) {
        modal.remove();
    }
}

// Initialize price tier selection
function initPriceTiers() {
    const priceTiers = document.querySelectorAll('.price-tier');
    
    priceTiers.forEach(tier => {
        tier.addEventListener('click', function() {
            // Remove active class from all tiers
            priceTiers.forEach(t => t.style.border = 'none');
            
            // Add active class to clicked tier
            this.style.border = '2px solid var(--primary-color)';
            
            const price = this.querySelector('.price').textContent;
            const quantity = this.querySelector('.quantity').textContent;
            
            console.log('Selected price tier:', { price, quantity });
            
            // Show notification
            if (window.EcommerceApp) {
                window.EcommerceApp.showNotification(`Selected: ${quantity} at ${price}`);
            }
        });
        
        // Add hover effect
        tier.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        tier.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize product specifications interaction
function initProductSpecs() {
    const specItems = document.querySelectorAll('.spec-item');
    
    specItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--light-gray)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });
}

// Export functions for global access
window.ProductDetails = {
    showInquiryForm,
    closeInquiryModal,
    initImageGallery,
    initTabs,
    initSaveForLater
};