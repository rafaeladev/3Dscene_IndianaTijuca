import React from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';

const CanvasReact = () => {
    let position = 0;
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    sizes.width < 768 ? (position = -45) : sizes.width < 992 ? (position = -33) : (position = -28);

    // const Style = {
    //     width: sizes.width < 768 ? '100%' : sizes.width < 992 ? '95%' : '95%',
    //     height: sizes.width < 768 ? '33%' : sizes.width < 992 ? '45%' : '66%',
    //     margin: 'auto',
    //     backgrounColor: '#ACA7AD',
    // };

    const Style = {
        width: sizes.width < 768 ? '100%' : sizes.width < 992 ? '100%' : '60%',
        height: '100%',
        margin: 'auto',
    };

    const divStyle = {
        width: sizes.width < 768 ? '100%' : sizes.width < 992 ? '100%' : '80%',
        height: sizes.width < 768 ? '350px' : sizes.width < 992 ? '600px' : '600px',
    };

    return (
        // <div
        //     className='canvasWrapper'
        //     style={divStyle}
        // >
        <Canvas
            flat // stop the use of the tone mapping => colors became ok as the one we have in blender
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [0, -1, -42],
                // position: [2, 0, position],
                rotation: [3.022, 0, -2 * Math.PI],
            }}
            // style={Style}
        >
            <Experience />
        </Canvas>
        // </div>
    );
};

export default CanvasReact;
