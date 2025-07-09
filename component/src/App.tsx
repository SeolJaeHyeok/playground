import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import InputPage from './pages/InputPage';
import ButtonPage from './pages/ButtonPage';
import TextPage from './pages/TextPage';
import LabelPage from './pages/LabelPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/label" element={<LabelPage />} />
        <Route path="/button" element={<ButtonPage />} />
        <Route path="/text" element={<TextPage />} />
      </Routes>
    </Router>
  );
}

export default App;
