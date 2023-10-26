import React, { useState, useRef } from 'react';
import { Leva } from 'leva';

// Drei
import {
    useGLTF,
    useTexture,
    PresentationControls,
    useAnimations,
    Sparkles,
    PointMaterial,
    Stars,
} from '@react-three/drei';

// R3F imports
import { useFrame } from '@react-three/fiber';

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

    // Debug
    const { color } = useControls('Background', {
        color: '#13323e',
    });

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

    // Pointing hand animation
    const name = 'pointing_hand';
    const animations = useAnimations(scene.animations, nodes[name]);
    const animationName = animations.names[8];
    const action = animations.actions[animationName];
    action.play();

    // Refs
    const handRef = useRef();

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

        const mixer = letterAction.getMixer();
        console.log(letterAction.time);

        if (letterAction.time === 0 && letterAction.isRunning() === true) {
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

    useFrame(() => {
        if (actionPlay === true) {
            handRef.current.visible = false;
        }
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
            <Leva hidden={true} />
            <color
                args={[color]}
                attach='background'
            />
            <PresentationControls
                enabled={true} // the controls can be disabled by setting this to false
                global={false} // Spin globally or by dragging the model
                cursor={true} // Whether to toggle cursor style on drag
                speed={1} // Speed factor
                zoom={1} // Zoom factor when half the polar-max is reached
                rotation={[2.1, Math.PI, 0]} // Default rotation
                polar={[0.9, 1.01]} // Vertical limits
                azimuth={[-0.13, 0.18]} // Horizontal limits
                config={{ mass: 2, tension: 400 }} // elastic effect
                snap={{ mass: 4, tension: 400 }} // animation tha makes the object go back to the initial position after a drag and drop
            >
                <group position={[1, -6, -2]}>
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
                    <mesh ref={handRef}>
                        <primitive object={nodes.pointing_hand}>
                            <meshBasicMaterial map={bakedTexture} />
                        </primitive>
                    </mesh>

                    {/* Spakles */}
                    {/* <Sparkles
                        size={50}
                        scale={[4, 2, 4]}
                        position-y={1}
                        speed={0.8}
                        count={40}
                    /> */}
                </group>
            </PresentationControls>
        </>
    );
};

export default Experience;
