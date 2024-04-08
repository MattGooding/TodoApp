import './MainMenu.scss';
import { Link } from "react-router-dom";

function MainMenu() {
    return (
        <nav>
            <ul>
                <Link to="/">Tasks</Link>
                <Link to="/add">Add</Link>
                <Link to="/help">Help</Link>
            </ul>
        </nav>
    );
}

export default MainMenu;