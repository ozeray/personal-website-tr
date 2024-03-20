'use strict';

(function tabComponent() {
    const tabContainer = document.querySelector('.services__tab-container');
    const tabs = document.querySelectorAll('.services__tab');
    tabContainer.addEventListener('click', function (evt) {
        const clicked = evt.target.closest('.services__tab');
        if (!clicked) return;

        tabs.forEach(t => t.classList.remove('services__tab--active'))
        clicked.classList.add('services__tab--active');

        const tab = clicked.dataset.tab;
        document.querySelectorAll('.services__content').forEach(c => c.classList.remove('services__content--active'));
        document.querySelector(`.services__content--${tab}`).classList.add('services__content--active');
    });
})();

(function shinyNavBar() {
    const btnScrollTo = document.querySelector('.btn--scroll-to');
    const section1 = document.querySelector('#section--1');
    const header = document.querySelector('.header');

    btnScrollTo.addEventListener('click', function (evt) {
        section1.scrollIntoView({behavior: 'smooth'});
    });

    document.querySelector('.nav__links').addEventListener('click', function (evt) {
        const href = evt.target.getAttribute('href');
        if (!!href && href !== '#' && !href.includes('http')) {
            evt.preventDefault();
            const goTo = document.querySelector(href);
            goTo.scrollIntoView({behavior: 'smooth'});
        }
    });

    const nav = document.querySelector('.nav');
    const handleMouseOver = function (e) {
        if (e.target.classList.contains('nav__link')) {
            const link = e.target;
            const siblings = link.closest('.nav').querySelectorAll('.nav__link');
            const logo = link.closest('.nav').querySelector('img');
            siblings.forEach(s => {
                if (s !== link) s.style.opacity = this;
            });
            logo.style.opacity = this;
        }
    };
    nav.addEventListener('mouseover', handleMouseOver.bind(0.5));
    nav.addEventListener('mouseout', handleMouseOver.bind(1));

    const observerCallback = function (entries, observer) {
        if (entries[0].isIntersecting) {
            nav.classList.remove('sticky');
        } else {
            nav.classList.add('sticky');
        }
    };

    const navHeight = nav.getBoundingClientRect().height;

    const headerObserverOptions = {
        root: null,
        threshold: 0,
        rootMargin: `-${navHeight}px`
    }

    const headerObserver = new IntersectionObserver(observerCallback, headerObserverOptions);
    headerObserver.observe(header);

})();

(function shinySections() {
    const allSections = document.querySelectorAll('section');
    const revealSection = function (entries, observer) {
        const [entry] = entries;
        const section = entry.target;
        if (entry.isIntersecting) {
            section?.classList.remove('section--hidden');
            observer.unobserve(section);
        }
    };

    const sectionObserver = new IntersectionObserver(revealSection, {root: null, threshold: 0, rootMargin: '-30px'});
    allSections.forEach(section => {
        sectionObserver.observe(section);
        section.classList.add('section--hidden');
    });
})();

(function shinyImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const loadImg = function (entries, observer) {
        const [entry] = entries;

        if (!entry.isIntersecting) return;

        const img = entry.target;
        img.src = img.dataset.src;
        img.addEventListener('load', function () {
            img.classList.remove('lazy-img');
        });
        observer.unobserve(img);
    };

    const imgObserver = new IntersectionObserver(loadImg, {root: null, threshold: 0, rootMargin: '500px'});
    lazyImages.forEach(img => imgObserver.observe(img));
})();

(function sliderComponent() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dotContainer = document.querySelector('.dots');
    const sliderBtnLeft = document.querySelector('.slider__btn--left');
    const sliderBtnRight = document.querySelector('.slider__btn--right');

    const createDots = function () {
        slides.forEach((_, index) => {
            dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${index}"></button>`);
        });
    };
    createDots();

    const activateDot = function (slide) {
        dotContainer.childNodes.forEach(dot => dot.classList.remove('dots__dot--active'));
        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
    };
    const goToSlide = function (slide) {
        slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
        activateDot(slide);
    }
    goToSlide(currentSlide);

    dotContainer.addEventListener('click', function (e) {
        const {slide} = e.target.dataset;
        goToSlide(Number(slide));
    });

    const goToPrevSlide = function () {
        currentSlide--;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        goToSlide(currentSlide);
    };
    sliderBtnLeft.addEventListener('click', goToPrevSlide);

    const goToNextSlide = function () {
        currentSlide++;
        if (currentSlide > slides.length - 1) currentSlide = 0;
        goToSlide(currentSlide);
    };
    sliderBtnRight.addEventListener('click', goToNextSlide);
    document.addEventListener('keydown', function (evt) {
        if (evt.key === 'ArrowRight') goToNextSlide();
        evt.key === 'ArrowLeft' && goToPrevSlide();
    });
})();












