import './style.css';
import ReactDOM from 'react-dom/client';
// import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import CanvasReact from './Canvas.jsx';

// Debug
import { useControls } from 'leva';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(<CanvasReact />);
