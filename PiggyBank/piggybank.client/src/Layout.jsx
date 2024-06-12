import logo from '/images/logo.png';
import profilePicture from '/images/profile-picture.png';
import { Link } from 'react-router-dom';
import './Layout.css';

export function Layout({ children }) {

    const isLoggedIn = () => {
        return localStorage.getItem('user') !== null;
    };

    const handleSignOut = async () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
                <header class="p-3 mb-3 border-bottom">
                    <div class="container">
                        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                            <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                                <img class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap" src={logo} />
                            </a>

                            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                <Link to='/' className="nav-link px-2 link-secondary">Home page</Link>
                            {isLoggedIn() ? (
                                <>
                                    <Link to='/expenses' className="nav-link px-2 link-body-emphasis">Expenses</Link>
                                    <Link to='/available-rooms' className="nav-link px-2 link-body-emphasis">Rooms</Link>
                                </>
                            ) : (
                                <>
                                    <Link to='/login' className="nav-link px-2 link-body-emphasis">Login</Link>
                                    <Link to='/register' className="nav-link px-2 link-body-emphasis">Register</Link>
                                </>
                            )}
                            </ul>

                            <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                                <input type="search" class="form-control" placeholder="Search..." aria-label="Search" />
                            </form>

                        {isLoggedIn() && (<div class="dropdown text-end">
                            <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={profilePicture} alt="mdo" width="32" height="32" class="rounded-circle" />
                            </a>
                            <ul class="dropdown-menu text-small">
                                <li><a class="dropdown-item" href="#">New project...</a></li>
                                <li><a class="dropdown-item" href="#">Settings</a></li>
                                <li><a class="dropdown-item" href="#">Profile</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" onClick={handleSignOut}>Sign out</a></li>
                            </ul>
                        </div>)}
                        </div>
                    </div>
            </header>
            <main className="container mt-5 pt-3">
                {children}
            </main>
        </>
    )
}

export default Layout;