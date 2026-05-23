document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // --- Carousel Logic ---
    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.querySelector('.carousel-next');
    const prevBtn = document.querySelector('.carousel-prev');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (nextBtn && prevBtn && slides.length > 0) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // --- Services Tabs Logic ---
    const serviceNavItems = document.querySelectorAll('.service-nav li');
    const servicePanels = document.querySelectorAll('.service-panel');

    serviceNavItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove active class from all
            serviceNavItems.forEach(nav => nav.classList.remove('active'));
            servicePanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked
            this.classList.add('active');
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- Portfolio Filters ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Form Submission (Native for FormSubmit) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            const btn = contactForm.querySelector('button');
            btn.innerText = 'Envoi...';
            // We do not prevent default here, so the form submits natively
            // to FormSubmit to allow the initial activation step.
        });
    }

    // --- Scroll Animations ---
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: stop observing once animated
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(el => observer.observe(el));
    }

    // --- Chat Widget Logic ---
    const chatWidget = document.getElementById('chat-widget');
    const openChatBtn = document.getElementById('open-chat');
    const closeChatBtn = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat');
    const chatMessages = document.getElementById('chat-messages');

    if (chatWidget && openChatBtn && closeChatBtn) {
        // Toggle Chat
        openChatBtn.addEventListener('click', () => {
            chatWidget.classList.add('active');
            chatInput.focus();
        });

        closeChatBtn.addEventListener('click', () => {
            chatWidget.classList.remove('active');
        });

        // Send Message Logic
        const sendMessage = async () => {
            const messageText = chatInput.value.trim();
            if (!messageText) return;

            // 1. Add user message to UI
            appendMessage(messageText, 'user');
            chatInput.value = '';

            // 2. Show typing indicator
            const typingIndicator = showTypingIndicator();

            // 3. Simulate backend response with 'bientôt disponible'
            setTimeout(() => {
                typingIndicator.remove();
                appendMessage("Le chatbot sera bientôt disponible !", 'assistant');
            }, 1000);
        };

        sendChatBtn.addEventListener('click', sendMessage);

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Helper to append message
        function appendMessage(text, sender) {
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('message', sender);
            msgDiv.textContent = text;
            chatMessages.appendChild(msgDiv);
            scrollToBottom();
        }

        // Helper for typing indicator
        function showTypingIndicator() {
            const indicator = document.createElement('div');
            indicator.classList.add('typing-indicator');
            indicator.innerHTML = '<span></span><span></span><span></span>';
            chatMessages.appendChild(indicator);
            scrollToBottom();
            return indicator;
        }

        function scrollToBottom() {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
});
