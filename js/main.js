// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Parallax effect
const parallaxBg = document.querySelector('.parallax-bg');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Parallax effect for advantages section
const parallaxAdvantages = document.querySelector('.parallax-advantages');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (parallaxAdvantages) {
        parallaxAdvantages.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Mobile menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        body.style.overflow = '';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Objects data
const objects = [
    {
        id: 1,
        title: 'Преміальна квартира в центрі',
        price: '15 000 000 ₴',
        type: 'apartment',
        district: 'center',
        image: 'images/object1.jpg',
        description: 'Простора квартира з панорамними вікнами та сучасним ремонтом'
    },
    {
        id: 2,
        title: 'Заміський будинок',
        price: '45 000 000 ₴',
        type: 'house',
        district: 'suburbs',
        image: 'images/object2.jpg',
        description: 'Затишний будинок з великою ділянкою та сучасними комунікаціями'
    },
    {
        id: 3,
        title: 'Вілла на узбережжі',
        price: '120 000 000 ₴',
        type: 'villa',
        district: 'beach',
        image: 'images/object3.jpg',
        description: 'Розкішна вілла з приватним пляжем та інфраструктурою'
    }
];

// Render objects with animation
function renderObjects(filteredObjects = objects) {
    const objectsGrid = document.querySelector('.objects-grid');
    objectsGrid.innerHTML = '';

    filteredObjects.forEach((object, index) => {
        const objectCard = document.createElement('div');
        objectCard.className = 'object-card';
        objectCard.style.animation = `scaleIn 0.6s ease-out ${index * 0.2}s forwards`;
        objectCard.style.opacity = '0';
        objectCard.innerHTML = `
            <img src="${object.image}" alt="${object.title}">
            <div class="object-info">
                <h3>${object.title}</h3>
                <p class="price">${object.price}</p>
                <p class="description">${object.description}</p>
            </div>
        `;
        objectsGrid.appendChild(objectCard);
    });
}

// Filter objects
const priceFilter = document.getElementById('price-filter');
const typeFilter = document.getElementById('type-filter');
const districtFilter = document.getElementById('district-filter');

function filterObjects() {
    let filteredObjects = objects;

    // Price filter
    if (priceFilter.value) {
        const [min, max] = priceFilter.value.split('-').map(Number);
        filteredObjects = filteredObjects.filter(object => {
            const price = parseInt(object.price.replace(/[^0-9]/g, ''));
            if (max) {
                return price >= min && price <= max;
            }
            return price >= min;
        });
    }

    // Type filter
    if (typeFilter.value) {
        filteredObjects = filteredObjects.filter(object => object.type === typeFilter.value);
    }

    // District filter
    if (districtFilter.value) {
        filteredObjects = filteredObjects.filter(object => object.district === districtFilter.value);
    }

    renderObjects(filteredObjects);
}

priceFilter.addEventListener('change', filterObjects);
typeFilter.addEventListener('change', filterObjects);
districtFilter.addEventListener('change', filterObjects);

// Initialize objects
renderObjects();

// Form submission with animation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitButton = contactForm.querySelector('.submit-button');
    submitButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        submitButton.style.transform = 'scale(1)';
        alert('Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом.');
        contactForm.reset();
    }, 200);
});

// Google Maps initialization with custom style
function initMap() {
    const mapOptions = {
        center: { lat: 50.4501, lng: 30.5234 }, // Kyiv coordinates
        zoom: 15,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{"color": "#1a1a1a"}]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#FFD700"}]
            }
        ]
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const marker = new google.maps.Marker({
        position: { lat: 50.4501, lng: 30.5234 },
        map: map,
        title: 'Pride Agency'
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .object-card, .service-card, .review-card').forEach(element => {
    observer.observe(element);
});

// Statistics counter animation
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateNumber = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target;
            }
        };

        updateNumber();
    });
}

// Intersection Observer for statistics section
const statsSection = document.querySelector('.statistics');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
} 