// success-stories.js
class SuccessStories {
  constructor() {
    this.stories = [];
    this.currentStoryId = null;
    this.currentImageIndex = 0;
    this.init();
  }

  init() {
    this.loadStories();
    this.bindEvents();
  }

  loadStories() {
    // В реальном приложении здесь будет AJAX запрос
    this.stories = [
      {
        id: 1,
        title: "Модернизация IT-инфраструктуры для крупной сети",
        date: "15.12.2024",
        category: "Digital трансформация",
        excerpt: "Повышение эффективности бизнес-процессов на 40% благодаря внедрению современных решений...",
        stats: {
          efficiency: "+40%",
          duration: "6 мес.",
          budget: "Конфиденциально",
        },
        content: {
          sections: [
            {
              type: "text",
              content: "Мы реализовали комплексную модернизацию IT-инфраструктуры для крупной розничной сети с более чем 200 точками по всей стране.",
            },
            {
              type: "subtitle",
              content: "Задача",
            },
            {
              type: "text",
              content: "Клиент столкнулся с проблемами масштабируемости существующей системы, низкой производительностью и высокими затратами на поддержку устаревшего оборудования.",
            },
            {
              type: "subtitle",
              content: "Решение",
            },
            {
              type: "text",
              content: "Наша команда разработала и внедрила облачную гибридную инфраструктуру с использованием современных технологий виртуализации и контейнеризации.",
            },
            {
              type: "gallery",
              images: ["assets/images/success-1-1.jpg", "assets/images/success-1-2.jpg", "assets/images/success-1-3.jpg"],
            },
          ],
        },
      },
      {
        id: 2,
        title: "Разработка платформы для онлайн-образования",
        date: "10.11.2024",
        category: "Веб-разработка",
        excerpt: "Создание масштабируемой образовательной экосистемы с поддержкой 50,000+ пользователей...",
        stats: {
          users: "50K+",
          duration: "4 мес.",
          performance: "+60%",
        },
        content: {
          sections: [
            {
              type: "text",
              content: "Разработка комплексной платформы для онлайн-обучения с поддержкой видео-трансляций, интерактивных заданий и системы прогресса.",
            },
          ],
        },
      },
    ];
  }

  bindEvents() {
    // Клик по карточке
    document.addEventListener("click", (e) => {
      const card = e.target.closest(".story-card");
      if (card) {
        const storyId = parseInt(card.dataset.id);
        this.openStory(storyId);
      }
    });

    // Кнопка "Назад"
    document.getElementById("back-to-stories")?.addEventListener("click", () => {
      this.closeStory();
    });

    // Навигация между историями
    document.getElementById("prev-story")?.addEventListener("click", () => {
      this.navigateToPrev();
    });

    document.getElementById("next-story")?.addEventListener("click", () => {
      this.navigateToNext();
    });

    // Кнопка "Хочу так же"
    document.getElementById("want-same")?.addEventListener("click", () => {
      this.handleWantSame();
    });
  }

  openStory(storyId) {
    const story = this.stories.find((s) => s.id === storyId);
    if (!story) return;

    this.currentStoryId = storyId;
    this.renderStory(story);

    document.querySelector(".success-stories").style.display = "none";
    document.getElementById("success-story-page").style.display = "block";

    this.updateNavigation();
  }

  closeStory() {
    document.querySelector(".success-stories").style.display = "block";
    document.getElementById("success-story-page").style.display = "none";
    this.currentStoryId = null;
  }

  renderStory(story) {
    const container = document.getElementById("story-detail");

    container.innerHTML = `
      <div class="story-hero">
        <h1 class="story-hero__title">${story.title}</h1>
        <div class="story-hero__meta">
          <span>Завершен: ${story.date}</span>
          <span>Категория: ${story.category}</span>
        </div>
      </div>

      <div class="story-content">
        ${this.renderSections(story.content.sections)}
      </div>

      ${this.renderStats(story.stats)}
    `;

    this.bindGalleryEvents();
  }

  renderSections(sections) {
    return sections
      .map((section) => {
        switch (section.type) {
          case "text":
            return `<p>${section.content}</p>`;
          case "subtitle":
            return `<h2>${section.content}</h2>`;
          case "gallery":
            return this.renderGallery(section.images);
          default:
            return "";
        }
      })
      .join("");
  }

  renderGallery(images) {
    return `
      <div class="story-gallery">
        <h3>Галерея проекта</h3>
        <div class="story-gallery__grid">
          ${images
            .map(
              (img, index) => `
            <div class="story-gallery__item" data-index="${index}">
              <img src="${img}" alt="Фото проекта" />
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  renderStats(stats) {
    const statsHTML = Object.entries(stats)
      .map(
        ([key, value]) => `
      <div class="stat">
        <span class="stat__value">${value}</span>
        <span class="stat__label">${this.getStatLabel(key)}</span>
      </div>
    `
      )
      .join("");

    return `
      <div class="story-stats">
        <div class="story-stats__grid">
          ${statsHTML}
        </div>
      </div>
    `;
  }

  getStatLabel(key) {
    const labels = {
      efficiency: "Рост эффективности",
      duration: "Срок реализации",
      budget: "Бюджет",
      users: "Пользователей",
      performance: "Производительность",
    };
    return labels[key] || key;
  }

  bindGalleryEvents() {
    document.querySelectorAll(".story-gallery__item").forEach((item) => {
      item.addEventListener("click", () => {
        const index = parseInt(item.dataset.index);
        this.openGallery(index);
      });
    });
  }

  openGallery(startIndex) {
    // Реализация модального окна галереи
    console.log("Open gallery at index:", startIndex);
  }

  navigateToPrev() {
    if (!this.currentStoryId) return;

    const currentIndex = this.stories.findIndex((s) => s.id === this.currentStoryId);
    const prevIndex = (currentIndex - 1 + this.stories.length) % this.stories.length;
    this.openStory(this.stories[prevIndex].id);
  }

  navigateToNext() {
    if (!this.currentStoryId) return;

    const currentIndex = this.stories.findIndex((s) => s.id === this.currentStoryId);
    const nextIndex = (currentIndex + 1) % this.stories.length;
    this.openStory(this.stories[nextIndex].id);
  }

  updateNavigation() {
    const currentIndex = this.stories.findIndex((s) => s.id === this.currentStoryId);
    const prevButton = document.getElementById("prev-story");
    const nextButton = document.getElementById("next-story");

    if (prevButton) {
      prevButton.disabled = this.stories.length <= 1;
    }
    if (nextButton) {
      nextButton.disabled = this.stories.length <= 1;
    }
  }

  handleWantSame() {
    // Логика для кнопки "Хочу так же"
    alert("Спасибо за интерес! Наш менеджер свяжется с вами для обсуждения вашего проекта.");
    // Здесь может быть redirect на страницу контактов или открытие формы
  }
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  new SuccessStories();
});
