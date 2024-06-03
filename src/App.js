import logo from './logo.svg';
import './App.css';

function App() {
  return (
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="dashboard" element={<Dashboard />} />
   </Routes>
  );
}

export default App;
