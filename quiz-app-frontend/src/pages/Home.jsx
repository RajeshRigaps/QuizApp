import {Link} from "react-router-dom";

const Home = () => 
    {
        return(
        <div>
            <h1>Welcome to Quiz App</h1>
            <Link to="/quiz">
                <button>Start Now</button>
            </Link>
        </div>);
    }
export default Home