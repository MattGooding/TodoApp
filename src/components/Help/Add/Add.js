import '../Help.scss';
import { Link } from "react-router-dom";

function Add() {
    return (
        <div>
            <h2>Help - Adding Tasks</h2>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus vitae aliquet nec ullamcorper. Libero justo laoreet sit amet cursus sit. Auctor augue mauris augue neque. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Duis ut diam quam nulla porttitor massa id. Id ornare arcu odio ut sem nulla. In dictum non consectetur a erat nam. Aliquam ut porttitor leo a diam sollicitudin tempor id eu. Vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Urna nec tincidunt praesent semper feugiat nibh sed.</p>

            <ul className='sub-menu'>
                <Link to="/help">Introduction</Link>
                <Link to="/help/add">Adding Tasks</Link>
                <Link to="/help/remove">Removing Tasks</Link>
                <Link to="/help/change">Changing Tasks</Link>
            </ul>
        </div>
    );
}

export default Add;
