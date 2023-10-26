import React from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';

const CanvasReact = () => {
    let position = 0;
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    sizes.width < 768 ? (position = -45) : sizes.width < 992 ? (position = -33) : (position = -30);

    const Style = {
        width: '100%',
        height: sizes.width * 0.66,
        backgrounColor: '#ACA7AD',
        maxWidth: '1240px',
        maxHeight: '818.4px',
        margin: 'auto',
        position: 'fixed',
    };

    return (
        <div className='canvasWrapper'>
            <Canvas
                flat // stop the use of the tone mapping => colors became ok as the one we have in blender
                camera={{
                    fov: 32,
                    near: 0.1,
                    far: 200,
                    position: [0, -1, -42],
                    rotation: [3.022, 0, -2 * Math.PI],
                }}
                style={Style}
            >
                <Experience />
            </Canvas>
        </div>
    );
};

export default CanvasReact;
