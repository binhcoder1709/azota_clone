import { Route, Routes } from "react-router-dom";
import StudentRoute from "./routes/StudentRoute";
import Class from "./pages/student/class/Class";
import NotFound from "./components/NotFound";
import TestExam from "./pages/student/exam/TestExam";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/student" element={<StudentRoute />}>
          <Route path="/student/class" element={<Class />} />
          <Route path="/student/exam-test" element={<TestExam/>}/>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  );
}
