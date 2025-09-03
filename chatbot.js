// Chatbot functionality for Tidiane Soumah's Portfolio
class PortfolioChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.currentStep = 'greeting';
        
        // Bot responses database
        this.responses = {
            greeting: [
                "👋 Hi! I'm Tidiane, your Web Developer & Shopify Expert. How can I help you today?",
                "Hello! Welcome to my portfolio. I'm here to help you learn more about my services and projects!",
                "Hey there! 👋 I'm Tidiane, and I specialize in web development and Shopify solutions. What would you like to know?"
            ],
            services: [
                "🚀 I offer comprehensive web development services:\n\n• Modern, responsive websites\n• Custom Shopify e-commerce stores\n• Front-end development (HTML5, CSS3, JavaScript, React, Vue.js)\n• Back-end development (Node.js, PHP, Laravel)\n• Database management (MySQL, MongoDB, PostgreSQL)\n• Shopify theme customization and app integrations\n• SEO optimization and performance tuning\n\nWould you like to know more about any specific service?",
                "💼 My main services include:\n\n✅ Custom website development\n✅ Shopify store setup and optimization\n✅ E-commerce solutions\n✅ Technical support and maintenance\n✅ UI/UX design\n✅ Performance optimization\n\nI work with modern technologies to create fast, secure, and scalable solutions. What type of project are you planning?"
            ],
            projects: [
                "🎯 Here are some of my featured projects:\n\n1. **Charmemoda** - My Italian fashion brand e-commerce (Shopify)\n2. **CrepsLockers** - Premium multi-category e-commerce platform\n3. **AI Vision** - Modern AI company website\n4. **Luxury Hotel** - Premium hospitality website\n\nEach project showcases different aspects of my skills. Would you like to know more about a specific project?",
                "🌟 I've worked on various exciting projects:\n\n• Fashion e-commerce (Charmemoda)\n• Premium sneaker marketplace (CrepsLockers)\n• AI technology websites\n• Luxury hospitality sites\n\nAll projects are built with modern technologies and focus on user experience. Which project interests you most?"
            ],
            contact: [
                "📧 You can reach me through:\n\n• Email: tidianesoumah@icloud.com\n• LinkedIn: linkedin.com/in/tidiane-soumah-567a6b2a8/\n• Instagram: @tidisoumah\n• GitHub: github.com/Tidisoumah10\n\nI typically respond within 24 hours. What's your project about?",
                "🤝 Let's connect! Here are my contact details:\n\n📧 tidianesoumah@icloud.com\n💼 LinkedIn: Tidiane Soumah\n📱 Instagram: @tidisoumah\n💻 GitHub: Tidisoumah10\n\nI'm always excited to discuss new projects and opportunities. What can I help you build?"
            ],
            pricing: [
                "💰 Pricing depends on project complexity and requirements:\n\n• Simple websites: Starting from €500\n• Custom e-commerce: Starting from €1,500\n• Shopify stores: Starting from €800\n• Ongoing maintenance: €100-300/month\n\nEach project is unique, so I provide custom quotes. Would you like to discuss your specific needs?",
                "💵 My pricing is competitive and transparent:\n\n• Website development: €500-3,000\n• Shopify stores: €800-2,500\n• Custom applications: €1,000-5,000+\n• Maintenance packages: €100-500/month\n\nI offer free consultations to understand your needs and provide accurate quotes. What's your budget range?"
            ],
            experience: [
                "🎓 I'm a Full-Stack Developer with expertise in:\n\n• Front-end: HTML5, CSS3, JavaScript, React, Vue.js, TailwindCSS\n• Back-end: Node.js, PHP, Laravel, Express.js\n• Databases: MySQL, MongoDB, PostgreSQL\n• E-commerce: Shopify (Liquid, theme development, app integration)\n• Tools: Git, GitHub, automation tools, UI/UX design\n\nI've worked on projects ranging from simple websites to complex e-commerce platforms. What technology stack interests you?",
                "💻 My technical background includes:\n\n• 3+ years in web development\n• Specialized in Shopify development\n• Experience with modern frameworks and libraries\n• Database design and optimization\n• API development and integration\n• Performance optimization and SEO\n\nI stay updated with the latest technologies and best practices. What specific skills are you looking for?"
            ],
            default: [
                "I'm not sure I understand that. Could you try asking about my services, projects, or how to contact me?",
                "That's an interesting question! Could you be more specific? I can help with information about my services, projects, or contact details.",
                "I'd love to help! Try asking about my web development services, Shopify expertise, or check out my projects.",
                "Let me know if you'd like to learn about my services, see my projects, or get in touch with me!"
            ]
        };
        
        this.initializeElements();
        this.attachEventListeners();
        this.showWelcomeMessage();
    }
    
    initializeElements() {
        this.toggle = document.getElementById('chatbotToggle');
        this.window = document.getElementById('chatbotWindow');
        this.close = document.getElementById('chatbotClose');
        this.messagesContainer = document.getElementById('chatbotMessages');
        this.input = document.getElementById('chatbotInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.notification = document.getElementById('chatNotification');
        this.quickActions = document.querySelectorAll('.quick-action-btn');
    }
    
    attachEventListeners() {
        this.toggle.addEventListener('click', () => this.toggleChat());
        this.close.addEventListener('click', () => this.closeChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Quick action buttons
        this.quickActions.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const message = e.target.getAttribute('data-message');
                this.input.value = message;
                this.sendMessage();
            });
        });
        
        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.window.contains(e.target) && !this.toggle.contains(e.target)) {
                this.closeChat();
            }
        });
    }
    
    showWelcomeMessage() {
        // Show notification after 3 seconds
        setTimeout(() => {
            this.notification.style.display = 'flex';
        }, 3000);
    }
    
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }
    
    openChat() {
        this.isOpen = true;
        this.window.classList.add('active');
        this.notification.style.display = 'none';
        this.input.focus();
        
        // Add entrance animation
        this.window.style.animation = 'chatbotSlideIn 0.3s ease-out';
    }
    
    closeChat() {
        this.isOpen = false;
        this.window.classList.remove('active');
        this.input.blur();
    }
    
    sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        this.input.value = '';
        
        // Simulate typing delay
        setTimeout(() => {
            const response = this.getBotResponse(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }
    
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<p>${content}</p>`;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = this.getCurrentTime();
        
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(messageTime);
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Store message
        this.messages.push({ content, sender, time: new Date() });
    }
    
    getBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Service-related keywords
        if (message.includes('service') || message.includes('what do you do') || message.includes('offer') || message.includes('help')) {
            return this.getRandomResponse('services');
        }
        
        // Project-related keywords
        if (message.includes('project') || message.includes('work') || message.includes('portfolio') || message.includes('show me')) {
            return this.getRandomResponse('projects');
        }
        
        // Contact-related keywords
        if (message.includes('contact') || message.includes('email') || message.includes('reach') || message.includes('get in touch')) {
            return this.getRandomResponse('contact');
        }
        
        // Pricing-related keywords
        if (message.includes('price') || message.includes('cost') || message.includes('budget') || message.includes('how much')) {
            return this.getRandomResponse('pricing');
        }
        
        // Experience-related keywords
        if (message.includes('experience') || message.includes('skill') || message.includes('technology') || message.includes('expertise')) {
            return this.getRandomResponse('experience');
        }
        
        // Greeting keywords
        if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good afternoon') || message.includes('good evening')) {
            return this.getRandomResponse('greeting');
        }
        
        // Default response
        return this.getRandomResponse('default');
    }
    
    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioChatbot();
});

// Add CSS animation for chatbot window
const style = document.createElement('style');
style.textContent = `
    @keyframes chatbotSlideIn {
        from {
            transform: translateY(20px) scale(0.9);
            opacity: 0;
        }
        to {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
