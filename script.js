/* =========================================================
   Резюме — Шаповалов Тарас
   Лабораторна робота №4, частина 1: JavaScript.

   Зміст файлу:
     1. Налаштування
     2. Тема день/ніч (запускається одразу, до малювання сторінки)
     3. Системна інформація → localStorage → футер
     4. Відгуки роботодавців (Fetch API)
     5. Модальне вікно зворотного зв'язку
     6. Запуск після завантаження DOM
   ========================================================= */


/* ---------- 1. Налаштування ---------- */

const VARIANT = 27; // номер у журналі групи
const REVIEWS_URL = `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`;

const FEEDBACK_DELAY = 60 * 1000; // 1 хвилина
const FEEDBACK_SHOWN_KEY = "feedbackShown"; // sessionStorage: щоб не показувати повторно

const DAY_START = 7;  // 07:00
const DAY_END = 21;   // 21:00


/* ---------- 2. Тема день/ніч ---------- */

// Денна тема з 07:00 до 21:00, нічна — в увесь інший час.
function getThemeByTime(date = new Date()) {
    const hours = date.getHours();
    return hours >= DAY_START && hours < DAY_END ? "light" : "dark";
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;

    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
        const isDark = theme === "dark";
        toggle.setAttribute("aria-pressed", String(isDark));
        toggle.querySelector(".theme-toggle__label").textContent = isDark ? "Денна тема" : "Нічна тема";
    }
}

function initThemeToggle() {
    const toggle = document.getElementById("theme-toggle");

    toggle.addEventListener("click", () => {
        const current = document.documentElement.dataset.theme;
        applyTheme(current === "dark" ? "light" : "dark");
    });

    // Синхронізуємо підпис кнопки з темою, встановленою до появи DOM
    applyTheme(document.documentElement.dataset.theme);
}

// Атрибут на <html> існує вже зараз, тому тема застосовується до першого малювання
applyTheme(getThemeByTime());


/* ---------- 3. Системна інформація ---------- */

function detectOS(ua) {
    if (/Windows NT 10/.test(ua)) return "Windows 10/11";
    if (/Windows/.test(ua)) return "Windows";
    if (/Android/.test(ua)) return "Android";
    if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
    if (/Mac OS X/.test(ua)) return "macOS";
    if (/CrOS/.test(ua)) return "ChromeOS";
    if (/Linux/.test(ua)) return "Linux";
    return "Невідома";
}

function detectBrowser(ua) {
    // Порядок важливий: Edge і Opera теж містять «Chrome» у рядку userAgent
    const rules = [
        ["Edge", /Edg\/([\d.]+)/],
        ["Opera", /OPR\/([\d.]+)/],
        ["Firefox", /Firefox\/([\d.]+)/],
        ["Chrome", /Chrome\/([\d.]+)/],
        ["Safari", /Version\/([\d.]+).*Safari/],
    ];

    for (const [name, pattern] of rules) {
        const match = ua.match(pattern);
        if (match) return `${name} ${match[1].split(".")[0]}`;
    }
    return "Невідомий";
}

function collectSystemInfo() {
    const ua = navigator.userAgent;

    return {
        "Операційна система": detectOS(ua),
        "Браузер": detectBrowser(ua),
        "Платформа": navigator.userAgentData?.platform || navigator.platform || "—",
        "Мова": navigator.language,
        "Cookies": navigator.cookieEnabled ? "увімкнені" : "вимкнені",
        "Ядер процесора": navigator.hardwareConcurrency ?? "—",
        "Екран": `${screen.width} × ${screen.height}, ${screen.colorDepth}-біт`,
        "Часовий пояс": Intl.DateTimeFormat().resolvedOptions().timeZone,
        "User-Agent": ua,
    };
}

function saveSystemInfo() {
    // localStorage зберігає лише рядки, тому об'єкт перетворюємо на JSON
    localStorage.setItem("systemInfo", JSON.stringify(collectSystemInfo()));
    localStorage.setItem("lastVisit", new Date().toLocaleString("uk-UA"));
}

// Зрозумілі підписи для простих (не JSON) ключів
const STORAGE_LABELS = {
    lastVisit: "Останній візит",
};

// Виводимо ВЕСЬ вміст localStorage: JSON-об'єкти розгортаємо на окремі рядки
function renderLocalStorage() {
    const list = document.getElementById("sysinfo-list");
    list.replaceChildren();

    const addRow = (term, value) => {
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        dt.textContent = term;
        dd.textContent = value;
        list.append(dt, dd);
    };

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const raw = localStorage.getItem(key);

        let value;
        try {
            value = JSON.parse(raw);
        } catch {
            value = raw;
        }

        if (value !== null && typeof value === "object") {
            for (const [field, fieldValue] of Object.entries(value)) {
                addRow(field, fieldValue);
            }
        } else {
            addRow(STORAGE_LABELS[key] ?? key, raw);
        }
    }
}


/* ---------- 4. Відгуки роботодавців ---------- */

function createReviewCard({ name, email, body }) {
    const item = document.createElement("li");
    item.className = "review";

    const text = document.createElement("blockquote");
    text.className = "review__body";
    text.textContent = body;

    const author = document.createElement("p");
    author.className = "review__author";

    const authorName = document.createElement("strong");
    authorName.textContent = name;

    const authorEmail = document.createElement("a");
    authorEmail.href = `mailto:${email}`;
    authorEmail.textContent = email;

    author.append(authorName, authorEmail);
    item.append(text, author);
    return item;
}

async function loadReviews() {
    const status = document.getElementById("reviews-status");
    const list = document.getElementById("reviews-list");

    try {
        const response = await fetch(REVIEWS_URL);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const comments = await response.json();

        // Порядок збережено таким, яким його повернув сервер
        list.append(...comments.map(createReviewCard));
        status.textContent = `Отримано відгуків: ${comments.length}`;
        status.classList.add("is-done");
    } catch (error) {
        console.error("Не вдалося завантажити відгуки:", error);
        status.textContent = "Не вдалося завантажити відгуки. Перевірте з'єднання та оновіть сторінку.";
        status.classList.add("is-error");
    }
}


/* ---------- 5. Модальне вікно зворотного зв'язку ---------- */

function initFeedback() {
    const dialog = document.getElementById("feedback");
    const closeButton = document.getElementById("feedback-close");

    closeButton.addEventListener("click", () => dialog.close());

    // Клік по затемненому фону (поза вікном) теж закриває форму
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
    });

    // Якщо користувач уже бачив форму в цій сесії — не набридаємо вдруге
    if (sessionStorage.getItem(FEEDBACK_SHOWN_KEY)) return;

    setTimeout(() => {
        dialog.showModal();
        sessionStorage.setItem(FEEDBACK_SHOWN_KEY, "true");
    }, FEEDBACK_DELAY);
}


/* ---------- 6. Запуск ---------- */

document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();

    saveSystemInfo();
    renderLocalStorage();

    loadReviews();
    initFeedback();
});
