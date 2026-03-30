const input = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const container = document.getElementById('chat-container');
const typingIndicator = document.getElementById('typing-indicator');

function switchView(viewId) {
    const chatView = document.getElementById('view-chat');
    const profileView = document.getElementById('view-profile');
    const navChat = document.getElementById('nav-chat');
    const navProfile = document.getElementById('nav-profile');

    const activeClass = ['text-cyan-400', 'drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]'];
    const inactiveClass = ['text-slate-500'];

    if(viewId === 'chat') {
        chatView.classList.remove('hidden');
        profileView.classList.add('hidden');
        navChat.classList.add(...activeClass);
        navChat.classList.remove(...inactiveClass);
        navProfile.classList.remove(...activeClass);
        navProfile.classList.add(...inactiveClass);
    } else if (viewId === 'profile') {
        profileView.classList.remove('hidden');
        chatView.classList.add('hidden');
        navProfile.classList.add(...activeClass);
        navProfile.classList.remove(...inactiveClass);
        navChat.classList.remove(...activeClass);
        navChat.classList.add(...inactiveClass);
    }
}

sendBtn.disabled = true;

input.addEventListener('input', () => {
    sendBtn.disabled = input.value.trim().length === 0;
});

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'flex items-start gap-3 justify-end message-appear';
    userMsg.innerHTML = `
        <div class="chat-bubble-user text-white px-4 py-3 max-w-[85%] text-xs leading-relaxed uppercase shadow-[0_0_10px_rgba(217,70,239,0.1)]">
            > ${escapeHTML(text)}
        </div>
        <div class="w-8 h-8 bg-black border border-fuchsia-500 flex-shrink-0 flex items-center justify-center text-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.3)] text-xs">OP</div>
    `;
    container.insertBefore(userMsg, typingIndicator);
    
    input.value = '';
    sendBtn.disabled = true;
    scrollToBottom();

    typingIndicator.style.display = 'flex';
    scrollToBottom();

    setTimeout(() => {
        typingIndicator.style.display = 'none';
        
        const aiMsg = document.createElement('div');
        aiMsg.className = 'flex items-start gap-3 message-appear';
        aiMsg.innerHTML = `
            <div class="w-8 h-8 bg-black border border-cyan-500 flex-shrink-0 flex items-center justify-center text-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.3)] text-xs">SYS</div>
            <div class="bg-cyan-500/5 text-cyan-100 px-4 py-3 border border-cyan-500/20 chat-bubble-ai max-w-[85%] text-xs leading-relaxed uppercase">
                > PACKET RECEIVED: "${escapeHTML(text)}"<br>> STATUS: SYNTAX ACCEPTED.
            </div>
        `;
        container.insertBefore(aiMsg, typingIndicator);
        scrollToBottom();
    }, 800 + Math.random() * 600);
}

function scrollToBottom() {
    container.scrollTop = container.scrollHeight;
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[tag] || tag)
    );
}
