

// =========================================
// МОДАЛЬНОЕ ОКНО
// =========================================
const modal = document.getElementById('contactModal');
const openBtns = document.querySelectorAll('#openContactBtn, #openContactBtnHero, #openContactBtnBurger');
const closeBtn = document.getElementById('contactClose');
const overlay = document.getElementById('contactOverlay');
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

function openModal() {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (successMsg) successMsg.style.display = 'none';
    if (form) form.reset();
}

openBtns.forEach(btn => btn.addEventListener('click', openModal));
if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (overlay) overlay.addEventListener('click', closeModal);

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
        closeModal();
    }
});

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (successMsg) successMsg.style.display = 'block';
        setTimeout(() => {
            closeModal();
        }, 2000);
    });
}

// =========================================
// БУРГЕР МЕНЮ
// =========================================
const burger = document.querySelector('.burger');
const burgerMenu = document.getElementById('burgerMenu');
const burgerOverlay = document.getElementById('burgerOverlay');
const burgerClose = document.getElementById('burgerClose');
const burgerLinks = document.querySelectorAll('.burger-link');

function openBurger() {
    if (!burger || !burgerMenu || !burgerOverlay) return;
    burger.classList.add('is-open');
    burgerMenu.classList.add('is-open');
    burgerOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

function closeBurger() {
    if (!burger || !burgerMenu || !burgerOverlay) return;
    burger.classList.remove('is-open');
    burgerMenu.classList.remove('is-open');
    burgerOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
}

if (burger) burger.addEventListener('click', openBurger);
if (burgerClose) burgerClose.addEventListener('click', closeBurger);
if (burgerOverlay) burgerOverlay.addEventListener('click', closeBurger);
burgerLinks.forEach(link => link.addEventListener('click', closeBurger));

// Закрытие бургера по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burgerMenu && burgerMenu.classList.contains('is-open')) {
        closeBurger();
    }
});

// =========================================
// АНИМАЦИЯ ПОЯВЛЕНИЯ КАРТОЧЕК НАВЫКОВ
// =========================================
const skillCards = document.querySelectorAll('.skill-card');
let animationFrameId = null;

function checkSkillCards() {
    if (!skillCards.length) return;

    skillCards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (cardRect.top < windowHeight - 100 && !card.classList.contains('visible')) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        }
    });
}

function handleScroll() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(checkSkillCards);
}

window.addEventListener('load', () => {
    checkSkillCards();
});
window.addEventListener('scroll', handleScroll);

// =========================================
// ФИЛЬТРАЦИЯ ПРОЕКТОВ
// =========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

if (filterBtns.length && workCards.length) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            workCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
}

// =========================================
// КНОПКА "ПОКАЗАТЬ ЕЩЕ"
// =========================================
const showMoreBtn = document.querySelector('.btn-more');
if (showMoreBtn) {
    let clickCount = 0;
    showMoreBtn.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 1) {
            const originalContent = showMoreBtn.innerHTML;
            showMoreBtn.innerHTML = `
                            <span>Загрузка...</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        `;
            setTimeout(() => {
                showMoreBtn.innerHTML = originalContent;
                alert('Больше проектов скоро появится!');
            }, 800);
        } else {
            alert('Больше проектов скоро появится!');
        }
    });
}

