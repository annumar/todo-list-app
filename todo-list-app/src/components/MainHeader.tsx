
import { Link } from "react-router-dom"; 
import { MdEventNote, MdPostAdd } from "react-icons/md";
import classes from './MainHeader.module.css'

function MainHeader() {
    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>
                <MdEventNote />
                Todo App
            </h1>
            <p>
                <Link to="/create-todo" className={classes.button}>
                    <MdPostAdd size={18} />
                    Add Todo
                </Link>
            </p>
        </header>
    )

}

export default MainHeader