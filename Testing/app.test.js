const { fireEvent } = require('@testing-library/react'); // Use require instead of import
require('@testing-library/jest-dom'); // Use require for jest-dom as well

// The rest of your test code remains the same...


describe('Authentication Tests', () => {
    let container;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="container">
                <button id="sign-in-btn">Sign In</button>
                <button id="sign-up-btn">Sign Up</button>
                <button id="sign-in-btn2">Sign In 2</button>
                <button id="sign-up-btn2">Sign Up 2</button>
                <form id="signup-form">
                    <input id="signup-username" value="testuser" />
                    <input id="signup-email" value="test@example.com" />
                    <input id="signup-password" value="password" />
                    <button type="submit" onclick="signUp(event)">Sign Up</button>
                </form>
                <form id="signin-form">
                    <input id="signin-username" value="testuser" />
                    <input id="signin-password" value="password" />
                    <button type="submit" onclick="signIn(event)">Sign In</button>
                </form>
            </div>
        `;
        container = document.querySelector('.container');
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear any mocks after each test
    });

    test('should switch to sign-up mode when sign-up button is clicked', () => {
        const signUpBtn = document.querySelector('#sign-up-btn');
        fireEvent.click(signUpBtn); // fireEvent is now defined
        expect(container.classList.contains('sign-up-mode')).toBe(true);
    });

    test('should switch back to sign-in mode when sign-in button is clicked', () => {
        const signInBtn = document.querySelector('#sign-in-btn');
        fireEvent.click(signInBtn); // fireEvent is now defined
        expect(container.classList.contains('sign-up-mode')).toBe(false);
    });

    test('should call signUp and display success message', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: 'Success' })
            })
        );

        const signUpBtn = document.querySelector('#signup-form button');
        fireEvent.click(signUpBtn);

        await new Promise((r) => setTimeout(r, 0)); // wait for promises to resolve

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password'
            })
        });
        expect(window.alert).toHaveBeenCalledWith('Sign-up successful!');
    });

    test('should call signIn and display success message', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: 'Success' })
            })
        );

        const signInBtn = document.querySelector('#signin-form button');
        fireEvent.click(signInBtn);

        await new Promise((r) => setTimeout(r, 0)); // wait for promises to resolve

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'testuser',
                password: 'password'
            })
        });
        expect(window.alert).toHaveBeenCalledWith('Sign-in successful!');
    });

    test('should display error message on sign-up failure', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ message: 'Error' })
            })
        );

        const signUpBtn = document.querySelector('#signup-form button');
        fireEvent.click(signUpBtn);

        await new Promise((r) => setTimeout(r, 0)); // wait for promises to resolve

        expect(window.alert).toHaveBeenCalledWith('Sign-up failed: Error');
    });

    test('should display error message on sign-in failure', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ message: 'Error' })
            })
        );

        const signInBtn = document.querySelector('#signin-form button');
        fireEvent.click(signInBtn);

        await new Promise((r) => setTimeout(r, 0)); // wait for promises to resolve

        expect(window.alert).toHaveBeenCalledWith('Sign-in failed: Error');
    });
});
