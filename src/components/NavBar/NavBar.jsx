import Logo from '../../assets/almabetter-logo.png'
import styles from './NavBar.module.css'

const NavBar = () => {
    return (
        <>
            <section className="w-full border-b-4 border-solid shadow overflow-hidden">
                <div className="container mx-auto">
                    <div className={`my-5 bg-white ${styles.width}`}>
                        <a href='https://www.almabetter.com/' className='no-underline'><img className='h-8' alt="almabetter logo" src={Logo}></img></a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NavBar
