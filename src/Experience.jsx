import React, { useMemo } from 'react';

// Drei
import { useGLTF, useTexture, OrbitControls } from '@react-three/drei';

// R3F imports
import { useFrame, useThree } from '@react-three/fiber';

// Debug
import { useControls } from 'leva';

// Components
import Lids from './Lids.jsx';
import Star from './Star.jsx';

const Experience = () => {
    //Window sizes
    // let { width, height } = useThree((state) => state.viewport);

    // Model;
    const scene = useGLTF('./model/indiana_tijuca_christmas_scene_v5.glb');
    const nodes = scene.nodes;

    // Texture
    const bakedTexture = useTexture('./model/baked_denoised_and_color_corrected.webp');
    bakedTexture.flipY = false;

    return (
        <>
            <color
                args={['#ACA7AD']}
                attach='background'
            />
            <OrbitControls
                makeDefault
                // enableZoom={false}
                // enablePan={false}
                // minPolarAngle={Math.PI / 2.1}
                // maxPolarAngle={Math.PI / 1.9}
                // minAzimuthAngle={Math.PI / 1.1}
                // maxAzimuthAngle={-Math.PI / 1.05}
                // rotateSpeed='0.075'
                // dampingFactor='0.025'
            />

            {/* Scene */}
            <mesh
                geometry={nodes.export_main_scene.geometry}
                onPointerEnter={() => {
                    document.body.style.cursor = 'grab';
                }}
                onPointerLeave={() => {
                    document.body.style.cursor = 'default';
                }}
            >
                <meshBasicMaterial map={bakedTexture} />
            </mesh>

            <Star nodes={scene.nodes} />

            <Lids
                scene={scene}
                texture={bakedTexture}
            />
        </>
    );
};

export default Experience;
