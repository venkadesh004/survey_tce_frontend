import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import RecruitersFeedback from "./pages/RecruitersFeedback";
import Navbar from "./components/Navbar"
import FormMenu from "./pages/FormMenu";
import ParentsFeedback from "./pages/ParentsFeedback";
import CourseExitSurvey from "./pages/CourseExitSurvey";
import EmployerFeedback from "./pages/EmployerFeedback";
import GraduateExitSurvey from "./pages/GraduateExitSurvey";
import AlumniFeedback from "./pages/AlumniFeedback";
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<FormMenu/>}/>
        <Route path="/recruitersFeedback" element={<RecruitersFeedback/>}/>
        <Route path="/parentsFeedback" element={<ParentsFeedback/>} />
        <Route path="/graduateExitSurvey" element={<GraduateExitSurvey/>}/>
        <Route path="/courseExitSurvey" element={<CourseExitSurvey/>}/>
        <Route path = "/alumniFeedback" element = {<AlumniFeedback/>}/>
        <Route path="/employerFeedback" element={<EmployerFeedback/>}/>
      </Routes>
    </Router>
  );
}

export default App;
