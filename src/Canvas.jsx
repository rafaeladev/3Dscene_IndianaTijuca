import React from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';

const CanvasReact = () => {
    return (
        <Canvas
            flat // stop the use of the tone mapping => colors became ok as the one we have in blender
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [0, -1, -42],
                rotation: [3.022, 0, -2 * Math.PI],
            }}
        >
            <Experience />
        </Canvas>
    );
};

export default CanvasReact;
