const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});
sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});
sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
});

async function signUp(event) {
    event.preventDefault(); 

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            alert('Sign-up successful!');
        } else {
            const error = await response.json();
            alert('Sign-up failed: ' + error.message);
        }
    } catch (error) {
        console.error('Error during sign-up:', error);
    }
}



async function signIn(event) {
    event.preventDefault(); 

    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;

    try {
        const response = await fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert('Sign-in successful!');
        } else {
            const error = await response.json();
            alert('Sign-in failed: ' + error.message);
        }
    } catch (error) {
        console.error('Error during sign-in:', error);
    }
}