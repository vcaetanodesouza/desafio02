import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://tbsyknkyxemgmonwepsd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRic3lrbmt5eGVtZ21vbndlcHNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0NzA5ODQsImV4cCI6MjA0NTA0Njk4NH0.noydcOXvbcsEnN-tu_X759OKk3SPjCu057YUZdqGV1Y');

// Login pelo formulário
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('senha').value;
    const senhaError = document.getElementById('senha-error');

    senhaError.style.display = 'none';

    if (password.length < 6) {
        senhaError.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        senhaError.style.display = 'block';
        return;
    }

    const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error('Erro ao fazer login:', error.message);
    } else {
        console.log('Usuário logado:', user);
    }
});

// Login pelo Google
document.querySelector('.google-login-btn').addEventListener('click', async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    });

    if (error) {
        console.error('Erro ao fazer login com Google:', error.message);
    }
});
