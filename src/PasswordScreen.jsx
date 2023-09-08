import React, { useState, useEffect } from 'react';

import patreon from './assets/patreon.png';
import { Suspense } from 'react';
import rectangle from './assets/rectangle.png';
import { Canvas } from '@react-three/fiber';
import { Model } from './Marine-mini';
import { defaultState } from './defaultState';
import { OrbitControls } from '@react-three/drei';
import { Html } from '@react-three/drei';

export const paints = [
  {
    name: 'auricArmour',
    color: '#f5b13d',
    metal: true,
    company: 'Games Workshop',
  },
  { name: `Calgar Blue`, color: '#2a497f', company: 'Games Workshop' },
  {
    name: 'white',
    color: '#fafafa',
    company: 'Games Workshop',
  },
  {
    name: 'black',
    color: '#222',
    company: 'Games Workshop',
  },
];

export default function PasswordScreen({ setHasLoaded }) {
  const [inputValue, setInputValue] = useState('');
  const [currentPaint, setCurrentPaint] = useState(paints[1]);
  const [modelAttachments, setModelAttachments] = React.useState(defaultState);
  function buildSquad() {
    const squadArr = [];
    for (let i = 0; i < 1; i++) {
      squadArr.push(
        <group position={[0, 0, 0]} key={`model_${i}`}>
          <Model
            neck={0}
            torsoBone={0}
            torsoTopBone={0}
            armRRot={0}
            arm={0}
            armR={modelAttachments.armR[`${i}`]}
            attachment={modelAttachments.attachment[`${i}`]}
            head={modelAttachments.head[`${i}`]}
            ironCross={modelAttachments.ironCross[`${i}`]}
            shield={modelAttachments.shield[`${i}`]}
            currentPaint={currentPaint}
            show={true}
            squadIndex={i}
            baseColor={{ color: 'gray' }}
            clone={false}
          />
        </group>
      );
    }
    return squadArr;
  }

  useEffect(() => {
    inputValue === 'patreon' && setHasLoaded(true);
  }, [inputValue]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        flexDirection: 'column',
        background: `radial-gradient(50% 50% at 50% 50%, #555 0%, #000 100%)`,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          position: 'fixed',
          flexDirection: 'column',
          background: 'rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 300,
              height: 80,
              backgroundImage: `url(${rectangle})`,
              position: 'absolute',
              marginLeft: -150,
              marginTop: -150,
              top: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              filter: 'hue-rotate(20deg) saturate(0%)',
              overflow: 'hidden',
              boxShadow: '20px 20px 10px rgba(0,0,0,0.3)',
              opacity: 0.1,
            }}
          >
            <div
              style={{
                width: 40,
                height: 80,
                background: `rgba(255,255,255,0.8)`,
                transform: 'skewX(-20deg)',
                position: 'absolute',
                left: -20,
                top: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            ></div>
            <div
              style={{
                width: 20,
                height: 80,
                background: `rgba(255,255,255,0.8)`,
                transform: 'skewX(-20deg)',
                position: 'absolute',
                left: 30,
                top: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            ></div>
            <h1
              style={{
                position: 'absolute',
                color: 'rgba(255,255,255,1)',
                margin: 0,
                padding: 0,
                right: 2,
                top: -4,
                fontSize: '2rem',
                fontFamily: `'Iceland', cursive`,
                fontWeight: 'normal',
              }}
            >
              MP3D
            </h1>
            <h1
              style={{
                color: 'rgba(255,255,255,1)',
                margin: 0,
                padding: 0,
                position: 'absolute',
                marginBottom: -100,
                fontSize: '0.8rem',
                right: '0px',
              }}
            >
              Model Painter 3D
            </h1>
          </div>
          <Canvas
            shadows={true}
            style={{
              width: '100%',
              height: '100%',
              position: 'fixed',
              left: 0,
              top: 0,
              zIndex: 10,
            }}
            camera={{ fov: 50, position: [0, 40, 140], near: 0.1, zoom: 1 }}
          >
            <group>
              <ambientLight intensity={0.16} />
            </group>
            <group>
              <group position={[0, 180, 40]}>
                <spotLight
                  intensity={1 * 2}
                  castShadow
                  penumbra={1}
                  shadow-mapSize-height={1024}
                  shadow-mapSize-width={1024}
                />
              </group>
              <group position={[0, -20, -80]}>
                <spotLight intensity={1 * 1} penumbra={1} />
              </group>
              <group position={[0, -20, 80]}>
                <spotLight intensity={1 * 0.5} penumbra={1} />
              </group>
            </group>
            <OrbitControls autoRotate={true} autoRotateSpeed={0.4} />
            <Suspense fallback={null}>
              <group visible={true} scale={0.6} position={[0, 20, 0]}>
                {buildSquad('termie')}
                <group position={[-20, -10, 2]}>
                  <Html center={true}>
                    <div
                      style={{
                        color: 'rgba(0,0,0,1)',
                        boxShadow: ' 0px 0px 5px rgba(0,0,0,0.1)',
                        fontFamily: 'Roboto,sans-serif',
                        borderBottom: '1px solid #fff',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minWidth: '230px',
                        right: '100%',
                        position: 'absolute',
                        opacity: 0.2,
                        pointerEvents: 'none',
                      }}
                    >
                      <div
                        style={{
                          color: 'rgba(255,255,255,1)',
                          textAlign: 'left',
                          padding: 5,
                          borderRadius: 2,
                          width: 132,
                          fontFamily: 'Roboto,sans-serif',
                          position: 'absolute',
                          left: '-4px',
                          bottom: '-30px',
                        }}
                      >
                        Storm Bolter
                      </div>
                    </div>
                  </Html>
                </group>
                <group position={[16, -2, 2]}>
                  <Html center={true}>
                    <div
                      style={{
                        color: 'rgba(0,0,0,1)',
                        boxShadow: ' 0px 0px 5px rgba(0,0,0,0.1)',
                        fontFamily: 'Roboto,sans-serif',
                        borderBottom: '1px solid #fff',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minWidth: '230px',
                        left: '100%',
                        position: 'absolute',
                        opacity: 0.2,
                        pointerEvents: 'none',
                      }}
                    >
                      <div
                        style={{
                          color: 'rgba(255,255,255,1)',
                          textAlign: 'right',
                          padding: 5,
                          borderRadius: 2,
                          width: 132,
                          fontFamily: 'Roboto,sans-serif',
                          position: 'absolute',
                          right: '-4px',
                          bottom: '-30px',
                        }}
                      >
                        Power Fist
                      </div>
                    </div>
                  </Html>
                </group>
              </group>
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div
        style={{
          zIndex: 10,
          marginBottom: -180,
          display: 'flex',
          background: 'rgba(255,255,255,0.4)',
          borderRadius: 30,
        }}
      >
        {paints.map((paint) => {
          return (
            <div
              style={{
                borderRadius: '50%',
                background: paint.color,
                height: 30,
                width: 30,
                margin: 3,
                opacity: currentPaint.name === paint.name ? 1 : 0.5,
                cursor: 'pointer',
              }}
              onClick={() => setCurrentPaint(paint)}
            ></div>
          );
        })}
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          display: 'flex',
          height: 40,
          alignItems: 'space-between',
          justifyContent: 'space-between',
          width: '100%',
          padding: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderRadius: 10,
            padding: '10px',
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          <input
            style={{
              outline: 'none',
              padding: 10,
              borderRadius: 5,
              border: 'none',
              textAlign: 'center',
              width: 200,
              background: 'rgba(255,255,255,0.2)',
            }}
            placeholder=" Enter your Patreon Code"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="password"
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderRadius: 10,
            padding: '10px',
            color: 'rgba(255,255,255,0.4)',
            fontWeight: 'bold',
            fontSize: '0.8rem',
          }}
        >
          <p>Visit</p>
          <a
            style={{
              color: 'rgba(255,255,255,1)',
              borderRadius: '5px',
              margin: 0,
              textDecoration: 'none',
            }}
            href="https://patreon.com/3dminipainterhtml"
            target="_blank"
            noreferrer
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: 10,
                padding: '10px',
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              <img src={patreon} style={{ height: 20, marginRight: 10 }} />
              PATREON
            </div>
          </a>
          <p>for full access</p>
        </div>
      </div>
    </div>
  );
}
