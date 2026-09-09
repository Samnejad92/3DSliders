// ========================================
// Get all background divs
// ========================================
const backgrounds = document.querySelectorAll('.background');
// ========================================
// Get slider and images
// ========================================
const slider = document.querySelector('.slider-images');
const images = Array.from(slider.children);
// ========================================
// Initial image index
// ========================================
let imageIndex = 0;
// ========================================
// Update Slider
// ========================================
function updateSlider() {
    // Remove all slider classes
    images.forEach(image => {
        image.classList.remove(
            'active',
            'previous',
            'next',
            'inactive'
        );
    });
    // ========================================
    // Active Image
    // ========================================
    images[imageIndex].classList.add('active');
    // ========================================
    // Previous Image
    // ========================================
    if (imageIndex - 1 >= 0) {
        images[imageIndex - 1].classList.add('previous');
    } else {
        images[images.length - 1].classList.add('previous');
    }
    // ========================================
    // Next Image
    // ========================================
    if (imageIndex + 1 < images.length) {
        images[imageIndex + 1].classList.add('next');
    } else {
        images[0].classList.add('next');
    }
    // ========================================
    // Inactive Images
    // ========================================
    images.forEach((image, index) => {
        const previousIndex =
            (imageIndex - 1 + images.length) % images.length;
        const nextIndex =
            (imageIndex + 1) % images.length;
        if (
            index !== imageIndex &&
            index !== previousIndex &&
            index !== nextIndex
        ) {
            image.classList.add('inactive');
        }
    });
    // ========================================
    // Update Background
    // ========================================
    backgrounds.forEach(background => {
        background.style.opacity = 0;
    });
    if (backgrounds[imageIndex]) {
        backgrounds[imageIndex].style.opacity = 1;
    }
}
// ========================================
// Start Slider
// ========================================
updateSlider();
// ========================================
// Change slide every 3 seconds
// ========================================
setInterval(() => {
    imageIndex = (imageIndex + 1) % images.length;
    updateSlider();
}, 3000);