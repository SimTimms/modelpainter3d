import React, { useState, useEffect } from 'react';

import patreon from './assets/patreon.png';
import termie from './assets/termie.png';
import sister from './assets/sister.png';
import necron from './assets/necron.png';

export default function PasswordScreen({
  setHasLoaded,
  hasLoaded,
  setLoadedModel,
}) {
  const [inputValue, setInputValue] = useState('');

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
        background: `radial-gradient(50% 50% at 50% 50%, #01ffff 0%, #000 100%)`,
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
        <h1
          style={{
            color: 'rgba(255,255,255,1)',
            margin: 0,
            textShadow: '3px 3px rgba(0,0,0,0.3)',
            marginBottom: 20,
          }}
        >
          Model Painter 3D
        </h1>
        <h3 style={{ color: 'rgba(255,255,255,1)' }}>
          Enter your Patreon Code
        </h3>
        <input
          style={{
            outline: 'none',
            padding: 10,
            borderRadius: 5,
            border: 'none',
            textAlign: 'center',
            width: 200,
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="password"
        />
        {hasLoaded && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100vw',
              flexWrap: 'nowrap',
              background: 'rgba(0,0,0,0.5)',
              marginTop: 30,
            }}
          >
            <img
              src={termie}
              style={{ display: 'flex', width: '30%', maxWidth: 300 }}
              onClick={() => setLoadedModel('termie')}
            />
            <img
              src={necron}
              style={{ display: 'flex', width: '30%', maxWidth: 300 }}
              onClick={() => setLoadedModel('necron')}
            />
            <img
              src={sister}
              style={{ display: 'flex', width: '30%', maxWidth: 300 }}
              onClick={() => setLoadedModel('sister')}
            />
          </div>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderRadius: 10,
            padding: '10px',
            marginTop: 20,
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          <p>Join on</p>
          <a
            style={{
              color: 'rgba(255,255,255,1)',
              borderRadius: '5px',
              margin: 0,
              padding: '10px',
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
                background: '#fff',
                color: '#000',
                fontWeight: 'bold',
              }}
            >
              <img src={patreon} style={{ height: 20, marginRight: 10 }} />
              PATREON
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
