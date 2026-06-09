document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. SISTEMA DE ACCORDION (EXPANSÍVEIS)
       ========================================================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const content = this.nextElementSibling;
            const isCurrentlyActive = item.classList.contains('active');

            // Comportamento solo: fecha os outros blocos antes de abrir o novo
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-content').style.maxHeight = null;
                i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });

            if (!isCurrentlyActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    /* ==========================================================================
       2. INTERAÇÃO DE VOTAÇÃO (POLL INTERATIVO)
       ========================================================================== */
    const pollOptions = document.querySelectorAll('.poll-option');
    const pollThanks = document.getElementById('poll-thanks');

    pollOptions.forEach(option => {
        option.addEventListener('click', function() {
            let currentVotes = parseInt(this.getAttribute('data-votes'), 10);
            currentVotes += 1;
            this.setAttribute('data-votes', currentVotes);
            this.querySelector('.vote-count').textContent = currentVotes + " votos";
            
            pollThanks.style.display = 'block';
            
            // Desabilita os botões após o voto
            pollOptions.forEach(opt => opt.disabled = true);
        });
    });

    /* ==========================================================================
       3. INTERAÇÃO DO SIMULADOR DE COMENTÁRIOS
       ========================================================================== */
    const commentForm = document.getElementById('comment-form');
    const commentsDisplay = document.getElementById('comments-display');

    if(commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = document.getElementById('comment-name');
            const textInput = document.getElementById('comment-text');

            if(nameInput.value.trim() && textInput.value.trim()) {
                const newComment = document.createElement('div');
                newComment.className = 'comment-item';
                newComment.style.borderLeftColor = 'var(--clr-neon)';
                newComment.innerHTML = `<strong>${escapeHTML(nameInput.value)}</strong><p>${escapeHTML(textInput.value)}</p>`;
                
                commentsDisplay.appendChild(newComment);
                commentsDisplay.scrollTop = commentsDisplay.scrollHeight;

                nameInput.value = '';
                textInput.value = '';
            }
        });
    }

    /* ==========================================================================
       4. SISTEMA FLUTUANTE DE ACESSIBILIDADE
       ========================================================================== */
    const btnIncreaseFont = document.getElementById('btn-increase-font');
    const btnDecreaseFont = document.getElementById('btn-decrease-font');
    const btnToggleTheme = document.getElementById('btn-toggle-theme');
    const btnTtsStart = document.getElementById('btn-tts-start');
    const btnTtsStop = document.getElementById('btn-tts-stop');

    // Escala de tamanho de fonte
    btnIncreaseFont.addEventListener('click', () => {
        document.body.classList.remove('font-sm');
        document.body.classList.add('font-lg');
    });

    btnDecreaseFont.addEventListener('click', () => {
        document.body.classList.remove('font-lg');
        document.body.classList.add('font-sm');
    });

    // Alternador Light/Dark Mode
    btnToggleTheme.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Leitura por Voz via Web Speech API (Nativa)
    let ttsUtterance = null;

    btnTtsStart.addEventListener('click', () => {
        window.speechSynthesis.cancel(); // Cancela leituras anteriores em andamento

        const mainContent = document.getElementById('conteudo');
        if (!mainContent) return;

        // Extrai apenas o conteúdo textual legível do escopo principal
        const textToRead = mainContent.innerText || mainContent.textContent;

        ttsUtterance = new SpeechSynthesisUtterance(textToRead);
        ttsUtterance.lang = 'pt-BR';
        ttsUtterance.rate = 1.05;

        window.speechSynthesis.speak(ttsUtterance);
    });

    btnTtsStop.addEventListener('click', () => {
        window.speechSynthesis.cancel();
    });

    /* ==========================================================================
       5. FORMULÁRIO DE INSCRIÇÃO PRINCIPAL
       ========================================================================== */
    const signupForm = document.getElementById('main-signup-form');
    const successMsg = document.getElementById('form-success-msg');

    if(signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            successMsg.style.display = 'block';
            signupForm.reset();
            
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 6000);
        });
    }

    // Prevenção de injeção maliciosa nos comentários (Sanitização)
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }
});