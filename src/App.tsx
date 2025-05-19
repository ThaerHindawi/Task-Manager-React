import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "./components/Tasks";
import NotFound from "./Errors/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path={"/404"} element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
