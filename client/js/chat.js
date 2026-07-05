const input = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messages = document.getElementById('messages');
const typingIndicator = document.getElementById('typingIndicator');
const chatName = document.getElementById('chatName');
const chatStatus = document.getElementById('chatStatus');
const contacts = Array.from(document.querySelectorAll('.conversation-item'));
const quickButtons = Array.from(document.querySelectorAll('.quick-btn'));
const emojiButton = document.getElementById('emojiButton');
const attachButton = document.getElementById('attachButton');

const conversations = {
    rahul: {
        name: 'Rahul',
        status: 'Online • replying now',
        messages: [
            { text: 'Hi! I found a black backpack near the library. Is it yours?', sender: 'receiver', time: '10:20 AM' },
            { text: 'Yes, that sounds like mine. I can come by soon.', sender: 'sender', time: '10:22 AM' },
            { text: 'Great, I can meet you at the campus gate.', sender: 'receiver', time: '10:24 AM' }
        ]
    },
    priya: {
        name: 'Priya',
        status: 'Online • available',
        messages: [
            { text: 'I left my notebook in the cafeteria. Can you help me check?', sender: 'receiver', time: '9:45 AM' },
            { text: 'Absolutely, I can look for it with you.', sender: 'sender', time: '9:47 AM' }
        ]
    },
    akhil: {
        name: 'Akhil',
        status: 'Offline • last seen 20m ago',
        messages: [
            { text: 'Perfect, I’ll bring the bag.', sender: 'receiver', time: '8:10 AM' }
        ]
    }
};

let activeContact = 'rahul';

function scrollToBottom() {
    if (messages) {
        messages.scrollTop = messages.scrollHeight;
    }
}

function addMessage(text, sender = 'sender', timeLabel = null, isSystem = false) {
    if (!messages || !typingIndicator) return;

    const row = document.createElement('div');
    row.className = `message-row ${sender}`;

    const bubble = document.createElement('div');
    bubble.className = `bubble${isSystem ? ' system' : ''}`;
    bubble.textContent = text;

    const time = document.createElement('span');
    time.className = 'message-time';
    time.textContent = timeLabel || new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    bubble.appendChild(time);

    if (sender === 'sender' && !isSystem) {
        const status = document.createElement('span');
        status.className = 'message-status';
        status.textContent = '✓ Delivered';
        bubble.appendChild(status);
    }

    row.appendChild(bubble);
    messages.insertBefore(row, typingIndicator);
    scrollToBottom();
}

function pushMessage(text, sender, isSystem = false) {
    const timeLabel = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    conversations[activeContact].messages.push({
        text,
        sender,
        time: timeLabel
    });

    renderConversation(activeContact);
    if (sender !== 'system') {
        input.focus();
    }
}

function renderConversation(contactKey) {
    const conversation = conversations[contactKey];
    if (!conversation) return;

    activeContact = contactKey;

    if (chatName) {
        chatName.textContent = conversation.name;
    }

    if (chatStatus) {
        chatStatus.innerHTML = `<span class="status-dot"></span>${conversation.status}`;
    }

    if (messages) {
        messages.innerHTML = '';
        const banner = document.createElement('div');
        banner.className = 'system-banner';
        banner.textContent = 'Secure meetup chat • Verified community members only';
        messages.appendChild(banner);

        conversation.messages.forEach((message) => {
            addMessage(message.text, message.sender, message.time);
        });

        messages.appendChild(typingIndicator);
        hideTyping();
        scrollToBottom();
    }
}

function showTyping() {
    if (typingIndicator) {
        typingIndicator.style.display = 'flex';
        scrollToBottom();
    }
}

function hideTyping() {
    if (typingIndicator) {
        typingIndicator.style.display = 'none';
    }
}

contacts.forEach((contact) => {
    contact.addEventListener('click', () => {
        contacts.forEach((item) => item.classList.remove('active'));
        contact.classList.add('active');
        renderConversation(contact.dataset.contact);
    });
});

quickButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const targetPage = button.dataset.link;
        const actionMessages = {
            meeting: 'Suggested meetup time: 6:30 PM at the library entrance.',
            photo: 'Item photo shared successfully for review.',
            qr: 'Verification QR generated. Present this QR during the meetup.',
            match: 'Match details opened for the latest verified item pairing.'
        };

        conversations[activeContact].messages.push({
            text: actionMessages[action],
            sender: 'system',
            time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
        });

        renderConversation(activeContact);

        if (targetPage) {
            setTimeout(() => {
                window.location.href = targetPage;
            }, 500);
        }
    });
});

if (emojiButton) {
    emojiButton.addEventListener('click', () => {
        input.value += ' 😊';
        input.focus();
    });
}

if (attachButton) {
    attachButton.addEventListener('click', () => {
        input.value += ' 📎';
        input.focus();
    });
}

if (sendButton && input) {
    sendButton.addEventListener('click', () => {
        const text = input.value.trim();
        if (!text) return;

        input.value = '';
        pushMessage(text, 'sender');
        showTyping();

        const reply = activeContact === 'rahul'
            ? 'Sounds good. I can meet you near the library entrance.'
            : activeContact === 'priya'
                ? 'I’ll check the cafeteria and update you shortly.'
                : 'Thanks! I’ll keep an eye out for it.';

        setTimeout(() => {
            hideTyping();
            pushMessage(reply, 'receiver');
        }, 900);
    });

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendButton.click();
        }
    });

    input.addEventListener('focus', () => {
        input.placeholder = 'Type a message';
    });
}

window.addEventListener('load', () => {
    renderConversation(activeContact);
    scrollToBottom();
});
