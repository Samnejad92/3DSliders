/* =========================================================
   PRODUCTS CAROUSEL
   ARMAN TRADE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const carousel =
        document.querySelector(".products-carousel");

    const prevButton =
        document.querySelector(
            ".products-carousel-wrapper .carousel-prev"
        );

    const nextButton =
        document.querySelector(
            ".products-carousel-wrapper .carousel-next"
        );

    const currentSlide =
        document.getElementById("currentSlide");

    const totalSlides =
        document.getElementById("totalSlides");

    const progress =
        document.querySelector(
            ".products-carousel-wrapper .carousel-progress span"
        );


    /* =========================================
       CHECK
    ========================================= */

    if (!carousel) {
        return;
    }


    /* =========================================
       PRODUCTS
    ========================================= */

    const cards =
        carousel.querySelectorAll(".product-card");

    const total =
        cards.length;


    if (total === 0) {
        return;
    }


    /* =========================================
       TOTAL
    ========================================= */

    if (totalSlides) {

        totalSlides.textContent =
            String(total).padStart(2, "0");

    }


    /* =========================================
       CARD WIDTH
    ========================================= */

    function getCardWidth() {

        const card =
            carousel.querySelector(".product-card");

        if (!card) {
            return 300;
        }


        const carouselStyle =
            window.getComputedStyle(carousel);


        const gap =
            parseFloat(
                carouselStyle.columnGap ||
                carouselStyle.gap ||
                0
            );


        return card.offsetWidth + gap;

    }


    /* =========================================
       UPDATE
    ========================================= */

    function updateCarousel() {

        const cardWidth =
            getCardWidth();


        const maxScroll =
            carousel.scrollWidth -
            carousel.clientWidth;


        const currentScroll =
            carousel.scrollLeft;


        /* =====================================
           CURRENT SLIDE
        ===================================== */

        let index =
            Math.round(
                currentScroll / cardWidth
            );


        index =
            Math.max(
                0,
                Math.min(index, total - 1)
            );


        const current =
            index + 1;


        if (currentSlide) {

            currentSlide.textContent =
                String(current).padStart(2, "0");

        }


        /* =====================================
           PROGRESS
        ===================================== */

        if (progress) {

            let percentage;

            if (maxScroll <= 0) {

                percentage = 100;

            } else {

                percentage =
                    (currentScroll / maxScroll) * 100;

            }


            progress.style.width =
                Math.max(5, percentage) + "%";

        }


        /* =====================================
           BUTTON STATE
        ===================================== */

        if (prevButton) {

            prevButton.disabled =
                currentScroll <= 5;

        }


        if (nextButton) {

            nextButton.disabled =
                currentScroll >=
                maxScroll - 5;

        }

    }


    /* =========================================
       NEXT
    ========================================= */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                carousel.scrollBy({

                    left: getCardWidth(),

                    behavior: "smooth"

                });

            }
        );

    }


    /* =========================================
       PREVIOUS
    ========================================= */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            function () {

                carousel.scrollBy({

                    left: -getCardWidth(),

                    behavior: "smooth"

                });

            }
        );

    }


    /* =========================================
       SCROLL
    ========================================= */

    let scrollTimeout;

    carousel.addEventListener(
        "scroll",
        function () {

            clearTimeout(scrollTimeout);

            scrollTimeout =
                setTimeout(
                    updateCarousel,
                    50
                );

        }
    );


    /* =========================================
       RESIZE
    ========================================= */

    window.addEventListener(
        "resize",
        function () {

            updateCarousel();

        }
    );


    /* =========================================
       MOUSE WHEEL
    ========================================= */

    carousel.addEventListener(
        "wheel",
        function (event) {

            if (
                Math.abs(event.deltaY) >
                Math.abs(event.deltaX)
            ) {

                event.preventDefault();

                carousel.scrollBy({

                    left: event.deltaY,

                    behavior: "smooth"

                });

            }

        },
        {
            passive: false
        }
    );


    /* =========================================
       INITIALIZE
    ========================================= */

    updateCarousel();

});