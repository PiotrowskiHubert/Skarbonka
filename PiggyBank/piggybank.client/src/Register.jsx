import logo from '/images/logo.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        debugger;
        e.preventDefault();
        try {
            const response = await fetch(`users/RegisterUser?username=${username}&password=${password}`,
                {
                    method: 'POST'                
                });
            if (response.ok) {
                document.getElementById("error").innerText = "User registered successfully";
            } else {
                document.getElementById("error").innerText = "User with that username already exists";
                throw new Error('User with that username already exists');
            }
        } catch (error) {
            document.getElementById("error").innerText = error;
        }
    }

    return (
        <>
            <main class="form-signin w-100 m-auto">
                <form onSubmit={handleSubmit}>
                    <img class="mb-4" src={logo} alt="" width="72" height="57" />
                    <h1 class="h3 mb-3 fw-normal">Create an account</h1>

                    <div class="form-floating">
                        <input class="form-control" id="floatingInput" placeholder="name@example.com" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label for="floatingInput">Username</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <label for="floatingPassword">Password</label>
                    </div>
                    <button class="btn btn-primary w-100 py-2" type="submit">Register</button>
                    <p id="error"></p>
                    <p class="mt-5 mb-3 text-body-secondary">&copy; 2024</p>
                </form>
            </main>
            <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
        </>
    )
}

export default Register;