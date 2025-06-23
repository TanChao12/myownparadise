document.addEventListener('DOMContentLoaded', function () {

    // --- TYPING ANIMATION (Hero Section) ---
    const typingText = document.querySelector('.typing-text');
    const words = ["Digital Architect", "Creative Technologist", "UI/UX Strategist", "Front-End Specialist"];
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 1500); return;
            }
        }
        const typingSpeed = isDeleting ? 100 : 200;
        setTimeout(type, typingSpeed);
    }
    type();

    // --- FADE-IN ON SCROLL ANIMATION ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));


    // --- HACKER TEXT SCRAMBLE ON HOVER (Project Titles) ---
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!#%$@*<>?/";
    document.querySelectorAll('.card-title').forEach(title => {
        let interval = null;
        const originalText = title.dataset.text;

        title.onmouseover = event => {
            let iteration = 0;
            clearInterval(interval);
            interval = setInterval(() => {
                event.target.innerText = originalText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");
                if (iteration >= originalText.length) {
                    clearInterval(interval);
                }
                iteration += 1 / 3;
            }, 30);
        }
        title.onmouseout = () => {
            clearInterval(interval);
            title.innerText = originalText;
        }
    });

    // --- EVENT GALLERY LIGHTBOX ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox) { // Check if lightbox exists to prevent errors
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
        };

        lightboxClose.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});
