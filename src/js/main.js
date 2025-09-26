document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialisation de la librairie d'animation AOS
    AOS.init({
        duration: 800,
        once: true,
    });

    // 2. Animation de machine à écrire
    const typingTextElement = document.getElementById('typing-text');
    if (typingTextElement) {
        const phrases = [
            "Communicante.",
            "Voix-Off.",
            "Stratège en contenu.",
            "Créatrice de récits."
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timeoutId;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            let text = '';

            if (isDeleting) {
                charIndex--;
                text = currentPhrase.substring(0, charIndex);
            } else {
                charIndex++;
                text = currentPhrase.substring(0, charIndex);
            }

            typingTextElement.textContent = text;
            let typeSpeed = isDeleting ? 75 : 150;

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause avant de supprimer
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause avant la nouvelle phrase
            }

            timeoutId = setTimeout(type, typeSpeed);
        }
        type();
    }

    // 3. Mise en évidence du lien de navigation actif au défilement
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('text-white', 'font-bold');
                    link.classList.add('text-gray-300');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.remove('text-gray-300');
                        link.classList.add('text-white', 'font-bold');
                    }
                });
            }
        });
    }, { rootMargin: '-40% 0px -60% 0px' });

    sections.forEach(section => {
        observer.observe(section);
    });

    // 4. Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');

            submitButton.textContent = 'Envoi en cours...';
            submitButton.disabled = true;

            setTimeout(() => {
                submitButton.textContent = 'Message Envoyé !';
                submitButton.style.backgroundColor = '#22C55E'; // Green

                setTimeout(() => {
                    submitButton.textContent = 'Envoyer le message';
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                    contactForm.reset();
                }, 3000);

            }, 1000);
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const cvButton = document.getElementById('cvDownloadBtn');
    if (cvButton) {
        cvButton.addEventListener('click', function () {
            setTimeout(function () {
                alert('CV télécharger avec succès !');
            }, 500);
        });
    }
});