import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import InputPage from './pages/InputPage';
import ButtonPage from './pages/ButtonPage';
import TextPage from './pages/TextPage';
import LabelPage from './pages/LabelPage';
import InputGroupPage from './pages/InputGroupPage';
import AlternativePatternsPage from './pages/AlternativePatternsPage';
import Advance from './pages/Advance';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/label" element={<LabelPage />} />
        <Route path="/button" element={<ButtonPage />} />
        <Route path="/text" element={<TextPage />} />
        <Route path="/input-group" element={<InputGroupPage />} />
        <Route path="/alternative-patterns" element={<AlternativePatternsPage />} />
        <Route path="/mentoring-benefits" element={<Advance />} />
      </Routes>
    </Router>
  );
}

export default App;
