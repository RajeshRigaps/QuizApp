import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";

const AppRoutes = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/quiz" element={<QuizPage/>}/>
                <Route path="/result" element={<ResultPage/>}/>
            </Routes>
        </Router>
    )
};
export default AppRoutes;