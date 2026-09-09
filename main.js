// ========================================
// GET ELEMENTS
// ========================================
const backgrounds = document.querySelectorAll('.background');
const slider = document.querySelector('.slider-images');
const images = Array.from(slider.children);
// ========================================
// DATE DATA
// ========================================
const dateData = [
    {
        name: "Zahedi Dates",
        description:
            "Premium Iranian Zahedi dates with a naturally sweet flavor and firm texture. Ideal for export and international markets.",
        origin: "Iran",
        texture: "Firm",
        quality: "Premium"
    },
    {
        name: "Sayer Dates",
        description:
            "High-quality Iranian Sayer dates with a rich caramel flavor and semi-dry texture. Excellent choice for international trade.",
        origin: "Iran",
        texture: "Semi-Dry",
        quality: "Export"
    },
    {
        name: "Kabkab Dates",
        description:
            "Premium Iranian Kabkab dates with a naturally sweet taste and soft texture, carefully selected for international export.",
        origin: "Iran",
        texture: "Soft",
        quality: "Premium"
    },
    {
        name: "Mazafati Dates",
        description:
            "Fresh Iranian Mazafati dates with a rich natural sweetness and soft texture. A popular choice for international markets.",
        origin: "Bam, Iran",
        texture: "Soft",
        quality: "Premium"
    }
];
// ========================================
// CURRENT SLIDE
// ========================================
let imageIndex = 0;
// ========================================
// ANIMATION LOCK
// ========================================
let isAnimating = false;
// ========================================
// UPDATE DATE INFORMATION
// ========================================
function updateDateInfo() {
    const card = document.getElementById("dateInfoCard");
    if (!card) {
        console.error("dateInfoCard not found!");
        return;
    }
    const currentDateData = dateData[imageIndex];
    if (!currentDateData) {
        console.error("Date data not found for slide:", imageIndex);
        return;
    }
    // ------------------------------------
    // EXIT ANIMATION
    // ------------------------------------
    card.classList.remove("is-entering");
    card.classList.add("is-changing");
    // ------------------------------------
    // CHANGE CONTENT
    // ------------------------------------
    setTimeout(() => {
        document.getElementById("dateName").textContent =
            currentDateData.name;
        document.getElementById("dateDescription").textContent =
            currentDateData.description;
        document.getElementById("dateOrigin").textContent =
            currentDateData.origin;
        document.getElementById("dateTexture").textContent =
            currentDateData.texture;
        document.getElementById("dateQuality").textContent =
            currentDateData.quality;
        document.getElementById("currentDate").textContent =
            String(imageIndex + 1).padStart(2, "0");
        // ------------------------------------
        // ENTER ANIMATION
        // ------------------------------------
        card.classList.remove("is-changing");
        // Force browser reflow
        void card.offsetWidth;
        card.classList.add("is-entering");
    }, 300);
    // ------------------------------------
    // CLEAN ANIMATION CLASS
    // ------------------------------------
    setTimeout(() => {
        card.classList.remove("is-entering");
    }, 1000);
}
// ========================================
// UPDATE SLIDER
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
    // ACTIVE
    // ------------------------------------
    images[imageIndex].classList.add('active');
    // ------------------------------------
    // PREVIOUS
    // ------------------------------------
    const previousIndex =
        (imageIndex - 1 + images.length) % images.length;
    images[previousIndex].classList.add('previous');
    // ------------------------------------
    // NEXT
    // ------------------------------------
    const nextIndex =
        (imageIndex + 1) % images.length;
    images[nextIndex].classList.add('next');
    // ------------------------------------
    // INACTIVE
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
    // BACKGROUND
    // ------------------------------------
    backgrounds.forEach(background => {
        background.style.opacity = '0';
    });
    if (backgrounds[imageIndex]) {
        backgrounds[imageIndex].style.opacity = '1';
    }
    // ------------------------------------
    // DATE CARD
    // ------------------------------------
    updateDateInfo();
}
// ========================================
// NEXT SLIDE
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
// PREVIOUS SLIDE
// ========================================
function previousSlide() {
    if (isAnimating) return;
    isAnimating = true;
    imageIndex =
        (imageIndex - 1 + images.length) % images.length;
    updateSlider();
    setTimeout(() => {
        isAnimating = false;
    }, 900);
}
// ========================================
// MOUSE WHEEL
// ========================================
window.addEventListener(
    'wheel',
    function (event) {
        if (event.deltaX > 0) {
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
// TOUCH SWIPE
// ========================================
let touchStartX = 0;
let touchEndX = 0;
window.addEventListener(
    'touchstart',
    function (event) {
        touchStartX =
            event.changedTouches[0].screenX;
    },
    {
        passive: true
    }
);
window.addEventListener(
    'touchend',
    function (event) {
        touchEndX =
            event.changedTouches[0].screenX;
        handleSwipe();
    },
    {
        passive: true
    }
);
// ========================================
// HANDLE SWIPE
// ========================================
function handleSwipe() {
    const swipeDistance =
        touchStartX - touchEndX;
    if (Math.abs(swipeDistance) < 50) {
        return;
    }
    if (swipeDistance > 0) {
        nextSlide();
    } else {
        previousSlide();
    }
}
// ========================================
// KEYBOARD
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
// INITIAL SLIDER
// ========================================
updateSlider();