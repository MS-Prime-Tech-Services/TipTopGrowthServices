// Main JavaScript for TipTop Growth Services with optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements for better performance
    const form = document.getElementById('tiktok-service-form');
    const priceElements = {
        total: document.getElementById('total-price'),
        discounted: document.getElementById('discounted-price'),
        rounded: document.getElementById('rounded-price'),
        discountAmount: document.getElementById('discount-amount'),
        discountValue: document.getElementById('discount-value'),
        discountContainer: document.getElementById('discount-container')
    };
    
    // Cache form input elements
    const formInputs = {
        followers: document.getElementById('followers'),
        likes: document.getElementById('likes'),
        comments: document.getElementById('comments'),
        commentType: document.getElementById('comment_type'),
        customComment: document.getElementById('custom_comment'),
        customCommentContainer: document.getElementById('custom_comment_container'),
        views: document.getElementById('views'),
        watchTime: document.getElementById('watch_time'),
        customTime: document.getElementById('custom_time'),
        customTimeContainer: document.getElementById('custom_time_container'),
        reposts: document.getElementById('reposts'),
        favorites: document.getElementById('favorites'),
        profileLink: document.getElementById('profile_link'),
        couponCode: document.getElementById('coupon_code'),
        couponMessage: document.getElementById('coupon-message'),
        applyButton: document.getElementById('apply-coupon'),
        deliveryOptions: document.querySelectorAll('input[name="delivery_option"]')
    };
    
    // Initialize performance optimization
    let debounceTimer;
    // Coupon code configuration
    const validCoupons = {
        'SAVE10': 10, // 10% discount
        'SAVE20': 20, // 20% discount
        'SAVE30': 30, // 30% discount
        'SAVE40': 40, // 40% discount
        'SAVE50': 50  // 50% discount
    };
    
    let currentDiscount = 0;
    let couponApplied = '';
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Fix for legal dropdown menu on mobile
    const legalDropdown = document.querySelector('.dropdown-toggle[aria-expanded="false"]');
    if (legalDropdown) {
        legalDropdown.addEventListener('click', function(e) {
            // Prevent default only on mobile devices
            if (window.innerWidth < 992) {
                e.preventDefault();
            }
        });
    }
    
    // Form validation for TikTok profile link
    const profileLinkInput = document.getElementById('profile_link');
    if (profileLinkInput) {
        profileLinkInput.addEventListener('blur', function() {
            validateTikTokLink(this);
        });
    }
    
    // Real-time validation for TikTok profile link
    function validateTikTokLink(input) {
        const value = input.value.trim();
        const isValid = value.startsWith('https://www.tiktok.com/') || 
                        value.startsWith('https://tiktok.com/');
        
        if (value && !isValid) {
            input.classList.add('is-invalid');
            
            // Create feedback element if it doesn't exist
            let feedback = input.nextElementSibling;
            if (!feedback || !feedback.classList.contains('invalid-feedback')) {
                feedback = document.createElement('div');
                feedback.classList.add('invalid-feedback');
                input.parentNode.insertBefore(feedback, input.nextSibling);
            }
            
            feedback.textContent = 'Please enter a valid TikTok profile link (https://www.tiktok.com/@username)';
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            
            // Remove any existing feedback
            const feedback = input.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.remove();
            }
        }
        
        return isValid;
    }
    
    // Form submission validation
    if (form) {
        form.addEventListener('submit', function(e) {
            const profileLink = document.getElementById('profile_link');
            const followers = document.getElementById('followers');
            const likes = document.getElementById('likes');
            const comments = document.getElementById('comments');
            const views = document.getElementById('views');
            const reposts = document.getElementById('reposts');
            const favorites = document.getElementById('favorites');
            
            // Validate TikTok link
            if (!validateTikTokLink(profileLink)) {
                e.preventDefault();
                return false;
            }
            
            // Check if at least one service is selected
            const totalServices = 
                parseInt(followers.value || 0) + 
                parseInt(likes.value || 0) + 
                parseInt(comments.value || 0) + 
                parseInt(views.value || 0) + 
                parseInt(reposts.value || 0) + 
                parseInt(favorites.value || 0);
                
            if (totalServices <= 0) {
                e.preventDefault();
                
                // Create alert message
                const alertDiv = document.createElement('div');
                alertDiv.classList.add('alert', 'alert-danger', 'mt-3');
                alertDiv.textContent = 'Please select at least one service (followers, likes, comments, views, reposts, or favorites).';
                
                // Insert before the form
                form.parentNode.insertBefore(alertDiv, form);
                
                // Remove alert after 5 seconds
                setTimeout(() => {
                    alertDiv.remove();
                }, 5000);
                
                return false;
            }
            
            // Validate custom comment if selected
            const commentType = document.getElementById('comment_type');
            const customComment = document.getElementById('custom_comment');
            
            if (parseInt(comments.value) > 0 && 
                commentType.value === 'custom' && 
                (!customComment.value || customComment.value.trim() === '')) {
                
                e.preventDefault();
                customComment.classList.add('is-invalid');
                
                // Create feedback if it doesn't exist
                let feedback = customComment.nextElementSibling;
                if (!feedback || !feedback.classList.contains('invalid-feedback')) {
                    feedback = document.createElement('div');
                    feedback.classList.add('invalid-feedback');
                    customComment.parentNode.insertBefore(feedback, customComment.nextSibling);
                }
                
                feedback.textContent = 'Please enter your custom comment text';
                return false;
            }
        });
    }
    
    // Calculate price
    function updatePriceWithDiscount() {
        console.log("Running updatePriceWithDiscount function...");
        
        const followers = parseInt(document.getElementById('followers')?.value || 0);
        const likes = parseInt(document.getElementById('likes')?.value || 0);
        const comments = parseInt(document.getElementById('comments')?.value || 0);
        const commentType = document.getElementById('comment_type')?.value || 'random';
        const views = parseInt(document.getElementById('views')?.value || 0);
        const watchTime = document.getElementById('watch_time')?.value || 'random';
        const reposts = parseInt(document.getElementById('reposts')?.value || 0);
        const favorites = parseInt(document.getElementById('favorites')?.value || 0);
        
        // Get selected delivery option
        const deliveryOption = document.querySelector('input[name="delivery_option"]:checked')?.value || 'random';
        
        console.log("Form values:", {followers, likes, comments, commentType, views, watchTime, reposts, favorites, deliveryOption});
            
        // Calculate base price
        let price = 0;
        
        if (followers > 0) {
            const followerPrice = followers * 1;
            price += followerPrice; // 1 PKR per follower
            console.log(`Adding ${followers} followers: +${followerPrice} PKR`);
        }
        
        if (likes > 0) {
            const likePrice = likes * 0.3;
            price += likePrice; // 0.3 PKR per like
            console.log(`Adding ${likes} likes: +${likePrice} PKR`);
        }
        
        if (comments > 0) {
            let commentPrice = 0;
            if (commentType === 'random') {
                commentPrice = comments * 0.4;
                price += commentPrice; // 0.4 PKR per random comment
                console.log(`Adding ${comments} random comments: +${commentPrice} PKR`);
            } else {
                commentPrice = comments * 0.8;
                price += commentPrice; // 0.8 PKR per custom comment
                console.log(`Adding ${comments} custom comments: +${commentPrice} PKR`);
            }
        }
        
        if (views > 0) {
            const viewsPrice = views * 0.5;
            price += viewsPrice; // 0.5 PKR per view
            console.log(`Adding ${views} views: +${viewsPrice} PKR`);
            
            if (watchTime === 'custom') {
                const customTimePrice = views * 0.8;
                price += customTimePrice; // Additional 0.8 PKR for custom watch time
                console.log(`Adding custom watch time for ${views} views: +${customTimePrice} PKR`);
            }
        }
        
        if (reposts > 0) {
            const repostsPrice = reposts * 0.2;
            price += repostsPrice; // 0.2 PKR per repost
            console.log(`Adding ${reposts} reposts: +${repostsPrice} PKR`);
        }
        
        if (favorites > 0) {
            const favoritesPrice = favorites * 0.2;
            price += favoritesPrice; // 0.2 PKR per favorite
            console.log(`Adding ${favorites} favorites: +${favoritesPrice} PKR`);
        }
        
        // Add express delivery charge if selected
        let deliveryFee = 0;
        let finalPrice = price;
        
        // If express delivery is selected, add 500 PKR
        if (deliveryOption === 'fast') {
            deliveryFee = 500;
            finalPrice += deliveryFee;
            console.log(`Adding express delivery fee: +${deliveryFee} PKR`);
        }
        
        // Round to 2 decimal places
        const exactPrice = Math.round(finalPrice * 100) / 100;
        console.log("Base price calculated:", exactPrice);
        
        // Calculate discounted price if coupon is applied
        let discountedPrice = exactPrice;
        let baseDiscountedPrice = price; // Services price without delivery fee
        let discountValue = 0;
        let finalRoundedPrice = Math.ceil(exactPrice); // Default rounded price
        
        // Add a hidden field for delivery fee if it doesn't exist
        if (!document.getElementById('delivery_fee')) {
            const deliveryFeeField = document.createElement('input');
            deliveryFeeField.type = 'hidden';
            deliveryFeeField.id = 'delivery_fee';
            deliveryFeeField.name = 'delivery_fee';
            form.appendChild(deliveryFeeField);
        }
        document.getElementById('delivery_fee').value = deliveryFee;
        
        if (currentDiscount > 0) {
            // Only apply discount to the base price (excluding delivery fee)
            // This ensures express delivery fee is not discounted
            discountValue = (price * currentDiscount / 100);
            
            // Final discounted price = base price with discount + full delivery fee
            discountedPrice = (price - discountValue) + deliveryFee;
            
            // Round discounted price to 2 decimal places
            discountedPrice = Math.round(discountedPrice * 100) / 100;
            
            // Round up discounted price to nearest integer
            finalRoundedPrice = Math.ceil(discountedPrice);
            
            // Show discount container
            const discountContainer = document.getElementById('discount-container');
            if (discountContainer) {
                discountContainer.style.display = 'block';
            }
            
            // Update discount amount display
            const discountAmountElement = document.getElementById('discount-amount');
            if (discountAmountElement) {
                discountAmountElement.textContent = `${currentDiscount}%`;
            }
            
            // Update discount value display
            const discountValueElement = document.getElementById('discount-value');
            if (discountValueElement) {
                discountValueElement.textContent = `(PKR ${discountValue.toFixed(2)})`;
            }
            
            // Update discounted price display
            const discountedPriceElement = document.getElementById('discounted-price');
            if (discountedPriceElement) {
                discountedPriceElement.textContent = `PKR ${discountedPrice.toFixed(2)}`;
            }
            
            // Update hidden fields for discounted prices
            document.getElementById('discount').value = currentDiscount;
            document.getElementById('discounted_price').value = discountedPrice.toFixed(2);
            document.getElementById('discounted_rounded_price').value = finalRoundedPrice;
            
            console.log(`Applied ${currentDiscount}% discount. Original: ${exactPrice.toFixed(2)}, Discounted: ${discountedPrice.toFixed(2)}`);
        } else {
            // Hide discount container if no coupon is applied
            const discountContainer = document.getElementById('discount-container');
            if (discountContainer) {
                discountContainer.style.display = 'none';
            }
            
            // Reset discount hidden fields
            document.getElementById('discount').value = 0;
            document.getElementById('discounted_price').value = 0;
            document.getElementById('discounted_rounded_price').value = 0;
        }
        
        // Update the regular price display
        const totalPriceElement = document.getElementById('total-price');
        if (totalPriceElement) {
            totalPriceElement.textContent = `PKR ${exactPrice.toFixed(2)}`;
        }
        
        // Update the rounded price display (showing the final price user will pay)
        const roundedPriceElement = document.getElementById('rounded-price');
        if (roundedPriceElement) {
            roundedPriceElement.textContent = `PKR ${finalRoundedPrice}`;
        }
        
        // Update hidden fields for form submission
        document.getElementById('original_price').value = exactPrice.toFixed(2);
        document.getElementById('original_rounded_price').value = Math.ceil(exactPrice);
        
        console.log("Price updated:", exactPrice.toFixed(2), currentDiscount > 0 ? `, discounted: ${discountedPrice.toFixed(2)}` : '');
        return exactPrice;
    }
    
    // Apply coupon button click handler
    const applyButton = document.getElementById('apply-coupon');
    // form is already defined above
    
    if (applyButton && form) {
        applyButton.addEventListener('click', function() {
            const couponInput = document.getElementById('coupon_code');
            const couponMessage = document.getElementById('coupon-message');
            
            if (couponInput && couponInput.value) {
                const couponCode = couponInput.value.trim().toUpperCase();
                
                if (validCoupons.hasOwnProperty(couponCode)) {
                    currentDiscount = validCoupons[couponCode];
                    couponApplied = couponCode;
                    
                    // Set hidden field for applied coupon to be submitted with form
                    if (!document.getElementById('applied_coupon')) {
                        const appliedCouponField = document.createElement('input');
                        appliedCouponField.type = 'hidden';
                        appliedCouponField.id = 'applied_coupon';
                        appliedCouponField.name = 'applied_coupon';
                        form.appendChild(appliedCouponField);
                    }
                    document.getElementById('applied_coupon').value = couponApplied;
                    
                    couponMessage.textContent = `Coupon applied successfully! ${currentDiscount}% discount.`;
                    couponMessage.classList.remove('text-danger');
                    couponMessage.classList.add('text-success');
                    
                    // Update price with discount
                    updatePriceWithDiscount();
                } else {
                    couponMessage.textContent = 'Invalid coupon code.';
                    couponMessage.classList.remove('text-success');
                    couponMessage.classList.add('text-danger');
                    
                    // Reset discount
                    currentDiscount = 0;
                    couponApplied = '';
                    
                    // Clear the hidden coupon field if it exists
                    if (document.getElementById('applied_coupon')) {
                        document.getElementById('applied_coupon').value = '';
                    }
                    
                    updatePriceWithDiscount();
                }
            } else {
                couponMessage.textContent = 'Please enter a coupon code.';
                couponMessage.classList.remove('text-success');
                couponMessage.classList.add('text-danger');
            }
        });
    }
    
    // Helper function for performance optimization
    function debounce(func, delay = 300) {
        return function() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                func.apply(this, arguments);
            }, delay);
        };
    }
    
    // Add event listeners for price calculation with debounce for better performance
    const priceInputIds = ['followers', 'likes', 'comments', 'views', 'comment_type', 'watch_time', 'reposts', 'favorites'];
    
    // Use the cached elements when possible
    priceInputIds.forEach(id => {
        const element = formInputs[id] || document.getElementById(id);
        if (element) {
            // Use debounce for input events to prevent too many calculations
            element.addEventListener('input', debounce(updatePriceWithDiscount, 300));
            element.addEventListener('change', updatePriceWithDiscount);
        }
    });
    
    // Add event listeners for delivery option radio buttons
    if (formInputs.deliveryOptions) {
        formInputs.deliveryOptions.forEach(option => {
            option.addEventListener('change', updatePriceWithDiscount);
        });
    }
    
    // Add conditional display for custom fields
    if (formInputs.commentType && formInputs.customCommentContainer) {
        formInputs.commentType.addEventListener('change', function() {
            formInputs.customCommentContainer.style.display = 
                this.value === 'custom' ? 'block' : 'none';
        });
    }
    
    if (formInputs.watchTime && formInputs.customTimeContainer) {
        formInputs.watchTime.addEventListener('change', function() {
            formInputs.customTimeContainer.style.display = 
                this.value === 'custom' ? 'block' : 'none';
        });
    }
    
    // Initialize price calculation on page load
    updatePriceWithDiscount();
});
