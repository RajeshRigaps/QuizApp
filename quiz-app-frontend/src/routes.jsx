import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import { QuizProvider } from "./contexts/QuizContext";
import ProtectedQuizRoute from "./components/ProtectedQuizRoute";
const AppRoutes = () => {
    return(
        <QuizProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/quiz" element={<ProtectedQuizRoute><QuizPage/></ProtectedQuizRoute> }/>
                    <Route path="/result" element={<ResultPage/>}/>
                </Routes>
            </Router>
        </QuizProvider>
    )
};
export default AppRoutes;