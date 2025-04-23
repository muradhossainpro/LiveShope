(function ($) {
  "use strict";

  var windowOn = $(window);

  windowOn.on("load", function () {
    wowAnimation();
  });


  const buttons = document.querySelectorAll("button");
  const minValue = 0;
  const maxValue = 100;
  
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // 1. Get the clicked element
      const element = event.currentTarget;
      // 2. Get the parent
      const parent = element.parentNode;
      // 3. Get the number (within the parent)
      const numberContainer = parent.querySelector(".number");
      const number = parseFloat(numberContainer.textContent);
      // 4. Get the minus and plus buttons
      const increment = parent.querySelector(".plus");
      const decrement = parent.querySelector(".minus");
      // 5. Change the number based on click (either plus or minus)
      const newNumber = element.classList.contains("plus")
        ? number + 1
        : number - 1;
      numberContainer.textContent = newNumber;
      console.log(newNumber);
      // 6. Disable and enable buttons based on number value (and undim number)
      if (newNumber === minValue) {
        decrement.disabled = true;
        numberContainer.classList.add("dim");
        // Make sure the button won't get stuck in active state (Safari)
        element.blur();
      } else if (newNumber > minValue && newNumber < maxValue) {
        decrement.disabled = false;
        increment.disabled = false;
        numberContainer.classList.remove("dim");
      } else if (newNumber === maxValue) {
        increment.disabled = true;
        numberContainer.textContent = `${newNumber}+`;
        element.blur();
      }
    });
  });
  
  

  // preloader
  windowOn.on("load", function () {
    $("#loading").fadeOut(500);
  });

  // back-to-top
  var btn = $("#back-to-top");
  windowOn.scroll(function () {
    if (windowOn.scrollTop() > 300) {
      btn.addClass("show");
    } else {
      btn.removeClass("show");
    }
  });
  btn.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, "300");
  });

  // sticky js
  windowOn.on("scroll", function () {
    var scroll = windowOn.scrollTop();
    if (scroll < 100) {
      $("#header-sticky").removeClass("header-sticky");
    } else {
      $("#header-sticky").addClass("header-sticky");
    }
  });

  // mobile menu
  var MenuWrap = $(".mobile-menu-active > ul").clone();
  var SideMenu = $(".offcanvas-menu nav");
  SideMenu.append(MenuWrap);
  if ($(SideMenu).find(".sub-menu, .mega-menu").length != 0) {
    $(SideMenu)
      .find(".sub-menu, .mega-menu")
      .parent()
      .append(
        '<button class="menu-close"><i class="fas fa-chevron-right"></i></button>'
      );
  }

  var sideMenuList = $(
    ".offcanvas-menu nav > ul > li button.menu-close, .offcanvas-menu nav > ul li.has-dropdown > a"
  );
  $(sideMenuList).on("click", function (e) {
    e.preventDefault();
    if (!$(this).parent().hasClass("active")) {
      $(this).parent().addClass("active");
      $(this).siblings(".sub-menu, .mega-menu").slideDown();
    } else {
      $(this).siblings(".sub-menu, .mega-menu").slideUp();
      $(this).parent().removeClass("active");
    }
  });

  // offcanvas bar
  $(".offcanvas-toggle").on("click", function () {
    $(".offcanvas-area").addClass("offcanvas-open");
    $(".offcanvas-overlay").addClass("offcanvas-overlay-open");
  });
  $(".offcanvas-close-toggle,.offcanvas-overlay").on("click", function () {
    $(".offcanvas-area").removeClass("offcanvas-open");
    $(".offcanvas-overlay").removeClass("offcanvas-overlay-open");
  });

  // cart
  $(".cart-toggle").on("click", function () {
    $(".cart").addClass("cart-open");
    $(".cart-overlay").addClass("cart-overlay-open");
  });
  $(".cart-close-toggle,.cart-overlay").on("click", function () {
    $(".cart").removeClass("cart-open");
    $(".cart-overlay").removeClass("cart-overlay-open");
  });

  // Search bar
  $(".search-toggle").on("click", function () {
    $(".header-search-bar").addClass("search-open");
  });

  $(".search-close").on("click", function () {
    $(".header-search-bar").removeClass("search-open");
  });

  // data bg img
  $("[data-background]").each(function () {
    $(this).css(
      "background-image",
      "url(" + $(this).attr("data-background") + ")"
    );
  });

  // data bg color
  $("[data-bg-color]").each(function () {
    $(this).css("background-color", $(this).attr("data-bg-color"));
  });

  // data bg color
  $("[data-color]").each(function () {
    $(this).css("color", $(this).attr("data-color"));
  });

  $(".popup-image").magnificPopup({
    type: "image",
    // other options
  });
  $(".popup-video").magnificPopup({
    type: "iframe",
    // other options
  });

  if ($(".grid").length != 0) {
    var $grid = $(".grid").imagesLoaded(function () {
      $(".grid").isotope({
        itemSelector: ".grid-item",
        percentPosition: true,
        masonry: {
          columnWidth: 1,
        },
      });

      // filter items on button click
      $(".portfolio-filter").on("click", "button", function () {
        var filterValue = $(this).attr("data-filter");
        $grid.isotope({ filter: filterValue });
      });
      //for filter active class
      $(".portfolio-filter button").on("click", function (event) {
        $(this).siblings(".active").removeClass("active");
        $(this).addClass("active");
        event.preventDefault();
      });
    });
  }
  
  // Swiper for menu
  const menuSlides = document.querySelectorAll(
    ".menu-active .swiper-slide"
  );
  const menuSwiper = new Swiper(".menu-active", {
    spaceBetween: 15,
    loop: menuSlides.length >= 6, // Loop only if more than 5 slides
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 1500,
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: ".menu-swiper-button-next",
      prevEl: ".menu-swiper-button-prev",
    },
    breakpoints: {
      320: { slidesPerView: 2 },
      410: { slidesPerView: 3 },
      576: { slidesPerView: 4 },
      768: { slidesPerView: 5 },
      992: { slidesPerView: 6 },
      1200: { slidesPerView: 7 },
      1400: { slidesPerView: 8 },
    },
  });

  // Swiper for deal
  const dealSlides = document.querySelectorAll(".deal-active .swiper-slide");
  const dealSwiper = new Swiper(".deal-active", {
    spaceBetween: 15,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 1000,
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: ".deal-swiper-button-next",
      prevEl: ".deal-swiper-button-prev",
    },
    breakpoints: {
      320: { slidesPerView: 2 },
      576: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
      1400: { slidesPerView: 5 },
    },
  });

  // Swiper for popular
  const popularSlides = document.querySelectorAll(
    ".popular-active .swiper-slide"
  );
  const popularSwiper = new Swiper(".popular-active", {
    spaceBetween: 15,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 1000,
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: ".popular-swiper-button-next",
      prevEl: ".popular-swiper-button-prev",
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      500: { slidesPerView: 2 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 3 },
      1400: { slidesPerView: 4 },
    },
  });

  // swipper for dishes
  var swiper2 = new Swiper(".dishes-active", {
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,
    speed: 2000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
    },
  });

  // swipper for dishes
  var swiper3 = new Swiper(".client-active", {
    slidesPerView: "auto",
    spaceBetween: 20,
    freemode: true,
    centeredSlides: true,
    loop: true,
    speed: 2000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
    },
  });

  // swipper for gallery
  var swiper = new Swiper(".gallery-active", {
    slidesPerView: "auto",
    spaceBetween: 30,
    freemode: true,
    centeredSlides: true,
    loop: true,
    speed: 3000,
    allowTouchMove: false,
    autoplay: {
      delay: 1,
      disableOnInteraction: true,
    },
  });

  // Swiper for testimonial
  const testimonialSlides = document.querySelectorAll(
    ".testimonial-active .swiper-slide"
  );
  const testimonialSwiper = new Swiper(".testimonial-active", {
    spaceBetween: 15,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    speed: 1000,
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: ".testimonial-swiper-button-next",
      prevEl: ".testimonial-swiper-button-prev",
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      410: { slidesPerView: 1 },
      576: { slidesPerView: 2 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 3 },
      1400: { slidesPerView: 3 },
    },
  });


  // Swiper for testimonial
  const testimonialsSlides = document.querySelectorAll(
    ".testimonial-slider-active .swiper-slide"
  );
  const testimonialsSwiper = new Swiper(".testimonial-slider-active", {
    spaceBetween: 15,
    loop:true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    speed: 1000,
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: ".testimonial-swiper-button-next",
      prevEl: ".testimonial-swiper-button-prev",
    },
    breakpoints: {
      320: { slidesPerView: 1},
      410: { slidesPerView: 1},
      576: { slidesPerView: 1},
      768: { slidesPerView: 1},
      992: { slidesPerView: 1},
      1200: { slidesPerView: 2},
      1400: { slidesPerView: 2},
    },
  });

  // Initialize counter
  const counters = document.querySelectorAll(".counter");
  const startCounting = (counter) => {
    const targetValue = parseInt(counter.textContent, 10);
    let count = 0;
    const duration = 6000;
    const increment = targetValue / (duration / 100);

    const updateCount = () => {
      count = Math.ceil(count + increment);
      counter.textContent = count;

      if (count < targetValue) {
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = targetValue;
      }
    };

    requestAnimationFrame(updateCount);
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          startCounting(counter);
          observer.unobserve(counter); // Stop observing once animation starts
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });

  // blog slider
  const blogSlides = document.querySelectorAll(".blog-active .swiper-slide");
  const blogSwiper = new Swiper(".blog-active", {
    spaceBetween: 15,
    loop: true,
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: ".blog-swiper-button-next",
      prevEl: ".blog-swiper-button-prev",
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      410: { slidesPerView: 1 },
      576: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 3 },
      1400: { slidesPerView: 3 },
    },
  });

  // wow
  function wowAnimation() {
    var wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: false,
      live: true,
    });
    wow.init();
  }

  anime({
    targets: '.discount-dashes path',
    strokeDashoffset: [anime.setDashoffset, 2],
    easing: 'linear',
    duration: 8000,
    loop: true,
  });


})(jQuery);
