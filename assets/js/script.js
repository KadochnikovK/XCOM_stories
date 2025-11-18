// Общие функции для всех страниц
class MainApp {
    constructor() {
        this.init();
    }

    init() {
        this.initGallery();
        this.initSmoothScroll();
    }

    initGallery() {
        // Инициализация галереи изображений
        const galleryItems = document.querySelectorAll('.story-gallery__item');
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openGallery(index);
            });
        });
    }

    openGallery(startIndex) {
        // Реализация модального окна галереи
        // Можно использовать существующую логику из success-stories.js
        console.log('Open gallery at index:', startIndex);
    }

    initSmoothScroll() {
        // Плавная прокрутка для якорей
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
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new MainApp();
});