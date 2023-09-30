import React, { useRef, useState, useMemo } from 'react';

// Drei imports
import { useAnimations, Stars, Sparkles } from '@react-three/drei';

// Debug
import { useControls } from 'leva';

// R3F imports
import { useFrame } from '@react-three/fiber';

const Lids = ({ scene, texture, completionFunction }) => {
    const [hitSound] = useState(() => new Audio('./success.mp3'));
    const [hitFinalSound] = useState(() => new Audio('./santa-claus.mp3'));

    let completionCount = 0;

    // Objects of the scene
    const nodes = scene.nodes;

    // Debug
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

    function Model(props) {
        const [actionPlay, setActionPlay] = useState(false);

        let letterAnimationName = null;

        // Animations
        const animations = useAnimations(scene.animations, nodes[props.name]);
        const letterAnimations = useAnimations(scene.animations, nodes[props.letterName]);

        const animationName = animations.names[props.number];

        if (props.letterName) {
            letterAnimationName = animations.names[props.i + 6];
        }

        const eventHandler = (e) => {
            e.stopPropagation();

            const action = animations.actions[animationName];
            const letterAction = letterAnimations.actions[letterAnimationName];

            console.log(letterAction);

            action.play();
            letterAction.play();

            setActionPlay(true);

            hitSound.currentTime = 0;
            hitSound.volume = 0.2;
            hitSound.play();

            action.repetitions = 1;
            letterAction.repetitions = 1;

            letterAction.clampWhenFinished = true;

            if (letterAction.isRunning() === true) {
                completionCount = completionCount + 1;
            }
        };

        // useFrame((state) => {
        //     if (actionPlay === true) {
        //         state.scene.children[15].visible = false;
        //     }
        //     if (completionCount === 0) {
        //         state.scene.children[16].visible = false;
        //     }

        //     if (completionCount === 6) {
        //         window.setTimeout(() => {
        //             state.scene.children[16].visible = true;
        //         }, 2000);
        //     }
        // });

        if (props.name === 'pointing_hand') {
            const action = animations.actions[animationName];
            action.play();

            return (
                <mesh>
                    <primitive object={nodes[props.name]}>
                        <meshBasicMaterial map={texture} />
                    </primitive>
                </mesh>
            );
        }

        if (completionCount === 6) {
            hitFinalSound.currentTime = 0;
            hitFinalSound.volume = 0.2;
            window.setTimeout(() => {
                hitFinalSound.play();
            }, 2000);
        }

        return (
            <>
                <group
                    onPointerEnter={() => {
                        document.body.style.cursor = 'pointer';
                    }}
                    onPointerLeave={() => {
                        document.body.style.cursor = 'grab';
                    }}
                >
                    <mesh onClick={eventHandler}>
                        <primitive object={nodes[props.name]}>
                            <meshBasicMaterial map={texture} />
                        </primitive>
                    </mesh>

                    {props.boxName && (
                        <mesh onClick={eventHandler}>
                            <primitive object={nodes[props.boxName]}>
                                <meshBasicMaterial map={texture} />
                            </primitive>
                        </mesh>
                    )}
                </group>

                {props.letterName && (
                    <mesh>
                        <primitive object={nodes[props.letterName]}>
                            <meshBasicMaterial map={texture} />
                        </primitive>
                    </mesh>
                )}
            </>
        );
    }

    return (
        <>
            {/* Gifts covers */}
            <Model
                name={'export_gift_01_lid'}
                boxName={'export_gift_01_box'}
                letterName={'letter_01_t'}
                number={2}
                i={9}
            />
            <Model
                name={'export_gift_02_lid'}
                boxName={'export_gift_02_box'}
                letterName={'letter_05_c'}
                number={3}
                i={13}
            />
            <Model
                name={'export_gift_03_lid'}
                boxName={'export_gift_03_box'}
                letterName={'letter_04_u'}
                number={4}
                i={12}
            />
            <Model
                name={'export_gift_04_lid'}
                boxName={'export_gift_04_box'}
                letterName={'letter_02_i'}
                number={5}
                i={10}
            />
            <Model
                name={'export_gift_05_lid'}
                boxName={'export_gift_05_box'}
                letterName={'letter_06_a'}
                number={6}
                i={14}
            />
            <Model
                name={'export_gift_06_lid'}
                boxName={'export_gift_06_box'}
                letterName={'letter_03_j'}
                number={7}
                i={11}
            />

            {/* Pointing hand */}
            <Model
                name={'pointing_hand'}
                letterName={null}
                number={8}
                i={6}
            />

            {/* Particles */}
            <Sparkles
                size={30}
                scale={[8, 2, 10]}
                position={[-4, -3, -7]}
                speed={0.5}
                count={60}
                color={'#ffffff'}
            />
        </>
    );
};

export default Lids;
