import logo from '/images/logo.png';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useState, useEffect } from 'react';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('users');
            const users = await response.json();

            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem('token', user.accessToken);
                localStorage.setItem('user', JSON.stringify(user));
                document.getElementById("error").innerText = "";
                navigate('/');
                window.location.reload();
            } else {
                document.getElementById("error").innerText = "Invalid username or password";
            }
        } catch (error) {
            document.getElementById("error").innerText = error;
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user != null) {
            navigate('/');
        }
    }, []);

    return (
        <>
            <main class="form-signin w-100 m-auto">
                <form onSubmit={handleSubmit}>
                    <img class="mb-4" src={logo} alt="" width="72" height="57" />
                        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                        <div class="form-floating">
                        <input class="form-control" id="floatingInput" placeholder="name@example.com" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <label for="floatingInput">Username</label>
                        </div>
                        <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                <label for="floatingPassword">Password</label>
                        </div>

                        <div class="form-check text-start my-3">
                            <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Remember me
                                </label>
                        </div>
                    <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                        <p id="error"></p>
                        <p class="mt-5 mb-3 text-body-secondary">&copy; 2024</p>
                </form>
                </main>
                <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
        </>
    )
}

export default Login;