document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar scroll effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Typing effect in Hero section
    const typingText = document.querySelector('.typing-text');
    const words = [
        'Cloud Architectures.',
        'CI/CD Pipelines.',
        'Kubernetes Clusters.',
        'Infrastructure as Code.',
        'Reliable Systems.'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        // Word complete
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        }
        // Deletion complete
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing effect
    setTimeout(type, 1000);

    // 3. Simulated Terminal Logs
    const terminalBody = document.getElementById('terminal-body');
    const logs = [
        { text: 'whoami', type: 'cmd', delay: 500 },
        { text: 'satham_hussain', type: 'out', delay: 800 },
        { text: 'terraform init', type: 'cmd', delay: 200 },
        { text: 'Initializing modules...', type: 'out', delay: 100 },
        { text: 'echo "Infrastructure ready"', type: 'cmd', delay: 300 },
        { text: 'Infrastructure ready', type: 'out', delay: 1500 }
    ];

    let logIndex = 0;

    function appendLog() {
        if (logIndex < logs.length && terminalBody) {
            const log = logs[logIndex];
            const div = document.createElement('div');
            div.className = `terminal-line ${log.type}`;

            // Add prompt for cmd
            if (log.type === 'cmd') {
                div.innerHTML = `<span class="prompt">$ </span>${log.text}`;
            } else {
                div.textContent = log.text;
            }

            terminalBody.appendChild(div);
            terminalBody.scrollTop = terminalBody.scrollHeight;

            logIndex++;

            if (logIndex < logs.length) {
                setTimeout(appendLog, logs[logIndex].delay);
            } else {
                // Loop logs after a delay
                setTimeout(() => {
                    terminalBody.innerHTML = '';
                    logIndex = 0;
                    appendLog();
                }, 5000);
            }
        }
    }

    // Only run if module exists
    if (terminalBody) {
        setTimeout(appendLog, 1500);
    }

    // 4. Smooth scrolling for nav links
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to clicked link
            this.classList.add('active');

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Active section highlighting on scroll
    const sections = document.querySelectorAll('.section, .hero');
    const navLinksList = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = navbar.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 6. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 7. Form submission handling (prevent default for demo)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            // Simulate sending
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
                btn.classList.remove('btn-primary');
                btn.style.backgroundColor = '#3fb950';
                btn.style.color = '#fff';

                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.add('btn-primary');
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
