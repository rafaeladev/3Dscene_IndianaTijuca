import React, { useRef } from 'react';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// Debug
import { useControls } from 'leva';

const Star = ({ nodes }) => {
    const { position, scale } = useControls('Sparkles', {
        position: {
            value: { x: 6.8, y: 12, z: 6.2 },
            min: -40,
            max: 40,
            step: 0.1,
        },
        scale: {
            value: { x: 4.1, y: 3.5, z: 3.4 },
            min: -40,
            max: 40,
            step: 0.1,
        },
    });

    return (
        <>
            <EffectComposer>
                <Bloom
                    mipmapBlur
                    intensity={0.5}
                    luminanceThreshold={1}
                />
            </EffectComposer>

            {/* Christmas star */}
            <mesh
                geometry={nodes.export_tree_star.geometry}
                position={nodes.export_tree_star.position}
                onPointerEnter={() => {
                    document.body.style.cursor = 'grab';
                }}
                onPointerLeave={() => {
                    document.body.style.cursor = 'default';
                }}
            >
                <meshBasicMaterial
                    color={[5, 5, 5]}
                    toneMapped={false}
                />
            </mesh>

            {/* Sparkles */}
            {/* <Sparkles
                size={30}
                scale={[scale.x, scale.y, scale.z]}
                position={[position.x, position.y, position.z]}
                speed={0.7}
                count={30}
                opacity={0.5}
                color={'#ffffff'}
            /> */}
        </>
    );
};

export default Star;
