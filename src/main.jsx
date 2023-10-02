import './style.css';
import ReactDOM from 'react-dom/client';
import Canvas from './Canvas.jsx';

import * as THREE from 'three';
import { extend, createRoot, events } from '@react-three/fiber';
import { StrictMode } from 'react';
extend(THREE);

const root = ReactDOM.createRoot(document.querySelector('#root'));

// const root = createRoot(document.querySelector('#root'));

root.render(
    <StrictMode>
        <Canvas />
    </StrictMode>
);

// window.addEventListener('resize', () => {
//     root.render({
//         events,
//         camera: { position: [0, 0, 50], fov: 50 },
//         size: { width: window.innerWidth, height: window.innerHeight },
//     });
//     root.render(<Canvas />);
// });
// window.dispatchEvent(new Event('resize'));
