import { useLocation } from "react-router-dom";
import "../assets/styles/QuizPage.css";
const QuizPage = () => 
    { 
        const location = useLocation();
        const name = location.state.name;
        return(
        <div className="quiz-container">
            <h1>Welcome, {name}</h1>
        </div>
    );
}
export default QuizPage