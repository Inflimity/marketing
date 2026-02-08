document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-brand-navy/90', 'backdrop-blur-md', 'shadow-lg');
            navbar.classList.remove('bg-transparent', 'py-6');
            navbar.classList.add('py-4');
        } else {
            navbar.classList.remove('bg-brand-navy/90', 'backdrop-blur-md', 'shadow-lg', 'py-4');
            navbar.classList.add('bg-transparent', 'py-6');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    function toggleMenu() {
        mobileMenu.classList.toggle('translate-x-full');
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Number Counters
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 10); // Smoother increment

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.1, // Reduced threshold for better reliability
        rootMargin: '0px 0px -50px 0px'
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    // Hero Carousel
    const heroImage = document.getElementById('hero-image');
    if (heroImage) {
        const images = [
            "https://images.unsplash.com/photo-1600596542815-600021419280?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1653&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
        ];

        let currentIndex = 0;

        function changeImage() {
            heroImage.style.opacity = '0';

            setTimeout(() => {
                currentIndex = (currentIndex + 1) % images.length;
                heroImage.src = images[currentIndex];
                // Ensure opacity returns to 1 after image loads or immediately if cached
                heroImage.onload = () => {
                    heroImage.style.opacity = '1';
                };
                // Fallback in case onload doesn't fire (cached)
                setTimeout(() => {
                    heroImage.style.opacity = '1';
                }, 50);
            }, 1000); // Wait for fade out (matches CSS transition duration)
        }

        setInterval(changeImage, 5000); // Change every 5 seconds
    }
});
