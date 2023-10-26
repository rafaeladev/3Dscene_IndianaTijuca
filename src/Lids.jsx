import React from 'react';

// Drei imports
import { useAnimations, Sparkles } from '@react-three/drei';

// Debug
import { useControls } from 'leva';

const Lids = ({ scene, texture, name, boxName, letterName, number, i, eventHandler }) => {
    // Objects of the scene
    const nodes = scene.nodes;

    // Debug
    // const { position, scale } = useControls('Sparkles', {
    //     position: {
    //         value: { x: 6.8, y: 12, z: 6.2 },
    //         min: -40,
    //         max: 40,
    //         step: 0.1,
    //     },
    //     scale: {
    //         value: { x: 4.1, y: 3.5, z: 3.4 },
    //         min: -40,
    //         max: 40,
    //         step: 0.1,
    //     },
    // });

    let letterAnimationName = null;

    // Animations
    const animations = useAnimations(scene.animations, nodes[name]);
    const letterAnimations = useAnimations(scene.animations, nodes[letterName]);

    const animationName = animations.names[number];

    if (letterName) {
        letterAnimationName = animations.names[i + 6];
    }

    if (name === 'pointing_hand') {
        const action = animations.actions[animationName];
        action.play();

        return (
            <mesh>
                <primitive object={nodes[name]}>
                    <meshBasicMaterial map={texture} />
                </primitive>
            </mesh>
        );
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
                {/* Lids geometry */}
                <mesh
                    onClick={(event) =>
                        eventHandler(
                            event,
                            animations,
                            letterAnimations,
                            animationName,
                            letterAnimationName
                        )
                    }
                >
                    <primitive object={nodes[name]}>
                        <meshBasicMaterial map={texture} />
                    </primitive>
                </mesh>

                {/* Boxes geometry */}
                {boxName && (
                    <mesh
                        onClick={(event) =>
                            eventHandler(
                                event,
                                animations,
                                letterAnimations,
                                animationName,
                                letterAnimationName
                            )
                        }
                    >
                        <primitive object={nodes[boxName]}>
                            <meshBasicMaterial map={texture} />
                        </primitive>
                    </mesh>
                )}
            </group>

            {/* Letters geometry */}
            {letterName && (
                <mesh>
                    <primitive object={nodes[letterName]}>
                        <meshBasicMaterial map={texture} />
                    </primitive>
                </mesh>
            )}
        </>
    );
};

export default Lids;
