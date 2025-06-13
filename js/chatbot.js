// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create chatbot elements
    const chatbotHTML = `
        <div class="chatbot-container">
            <button class="chatbot-button">
                <i class="fa fa-comments"></i>
            </button>
            <div class="chatbot-window">
                <div class="chatbot-header">
                    <h3>Chat with us</h3>
                    <button class="chatbot-close">&times;</button>
                </div>
                <div class="chatbot-messages">
                    <div class="message bot">
                        <div class="message-content">
                            Hello! How can I help you today?
                        </div>
                    </div>
                </div>
                <div class="chatbot-input">
                    <input type="text" placeholder="Type your message...">
                    <button><i class="fa fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    `;

    // Add chatbot to the page
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // Get chatbot elements
    const chatbotButton = document.querySelector('.chatbot-button');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-input button');
    const chatbotMessages = document.querySelector('.chatbot-messages');

    // Toggle chatbot window
    chatbotButton.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
    });

    // Close chatbot window
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });

    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            chatbotInput.value = '';

            // Simulate bot response
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse, 'bot');
            }, 1000);
        }
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Simple bot response logic
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return 'Hello! How can I assist you today?';
        } else if (lowerMessage.includes('help')) {
            return 'I can help you with information about our services, pricing, or general inquiries. What would you like to know?';
        } else if (lowerMessage.includes('service') || lowerMessage.includes('services')) {
            return 'We offer various services including web development, mobile app development, and digital marketing. Which service are you interested in?';
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            return 'Our pricing varies based on project requirements. Would you like to schedule a consultation to discuss your specific needs?';
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
            return 'You can reach us at info@technobuzz.com or call us at +1 (555) 123-4567.';
        } else if (lowerMessage.includes('thank')) {
            return 'You\'re welcome! Is there anything else I can help you with?';
        } else {
            return 'I\'m not sure I understand. Could you please rephrase your question or contact our support team for more specific assistance.';
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
}); 