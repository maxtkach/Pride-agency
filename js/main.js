// Preloader
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after page load
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1500);
});

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Parallax effect with improved smoothness
const parallaxBg = document.querySelector('.parallax-bg');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${scrolled * 0.5}px) scale(${1 + scrolled * 0.0001})`;
    }
});

// Parallax effect for advantages section with enhanced depth
const parallaxAdvantages = document.querySelector('.parallax-advantages');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (parallaxAdvantages) {
        const yPos = Math.max(0, scrolled - parallaxAdvantages.offsetTop + window.innerHeight);
        parallaxAdvantages.style.transform = `translateY(${yPos * 0.3}px) scale(${1 + yPos * 0.0002})`;
        parallaxAdvantages.style.filter = `brightness(${0.8 + yPos * 0.0005})`;
    }
});

// Mouse-follow effect for hero section
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Create a subtle movement effect based on mouse position
        heroContent.style.transform = `translate(${(x - 0.5) * 20}px, ${(y - 0.5) * 10}px)`;
    });
}

// Mobile menu with improved animation
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

// Enhanced smooth scroll for navigation links with callback
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Highlight the active navigation item
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            // Scroll to the target with enhanced smoothness
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL hash without scrolling
            history.pushState(null, null, targetId);
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

// Render objects with enhanced animation
function renderObjects(filteredObjects = objects) {
    const objectsGrid = document.querySelector('.objects-grid');
    objectsGrid.innerHTML = '';
    
    // Данные о недвижимости для модального окна
    const properties = [
        {
            id: 1,
            title: 'Елітна квартира в центрі',
            location: 'вул. Хрещатик, Київ',
            price: '$250,000',
            area: '120 м²',
            bedrooms: '3 спальні',
            bathrooms: '2 ванні',
            description: 'Розкішна квартира з сучасним ремонтом та панорамними вікнами. Розташована в самому центрі міста, поруч з усіма важливими об\'єктами інфраструктури. Квартира повністю мебльована та готова до заселення.',
            image: 'images/object1.jpg'
        },
        {
            id: 2,
            title: 'Заміський будинок',
            location: 'c. Петропавлівська Борщагівка',
            price: '$350,000',
            area: '220 м²',
            bedrooms: '4 спальні',
            bathrooms: '3 ванні',
            description: 'Просторий будинок для всієї родини з власною територією та садом. Тут ви зможете насолоджуватися тишею та спокоєм, знаходячись всього в 15 хвилинах від міста.',
            image: 'images/object2.jpg'
        },
        {
            id: 3,
            title: 'Квартира з видом на море',
            location: 'вул. Приморська, Одеса',
            price: '$180,000',
            area: '85 м²',
            bedrooms: '2 спальні',
            bathrooms: '1 ванна',
            description: 'Затишна квартира з чудовим видом на море. Розташована в новобудові з власною територією та цілодобовою охороною. Ідеальний варіант для тих, хто мріє жити у моря.',
            image: 'images/object3.jpg'
        }
    ];

    filteredObjects.forEach((object, index) => {
        const objectCard = document.createElement('div');
        objectCard.className = 'object-card';
        objectCard.style.animation = `scaleIn 0.6s ease-out ${index * 0.2}s forwards`;
        objectCard.style.opacity = '0';
        
        // Создаем карточку с информацией сразу видимой
        objectCard.innerHTML = `
            <img src="${object.image}" alt="${object.title}">
            <div class="object-info">
                <h3>${object.title}</h3>
                <p class="price">${object.price}</p>
                <p class="description">${object.description}</p>
                <button type="button" class="details-button" data-index="${index}">Детальніше</button>
            </div>
        `;
        
        objectsGrid.appendChild(objectCard);
    });
    
    // Add click event for details buttons
    document.querySelectorAll('.details-button').forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const propertyModal = document.getElementById('property-modal');
            
            // Получаем данные о выбранной недвижимости
            const propIndex = parseInt(button.getAttribute('data-index'));
            const property = properties[propIndex] || filteredObjects[propIndex];
            
            // Заполняем модальное окно данными
            document.getElementById('modal-property-title').textContent = property.title;
            document.getElementById('modal-property-location').textContent = property.location || 'Київ, Україна';
            document.getElementById('modal-property-price').textContent = property.price;
            document.getElementById('modal-property-area').textContent = property.area || '100 м²';
            document.getElementById('modal-property-bedrooms').textContent = property.bedrooms || '2 спальні';
            document.getElementById('modal-property-bathrooms').textContent = property.bathrooms || '1 ванна';
            document.getElementById('modal-property-description').textContent = property.description;
            document.getElementById('modal-property-image').src = property.image;
            
            // Открываем модальное окно
            propertyModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
}

// Create modal for object details
function showObjectModal(object) {
    // Remove any existing modal
    const existingModal = document.querySelector('.object-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create new modal
    const modal = document.createElement('div');
    modal.className = 'object-modal';
    modal.innerHTML = `
        <div class="object-modal-content">
            <span class="close-modal">&times;</span>
            <div class="object-modal-gallery">
                <img src="${object.image}" alt="${object.title}" class="main-image">
            </div>
            <div class="object-modal-info">
                <h2>${object.title}</h2>
                <p class="modal-price">${object.price}</p>
                <p class="modal-description">${object.description}</p>
                <div class="object-features">
                    <div class="feature">
                        <i class="fas fa-ruler-combined"></i>
                        <span>240 м²</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-bed"></i>
                        <span>3 спальні</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-bath"></i>
                        <span>2 ванні</span>
                    </div>
                </div>
                <button class="cta-button modal-cta">Забронювати перегляд</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Animation for modal opening
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    });
    
    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    });
}

