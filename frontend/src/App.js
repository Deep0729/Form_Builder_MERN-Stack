import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormEditor from './pages/FormEditor';
import FormFill from './pages/FormFill';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FormEditor />} />
                <Route path="/form/:id" element={<FormFill />} />
            </Routes>
        </Router>
    );
}

export default App;
