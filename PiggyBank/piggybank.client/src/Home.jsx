import logo from '/images/logo.png'
import './Home.css'

export function Home() {
    return (
        <>
            <h1>Welcome on PiggyBank App!</h1>
            <p>Here you will be able to manage your home expenses. Thanks to it, you will never go bankrupt!</p>
            <img id="logo" src={logo}></img>
        </>
    )
}

export default Home;