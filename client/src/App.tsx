import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import TeacherRoute from "./routes/TeacherRoute";
import Home from "./pages/teacher/home/Home";
import Classroom from "./pages/teacher/classroom/Classroom";
import Exam from "./pages/teacher/exam/Exam";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/teacher" element={<TeacherRoute />}>
          <Route index element={<Home />} />
          <Route path="/teacher/classroom" element={<Classroom />} />
          <Route path="/teacher/exams" element={<Exam />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <TeacherRoute/> */}
    </>
  );
}