// Filter objects with animation
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

    // Animate filtering transition
    const objectsGrid = document.querySelector('.objects-grid');
    objectsGrid.style.opacity = '0';
    objectsGrid.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        renderObjects(filteredObjects);
        objectsGrid.style.opacity = '1';
        objectsGrid.style.transform = 'translateY(0)';
    }, 300);
}

priceFilter.addEventListener('change', filterObjects);
typeFilter.addEventListener('change', filterObjects);
districtFilter.addEventListener('change', filterObjects);

// Initialize objects
renderObjects();

// Reviews carousel
const reviewDots = document.querySelectorAll('.review-dots .dot');
const reviewCards = document.querySelectorAll('.review-card');
const prevReviewBtn = document.querySelector('.prev-review');
const nextReviewBtn = document.querySelector('.next-review');
let currentReviewIndex = 0;

function showReview(index) {
    // Hide all reviews
    reviewCards.forEach(card => {
        card.classList.remove('active');
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
    });
    
    // Deactivate all dots
    reviewDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show active review
    reviewCards[index].classList.add('active');
    reviewCards[index].style.opacity = '1';
    reviewCards[index].style.transform = 'scale(1)';
    
    // Activate current dot
    reviewDots[index].classList.add('active');
    
    currentReviewIndex = index;
}

// Dot navigation
reviewDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showReview(index);
    });
});

// Arrow navigation
prevReviewBtn.addEventListener('click', () => {
    let newIndex = currentReviewIndex - 1;
    if (newIndex < 0) newIndex = reviewCards.length - 1;
    showReview(newIndex);
});

nextReviewBtn.addEventListener('click', () => {
    let newIndex = currentReviewIndex + 1;
    if (newIndex >= reviewCards.length) newIndex = 0;
    showReview(newIndex);
});

// Auto rotate reviews
setInterval(() => {
    let newIndex = currentReviewIndex + 1;
    if (newIndex >= reviewCards.length) newIndex = 0;
    showReview(newIndex);
}, 5000);

