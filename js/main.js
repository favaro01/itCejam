document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const heroVideo = document.getElementById('hero-video-container');
    const heroContainer = document.getElementById('hero-container');

    if (!heroVideo) return;

    setTimeout(() => {
        heroVideo.classList.remove('z-0');

        if (header) {
            header.classList.remove('-translate-y-full', 'opacity-0');
            header.classList.add('translate-y-0' ,'opacity-100');
        }

        if (heroContainer) {
            heroContainer.classList.remove('opacity-0');
            heroContainer.classList.add('opacity-100');
            heroContainer.classList.add('animate-fade-in-up');
        }

    }, 2500);
});
