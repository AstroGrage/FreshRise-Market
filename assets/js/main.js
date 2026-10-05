(function ($) {
    "use strict";

    $(document).ready(function($){

        if (!$('body').hasClass('experience-site')) {
        
        // testimonial sliders
        $(".testimonial-sliders").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:1,
                    nav:false
                },
                1000:{
                    items:1,
                    nav:false,
                    loop:true
                }
            }
        });

        // homepage slider
        $(".homepage-slider").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            nav: true,
            dots: false,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            responsive:{
                0:{
                    items:1,
                    nav:false,
                    loop:true
                },
                600:{
                    items:1,
                    nav:true,
                    loop:true
                },
                1000:{
                    items:1,
                    nav:true,
                    loop:true
                }
            }
        });

        // logo carousel
        $(".logo-carousel-inner").owlCarousel({
            items: 4,
            loop: true,
            autoplay: true,
            margin: 30,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:3,
                    nav:false
                },
                1000:{
                    items:4,
                    nav:false,
                    loop:true
                }
            }
        });

        // count down
        if($('.time-countdown').length){  
            $('.time-countdown').each(function() {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function(event) {
                var $this = $(this).html(event.strftime('' + '<div class="counter-column"><div class="inner"><span class="count">%D</span>Days</div></div> ' + '<div class="counter-column"><div class="inner"><span class="count">%H</span>Hours</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%M</span>Mins</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%S</span>Secs</div></div>'));
            });
         });
        }

        // projects filters isotop
        $(".product-filters li").on('click', function () {
            
            $(".product-filters li").removeClass("active");
            $(this).addClass("active");

            var selector = $(this).attr('data-filter');

            $(".product-lists").isotope({
                filter: selector,
            });
            
        });
        
        // isotop inner
        $(".product-lists").isotope();

        // magnific popup
        $('.popup-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        // light box
        $('.image-popup-vertical-fit').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-img-mobile',
            image: {
                verticalFit: true
            }
        });

        // homepage slides animations
        $(".homepage-slider").on("translate.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").removeClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

        $(".homepage-slider").on("translated.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").addClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

       

        // stikcy js
        $("#sticker").sticky({
            topSpacing: 0
        });

        //mean menu
        $('.main-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "992"
        });
        
         // search form
        $(".search-bar-icon").on("click", function(){
            $(".search-area").addClass("search-active");
        });

        $(".close-btn").on("click", function() {
            $(".search-area").removeClass("search-active");
        });
        }

        // Project navigation drawer
        var sidebar = $(".experience-sidebar");
        var sidebarToggles = $(".experience-menu-toggle");
        var sidebarOpen = false;
        var previousFocus = null;

        function closeExperienceSidebar(restoreFocus) {
            if (!sidebar.length) {
                return;
            }

            sidebarOpen = false;
            $("body").removeClass("experience-sidebar-open");
            sidebar.attr("aria-hidden", "true");
            $(".experience-backdrop").attr("aria-hidden", "true");
            sidebarToggles.attr("aria-expanded", "false");

            if (restoreFocus !== false && previousFocus) {
                previousFocus.focus();
            }
        }

        sidebarToggles.on("click", function() {
            previousFocus = this;
            sidebarOpen = true;
            $("body").addClass("experience-sidebar-open");
            sidebar.attr("aria-hidden", "false").trigger("focus");
            $(".experience-backdrop").attr("aria-hidden", "false");
            sidebarToggles.attr("aria-expanded", "true");
            sidebar.find("a").first().trigger("focus");
        });

        $(".experience-sidebar-close, .experience-backdrop").on("click", function() {
            closeExperienceSidebar();
        });

        $(".experience-sidebar-links a").on("click", function() {
            closeExperienceSidebar();
        });

        $(document).on("keydown", function(event) {
            if (!sidebarOpen) {
                return;
            }

            if (event.key === "Escape") {
                closeExperienceSidebar();
                return;
            }

            if (event.key === "Tab") {
                var focusableItems = sidebar.find("a, button").filter(":visible");
                var firstItem = focusableItems.first()[0];
                var lastItem = focusableItems.last()[0];

                if (event.shiftKey && document.activeElement === firstItem) {
                    event.preventDefault();
                    lastItem.focus();
                } else if (!event.shiftKey && document.activeElement === lastItem) {
                    event.preventDefault();
                    firstItem.focus();
                }
            }
        });

        // Keep the visible section reflected in both navigation views.
        var navigationLinks = $(".experience-nav a, .experience-sidebar-links a");
        var observedSections = $(".experience-main section[id]");

        function setActiveSection(sectionId) {
            navigationLinks.each(function() {
                var isActive = $(this).attr("href") === "#" + sectionId;
                $(this).toggleClass("is-active", isActive);

                if (isActive) {
                    $(this).attr("aria-current", "location");
                } else {
                    $(this).removeAttr("aria-current");
                }
            });
        }

        if ("IntersectionObserver" in window && observedSections.length) {
            var sectionObserver = new IntersectionObserver(function(entries) {
                var visibleSections = entries.filter(function(entry) {
                    return entry.isIntersecting;
                }).sort(function(first, second) {
                    return first.boundingClientRect.top - second.boundingClientRect.top;
                });

                if (visibleSections.length) {
                    setActiveSection(visibleSections[0].target.id);
                }
            }, { rootMargin: "-90px 0px -70% 0px" });

            observedSections.each(function() {
                sectionObserver.observe(this);
            });
        }

        // Shared store-page navigation drawer
        var storeSidebar = $("#site-sidebar");
        var storeSidebarToggles = $(".global-sidebar-toggle");
        var storeSidebarOpen = false;
        var storePreviousFocus = null;

        function closeStoreSidebar(restoreFocus) {
            if (!storeSidebar.length) {
                return;
            }

            storeSidebarOpen = false;
            $("body").removeClass("sidebar-open");
            storeSidebar.attr("aria-hidden", "true");
            $(".sidebar-backdrop").attr("aria-hidden", "true");
            storeSidebarToggles.attr("aria-expanded", "false");

            if (restoreFocus !== false && storePreviousFocus) {
                storePreviousFocus.focus();
            }
        }

        storeSidebarToggles.on("click", function() {
            storePreviousFocus = this;
            storeSidebarOpen = true;
            $("body").addClass("sidebar-open");
            storeSidebar.attr("aria-hidden", "false");
            $(".sidebar-backdrop").attr("aria-hidden", "false");
            storeSidebarToggles.attr("aria-expanded", "true");
            storeSidebar.find("a").first().trigger("focus");
        });

        $(".sidebar-close, .sidebar-backdrop").on("click", function() {
            closeStoreSidebar();
        });

        $(".site-sidebar-links a").on("click", function() {
            closeStoreSidebar();
        });

        $(document).on("keydown", function(event) {
            if (!storeSidebarOpen) {
                return;
            }

            if (event.key === "Escape") {
                closeStoreSidebar();
                return;
            }

            if (event.key === "Tab") {
                var storeFocusableItems = storeSidebar.find("a, button").filter(":visible");
                var firstStoreItem = storeFocusableItems.first()[0];
                var lastStoreItem = storeFocusableItems.last()[0];

                if (event.shiftKey && document.activeElement === firstStoreItem) {
                    event.preventDefault();
                    lastStoreItem.focus();
                } else if (!event.shiftKey && document.activeElement === lastStoreItem) {
                    event.preventDefault();
                    firstStoreItem.focus();
                }
            }
        });
    
    });


    jQuery(document).ready(function(){
        jQuery(".loader").fadeOut(1000);
    });


}(jQuery));