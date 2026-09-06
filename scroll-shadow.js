const scrollCards = document.querySelectorAll('.content-card');
const letterToggle = document.querySelector('#letter-variant');
const letterWrap = document.querySelector('#letter-view');
const handwrittenCard = document.querySelector('#handwritten');
const textCard = document.querySelector('#nonhandwritten');

function updateScrollShadows() {
    const visibleCards = [...document.querySelectorAll('.content-card:not([hidden])')];

    visibleCards.forEach((card) => {
        const canScrollDown = card.scrollTop + card.clientHeight < card.scrollHeight - 1;
        const wrap = card.parentElement;

        wrap?.classList.toggle('can-scroll-down', canScrollDown);
        wrap?.querySelector('.scroll-hint')?.classList.toggle('visible', canScrollDown);
    });
}

function syncLetterMode() {
    if (!letterToggle || !letterWrap || !textCard || !handwrittenCard) return;

    const isTextMode = letterToggle.checked;

    textCard.hidden = !isTextMode;
    handwrittenCard.hidden = isTextMode;
    letterWrap.classList.toggle('is-text-mode', isTextMode);
    updateScrollShadows();
}

if (letterToggle) {
    letterToggle.checked = false;
    syncLetterMode();
}

scrollCards.forEach((card) => {
    card.addEventListener('scroll', updateScrollShadows, { passive: true });
});

if (letterToggle) {
    letterToggle.addEventListener('change', syncLetterMode);
}

window.addEventListener('resize', updateScrollShadows);
updateScrollShadows();
syncLetterMode();