// Form submission with enhanced animation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitButton = contactForm.querySelector('.submit-button');
    
    // Create flash animation
    submitButton.classList.add('button-flash');
    
    setTimeout(() => {
        submitButton.classList.remove('button-flash');
        
        // Create loading animation
        submitButton.innerHTML = `<span class="loading-spinner"></span> Надсилання...`;
        
        // Simulate form submission delay
        setTimeout(() => {
            // Success animation
            submitButton.innerHTML = `<i class="fas fa-check"></i> Надіслано!`;
            submitButton.classList.add('success');
            
            // Show success message with animation
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Дякуємо за ваше повідомлення! Ми зв'яжемося з вами найближчим часом.</p>
            `;
            
            contactForm.appendChild(successMessage);
            
            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
                successMessage.classList.add('hide');
                submitButton.innerHTML = `Надіслати`;
                submitButton.classList.remove('success');
                
                setTimeout(() => {
                    successMessage.remove();
                }, 500);
            }, 3000);
        }, 1500);
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
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{"color": "#333333"}]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{"color": "#2a2a2a"}]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{"color": "#2a2a2a"}]
            }
        ]
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    // Custom marker with animation
    const marker = new google.maps.Marker({
        position: { lat: 50.4501, lng: 30.5234 },
        map: map,
        title: 'Pride Agency',
        animation: google.maps.Animation.DROP,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#FFD700",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#FFFFFF"
        }
    });
    
    // Pulsating effect for marker
    let scale = 10;
    let growing = true;
    
    setInterval(() => {
        if (growing) {
            scale += 0.2;
            if (scale >= 12) growing = false;
        } else {
            scale -= 0.2;
            if (scale <= 10) growing = true;
        }
        
        marker.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            scale: scale,
            fillColor: "#FFD700",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#FFFFFF"
        });
    }, 50);
}

// Enhanced Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add different animations based on element type
            const element = entry.target;
            
            if (element.classList.contains('object-card')) {
                element.classList.add('fade-in-up');
            } else if (element.classList.contains('service-card')) {
                element.classList.add('fade-in-right');
            } else if (element.classList.contains('review-card')) {
                element.classList.add('fade-in-left');
            } else {
                element.classList.add('fade-in');
            }
            
            observer.unobserve(element);
        }
    });
}, observerOptions);

// Observe all sections and cards with enhanced animations
document.querySelectorAll('section, .object-card, .service-card, .review-card, .value-item, .advantage-item').forEach(element => {
    observer.observe(element);
});

// Statistics counter animation with improved numeric formatting
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const formatNumber = (num) => {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        };

        const updateNumber = () => {
            current += step;
            if (current < target) {
                stat.textContent = formatNumber(Math.floor(current));
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = formatNumber(target);
                stat.classList.add('completed');
            }
        };

        updateNumber();
    });
}

// Intersection Observer for statistics section with enhanced trigger
const statsSection = document.querySelector('.statistics');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Stagger the animation of each stat item
            const statItems = document.querySelectorAll('.stat-item');
            statItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('active');
                }, index * 200);
            });
            
            // Start counting animation after slight delay
            setTimeout(animateNumbers, 500);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax scroll effect for multiple elements - исключаем элементы контактов
document.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax-element:not(.contact-item)');
    const scrollPosition = window.pageYOffset;
    
    parallaxElements.forEach(element => {
        // Пропускаем элементы контактов
        if (element.closest('.contacts')) {
            return;
        }
        
        const speed = element.getAttribute('data-speed') || 0.5;
        const offset = element.getBoundingClientRect().top + scrollPosition;
        const yPos = (scrollPosition - offset) * speed;
        
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Отключаем кастомный курсор
// Animated cursor effect
document.addEventListener('DOMContentLoaded', () => {
    // Полностью отключаем кастомный курсор
    /* 
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorInner = document.createElement('div');
    cursorInner.className = 'custom-cursor-inner';
    document.body.appendChild(cursorInner);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    // Enlarge cursor when hovering clickable elements
    document.querySelectorAll('a, button, input, textarea, .object-card, .service-card').forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-active');
            cursorInner.classList.add('cursor-inner-active');
        });
        
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-active');
            cursorInner.classList.remove('cursor-inner-active');
        });
    });
    */
});

// Add tilt effect to cards
document.querySelectorAll('.object-card, .service-card, .review-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const rotateX = (cardCenterY - mouseY) / 15;
        const rotateY = (mouseX - cardCenterX) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Модальное окно для недвижимости
document.addEventListener('DOMContentLoaded', () => {
    const propertyModal = document.getElementById('property-modal');
    const modalClose = document.getElementById('modal-close');
    
    // Закрытие модального окна
    modalClose.addEventListener('click', () => {
        propertyModal.classList.remove('active');
        document.body.style.overflow = ''; // Разрешаем прокрутку страницы
    });
    
    // Закрытие модального окна при клике вне его содержимого
    propertyModal.addEventListener('click', (e) => {
        if (e.target === propertyModal) {
            propertyModal.classList.remove('active');
            document.body.style.overflow = ''; // Разрешаем прокрутку страницы
        }
    });
    
    // Закрытие модального окна по клавише Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && propertyModal.classList.contains('active')) {
            propertyModal.classList.remove('active');
            document.body.style.overflow = ''; // Разрешаем прокрутку страницы
        }
    });
    
    // Закрытие модального окна при клике на кнопку связи
    document.getElementById('modal-contact-btn').addEventListener('click', () => {
        propertyModal.classList.remove('active');
        document.body.style.overflow = ''; // Разрешаем прокрутку страницы
    });
});

// Модальные окна для услуг
document.addEventListener('DOMContentLoaded', () => {
    // Находим все ссылки на услуги
    const serviceLinks = document.querySelectorAll('.service-link');
    
    // Добавляем обработчики для открытия модальных окон
    serviceLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = `service-modal-${index + 1}`;
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Запрещаем прокрутку страницы
            }
        });
    });
    
    // Закрытие модальных окон услуг
    const closeButtons = document.querySelectorAll('.service-modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Возвращаем прокрутку страницы
        });
    });
    
    // Закрытие модальных окон при клике вне содержимого
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Возвращаем прокрутку страницы
            }
        });
    });
    
    // Закрытие модального окна по клавише Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = ''; // Возвращаем прокрутку страницы
            }
        }
    });
    
    // Закрытие модальных окон при клике на кнопки связи
    document.querySelectorAll('.service-contact-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Возвращаем прокрутку страницы
        });
    });
}); 