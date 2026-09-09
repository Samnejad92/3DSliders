// ========================================
// Get elements
// ========================================
const backgrounds =
    document.querySelectorAll('.background');
const slider =
    document.querySelector('.slider-images');
const images =
    Array.from(slider.children);
// ========================================
// Current slide
// ========================================
let imageIndex = 0;
// ========================================
// Prevent multiple scroll events
// ========================================
let isAnimating = false;
// ========================================
// Update Slider
// ========================================
function updateSlider() {
    images.forEach(image => {
        image.classList.remove(
            'active',
            'previous',
            'next',
            'inactive'
        );
    });
    // ------------------------------------
    // Active
    // ------------------------------------
    images[imageIndex]
        .classList.add('active');
    // ------------------------------------
    // Previous
    // ------------------------------------
    const previousIndex =
        (imageIndex - 1 + images.length)
        % images.length;
    images[previousIndex]
        .classList.add('previous');
    // ------------------------------------
    // Next
    // ------------------------------------
    const nextIndex =
        (imageIndex + 1)
        % images.length;
    images[nextIndex]
        .classList.add('next');
    // ------------------------------------
    // Inactive
    // ------------------------------------
    images.forEach((image, index) => {
        if (
            index !== imageIndex &&
            index !== previousIndex &&
            index !== nextIndex
        ) {
            image.classList.add('inactive');
        }
    });
    // ------------------------------------
    // Background
    // ------------------------------------
    backgrounds.forEach(background => {
        background.style.opacity = '0';
    });
    if (backgrounds[imageIndex]) {
        backgrounds[imageIndex]
            .style.opacity = '1';
    }
}
// ========================================
// Next Slide
// ========================================
function nextSlide() {
    if (isAnimating) return;
    isAnimating = true;
    imageIndex =
        (imageIndex + 1) % images.length;
    updateSlider();
    setTimeout(() => {
        isAnimating = false;
    }, 900);
}
// ========================================
// Previous Slide
// ========================================
function previousSlide() {
    if (isAnimating) return;
    isAnimating = true;
    imageIndex =
        (imageIndex - 1 + images.length)
        % images.length;
    updateSlider();
    setTimeout(() => {
        isAnimating = false;
    }, 900);
}
// ========================================
// Mouse Wheel
// ========================================
window.addEventListener(
    'wheel',
    function (event) {
        if (event.deltaY > 0) {
            nextSlide();
        } else {
            previousSlide();
        }
    },
    {
        passive: true
    }
);
// ========================================
// Touch Swipe
// ========================================
let touchStartY = 0;
let touchEndY = 0;
window.addEventListener(
    'touchstart',
    function (event) {
        touchStartY =
            event.changedTouches[0].screenY;
    },
    {
        passive: true
    }
);
window.addEventListener(
    'touchend',
    function (event) {
        touchEndY =
            event.changedTouches[0].screenY;
        handleSwipe();
    },
    {
        passive: true
    }
);
// ========================================
// Handle Swipe
// ========================================
function handleSwipe() {
    const swipeDistance =
        touchStartY - touchEndY;
    // Ignore very small movements
    if (Math.abs(swipeDistance) < 50) {
        return;
    }
    // Swipe up
    if (swipeDistance > 0) {
        nextSlide();
    }
    // Swipe down
    else {
        previousSlide();
    }
}
// ========================================
// Keyboard Support
// ========================================
window.addEventListener(
    'keydown',
    function (event) {
        if (event.key === 'ArrowDown') {
            nextSlide();
        }
        if (event.key === 'ArrowUp') {
            previousSlide();
        }
    }
);
// ========================================
// Initial Slider
// ========================================
updateSlider();