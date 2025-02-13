import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../contexts/QuizContext';
import '../assets/styles/Home.css';


const Home = () => {
        const [name, setName] = useState('');
        const navigate = useNavigate();
        const { isQuizCompleted } = useContext(QuizContext);

        const handleStart = () => {
            if(isQuizCompleted){
                alert("You have already completed the quiz.")
            }
            else if(name === "") {
                alert("Please enter your name to start the quiz");
            } else {
                navigate("/quiz", {state: {name}});
            }
        };

        return (
        <div className="home-container">
            <div className="home-content">
            <h1>Welcome to Quiz App</h1>
            <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="name-input"
            />
                            <button className="start-button" onClick={handleStart}>
Start Now
</button>
                      </div>
        </div>
); 
    };

export default Home;