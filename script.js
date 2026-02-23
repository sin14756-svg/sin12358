/* ============================================= */
/* VERSION 2 — script.js                          */
/* ============================================= */

document.addEventListener('DOMContentLoaded', function () {

    // ============================================= 
    // 1. STICKY HEADER
    // ============================================= 
    const header = document.getElementById('header');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ============================================= 
    // 2. MOBILE MENU
    // ============================================= 
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ============================================= 
    // 3. ACTIVE NAV HIGHLIGHT
    // ============================================= 
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        const scrollPos = window.scrollY + 100;
        sections.forEach(function (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) link.classList.add('active');
                });
            }
        });
    }
    window.addEventListener('scroll', highlightNavLink);

    // ============================================= 
    // 4. SCROLL ANIMATIONS (Intersection Observer)
    // ============================================= 
    const animEls = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, i) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.classList.add('visible');
                }, i * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });

    animEls.forEach(function (el) { observer.observe(el); });

    // ============================================= 
    // 5. SMOOTH SCROLL
    // ============================================= 
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================= 
    // 6. SWEEP BANNERS — re-animate on scroll
    //    เมื่อ section ปรากฏ banner จะโฉบออกมา
    // ============================================= 
    var bannerSections = document.querySelectorAll('.services, .products, .knowledge, .contact, .about');

    var bannerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var banners = entry.target.querySelectorAll('.section-banner');
                banners.forEach(function (b) {
                    // Reset animation
                    b.style.animation = 'none';
                    b.offsetHeight; // trigger reflow
                    b.style.animation = '';
                });
            }
        });
    }, { threshold: 0.15 });

    bannerSections.forEach(function (sec) { bannerObserver.observe(sec); });

    // ============================================= 
    // 7. PARALLAX
    // ============================================= 
    function parallax() {
        var scrolled = window.scrollY;
        var heroBg = document.querySelector('.hero-bg');
        if (heroBg) heroBg.style.transform = 'translateY(' + (scrolled * 0.2) + 'px)';
    }
    window.addEventListener('scroll', parallax);

    // ============================================= 
    // 8. CONTACT FORM
    // ============================================= 
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            var txt = btn.textContent;
            btn.textContent = '✓ ส่งข้อความเรียบร้อยแล้ว!';
            btn.style.background = 'linear-gradient(135deg, #0a6b2a 0%, #2ed660 100%)';
            btn.disabled = true;
            setTimeout(function () {
                form.reset();
                btn.textContent = txt;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        });
    }

});
