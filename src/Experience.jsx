import React, { useMemo, useState, useRef } from 'react';

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
    // Model
    const scene = useGLTF('./model/indiana_tijuca_christmas_scene_v5.glb');
    const nodes = scene.nodes;

    // Texture
    const bakedTexture = useTexture('./model/baked_denoised_and_color_corrected.webp');
    bakedTexture.flipY = false;

    // Objects
    const lidsNames = [
        'export_gift_01_lid',
        'export_gift_02_lid',
        'export_gift_03_lid',
        'export_gift_04_lid',
        'export_gift_05_lid',
        'export_gift_06_lid',
    ];

    const boxNames = [
        'export_gift_01_box',
        'export_gift_02_box',
        'export_gift_03_box',
        'export_gift_04_box',
        'export_gift_05_box',
        'export_gift_06_box',
    ];

    const letterNames = [
        'letter_01_t',
        'letter_05_c',
        'letter_04_u',
        'letter_02_i',
        'letter_06_a',
        'letter_03_j',
    ];

    let i = [9, 13, 12, 10, 14, 11];

    // Sounds
    const [hitSound] = useState(() => new Audio('./success.mp3'));
    const [hitFinalSound] = useState(() => new Audio('./santa-claus.mp3'));

    // Animations
    const [count, setCount] = useState(0);
    const [actionPlay, setActionPlay] = useState(false);

    /** Function to Handle Click */
    const eventHandler = (e, animations, letterAnimations, animationName, letterAnimationName) => {
        e.stopPropagation();
        const action = animations.actions[animationName];
        const letterAction = letterAnimations.actions[letterAnimationName];

        action.play();
        letterAction.play();

        // Animation sound
        if (letterAction.isRunning() === true) {
            hitSound.currentTime = 0;
            hitSound.volume = 0.2;
            hitSound.play();
        }

        // State management to verify when the animation is playing
        setActionPlay(true);

        // Animation parameters
        letterAction.repetitions = 1;
        window.setTimeout(() => {
            action.stop();
        }, 2000);

        // To fix the final position at the letter at the final moment of the animation
        letterAction.clampWhenFinished = true;

        if (letterAction.isRunning()) {
            // console.log('Letter is being animated!');
            setCount((prevCount) => prevCount + 1);
        }
    };

    // Adding the Objects to the scene
    const lids3D = lidsNames.map((name, index) => {
        return (
            <Lids
                key={index}
                name={name}
                boxName={boxNames[index]}
                letterName={letterNames[index]}
                number={index + 2}
                i={i[index]}
                scene={scene}
                texture={bakedTexture}
                eventHandler={eventHandler}
            />
        );
    });

    useFrame((state) => {
        if (actionPlay === true) {
            state.scene.children[14].visible = false;
        }
        console.log(state.camera.position);
    });

    // Verifying the state of the count to play the final effects
    if (count === 6) {
        hitFinalSound.currentTime = 0;
        hitFinalSound.volume = 0.2;
        window.setTimeout(() => {
            hitFinalSound.play();
        }, 2000);
    }

    return (
        <>
            <color
                args={['#ACA7AD']}
                attach='background'
            />
            <OrbitControls
                makeDefault
                // enableZoom={true}
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

            {/* Gifts covers */}
            {lids3D}

            {/* Pointing hand */}
            <Lids
                name={'pointing_hand'}
                letterName={null}
                number={8}
                i={6}
                scene={scene}
                texture={bakedTexture}
            />
        </>
    );
};

export default Experience;
