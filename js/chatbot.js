// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotButton = document.querySelector('.chatbot-button');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-input button');

    // Predefined responses
    const responses = {
        greeting: [ 
            "Hello! Welcome to Technobuzz Systems. How can I assist you today?",
            "Hi there! I'm your Technobuzz assistant. What can I help you with?",
            "Welcome! How may I help you with our services today?"
        ],
        services: {
            "web development": "We offer comprehensive web development services including custom websites, e-commerce solutions, and web applications. Would you like to know more about any specific service?",
            "app development": "Our app development services cover both iOS and Android platforms. We create native and cross-platform applications tailored to your needs. Would you like to discuss your project?",
            "software": "We provide custom software development solutions for businesses of all sizes. Our team specializes in creating scalable and efficient software systems. What type of software solution are you looking for?",
            "consulting": "Our IT consulting services help businesses optimize their technology infrastructure and digital strategy. Would you like to schedule a consultation?"
        },
        pricing: "Our pricing varies based on project requirements and scope. Would you like to schedule a free consultation to discuss your specific needs?",
        contact: "You can reach us through:\n- Email: info@technobuzz.com\n- Phone: +1 (555) 123-4567\n- Office: 123 Tech Street, Digital City\nWould you like to schedule a meeting?",
        default: "I'm not sure I understand. Could you please rephrase your question? You can ask me about our services, pricing, or how to contact us."
    };

    // Common questions and their variations
    const questionPatterns = {
        greeting: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'],
        services: {
            web: ['web', 'website', 'web development', 'web site', 'web design'],
            app: ['app', 'application', 'mobile app', 'android', 'ios'],
            software: ['software', 'custom software', 'software development'],
            consulting: ['consulting', 'consultation', 'it consulting', 'tech consulting']
        },
        pricing: ['price', 'cost', 'pricing', 'how much', 'fee', 'charges'],
        contact: ['contact', 'reach', 'email', 'phone', 'address', 'location', 'where']
    };

    // Function to get random response from array
    function getRandomResponse(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Function to add message to chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Function to match user input to a response
    function getBotResponse(input) {
        const lowerInput = input.toLowerCase();
        // Greeting
        for (const greet of questionPatterns.greeting) {
            if (lowerInput.includes(greet)) {
                return getRandomResponse(responses.greeting);
            }
        }
        // Services
        for (const [serviceKey, keywords] of Object.entries(questionPatterns.services)) {
            for (const keyword of keywords) {
                if (lowerInput.includes(keyword)) {
                    return responses.services[serviceKey + (serviceKey === 'web' ? ' development' : '')] || responses.services[serviceKey] || responses.default;
                }
            }
        }
        // Pricing
        for (const price of questionPatterns.pricing) {
            if (lowerInput.includes(price)) {
                return responses.pricing;
            }
        }
        // Contact
        for (const contact of questionPatterns.contact) {
            if (lowerInput.includes(contact)) {
                return responses.contact;
            }
        }
        // Default
        return responses.default;
    }

    // Toggle chatbot window
    chatbotButton.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            addMessage(getRandomResponse(responses.greeting));
        }
    });

    // Close chatbot window
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });

    // Send message
    async function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatbotInput.value = '';
            // Simulate typing delay
            setTimeout(() => {
                const response = getBotResponse(message);
                addMessage(response);
            }, 600);
        }
    }

    // Send message on button click
    chatbotSend.addEventListener('click', sendMessage);

    // Send message on Enter key
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add initial greeting when chatbot is opened
    chatbotButton.addEventListener('click', () => {
        if (!chatbotMessages.children.length) {
            addMessage(getRandomResponse(responses.greeting));
        }
    });
}); 