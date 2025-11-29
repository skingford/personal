'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import * as Tone from 'tone';
import { Play, Square, RefreshCw, Volume2, Code, Settings, ChevronUp, ChevronDown } from 'lucide-react';
import './MusicPlayer.scss';

// Preset Algorithms (Patterns)
const PRESETS = {
  'quickSort': {
    name: 'QuickSort March',
    bpm: 120,
    kick: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0],
    snare: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    hihat: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    bass: ['C2', null, 'C2', null, 'G2', null, 'C2', null, 'F2', null, 'F2', null, 'G2', null, 'G2', null]
  },
  'bubbleSort': {
    name: 'BubbleSort Blues',
    bpm: 90,
    kick: [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    snare: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    hihat: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    bass: ['A1', null, 'A1', 'C2', 'D2', null, 'E2', 'G2', 'A1', null, 'A1', 'C2', 'D2', null, 'E2', 'G2']
  }
};

const STEPS = 16;

const MusicPlayer = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [activePreset, setActivePreset] = useState('quickSort');
  const [bpm, setBpm] = useState(120);
  const [volume, setVolume] = useState(-10); // dB
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const dragControls = useDragControls();

  // Sequencer State
  const [grid, setGrid] = useState({
    kick: Array(STEPS).fill(0),
    snare: Array(STEPS).fill(0),
    hihat: Array(STEPS).fill(0),
    bass: Array(STEPS).fill(null)
  });

  // Tone.js Refs
  const synthRef = useRef(null);
  const drumKitRef = useRef(null);
  const seqRef = useRef(null);

  // Handle Client-Side Mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize Tone.js
  useEffect(() => {
    if (!isMounted) return;

    const initTone = async () => {
      // Bass Synth
      synthRef.current = new Tone.MonoSynth({
        oscillator: { type: "square" },
        envelope: { attack: 0.1, decay: 0.3, sustain: 0.2, release: 0.2 }
      }).toDestination();

      // Drum Kit (MembraneSynth for Kick, NoiseSynth for Snare/HiHat)
      drumKitRef.current = {
        kick: new Tone.MembraneSynth().toDestination(),
        snare: new Tone.NoiseSynth({
          noise: { type: 'white' },
          envelope: { attack: 0.005, decay: 0.1, sustain: 0 }
        }).toDestination(),
        hihat: new Tone.MetalSynth({
          frequency: 200,
          envelope: { attack: 0.001, decay: 0.1, release: 0.01 },
          harmonicity: 5.1,
          modulationIndex: 32,
          resonance: 4000,
          octaves: 1.5
        }).toDestination()
      };
      
      // Adjust volumes
      drumKitRef.current.hihat.volume.value = -15;
      drumKitRef.current.snare.volume.value = -10;

      setIsLoaded(true);
      loadPreset('quickSort');
    };

    initTone();

    return () => {
      if (synthRef.current) synthRef.current.dispose();
      if (drumKitRef.current) {
        Object.values(drumKitRef.current).forEach(inst => inst.dispose());
      }
      if (seqRef.current) seqRef.current.dispose();
    };
  }, [isMounted]);

  // Update BPM
  useEffect(() => {
    if (isLoaded) {
      Tone.Transport.bpm.value = bpm;
    }
  }, [bpm, isLoaded]);

  // Update Volume
  useEffect(() => {
    if (isLoaded) {
      Tone.Destination.volume.value = volume;
    }
  }, [volume, isLoaded]);

  // Sequencer Loop
  useEffect(() => {
    if (!isLoaded) return;

    if (seqRef.current) seqRef.current.dispose();

    seqRef.current = new Tone.Sequence((time, step) => {
      // Schedule UI update
      Tone.Draw.schedule(() => {
        setCurrentStep(step);
      }, time);

      // Trigger Drums
      if (grid.kick[step]) drumKitRef.current.kick.triggerAttackRelease("C1", "8n", time);
      if (grid.snare[step]) drumKitRef.current.snare.triggerAttackRelease("8n", time);
      if (grid.hihat[step]) drumKitRef.current.hihat.triggerAttackRelease("32n", time);

      // Trigger Bass
      if (grid.bass[step]) {
        synthRef.current.triggerAttackRelease(grid.bass[step], "8n", time);
      }
    }, [...Array(STEPS).keys()], "16n").start(0);

  }, [grid, isLoaded]);

  const loadPreset = (presetKey) => {
    const preset = PRESETS[presetKey];
    setActivePreset(presetKey);
    setBpm(preset.bpm);
    setGrid({
      kick: [...preset.kick],
      snare: [...preset.snare],
      hihat: [...preset.hihat],
      bass: [...preset.bass]
    });
  };

  const togglePlay = async () => {
    if (!isLoaded) return;
    await Tone.start();
    
    if (isPlaying) {
      Tone.Transport.stop();
      setIsPlaying(false);
      setCurrentStep(0);
    } else {
      Tone.Transport.start();
      setIsPlaying(true);
    }
  };

  const toggleStep = (track, index) => {
    setGrid(prev => {
      const newTrack = [...prev[track]];
      if (track === 'bass') {
        // Simple bass toggle for demo: toggle between C2 and null
        newTrack[index] = newTrack[index] ? null : 'C2';
      } else {
        newTrack[index] = newTrack[index] ? 0 : 1;
      }
      return { ...prev, [track]: newTrack };
    });
  };

  if (!isMounted) return null;

  return (
    <motion.div 
      className={`algo-jukebox ${isExpanded ? 'expanded' : 'collapsed'} ${className}`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      drag
      dragListener={false} // Disable default drag listener
      dragControls={dragControls} // Use explicit drag controls
      dragMomentum={false}
      dragElastic={0}
    >
      {/* Header / Minimized View */}
      <div className="jukebox-header">
        {/* Drag Handle */}
        <div 
          className="header-drag-area" 
          onPointerDown={(e) => dragControls.start(e)}
        >
          <div className="header-info">
            <div className={`status-led ${isPlaying ? 'blink' : ''}`} />
            <span className="title">ALGO_JUKEBOX_V1</span>
          </div>
        </div>

        {/* Controls - Explicitly separate from drag area */}
        <div className="mini-controls">
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            title={isPlaying ? "Stop" : "Play"}
          >
            {isPlaying ? <Square size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
          </button>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
      </div>

      {/* Main Interface */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="jukebox-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {/* Preset Selector */}
            <div className="preset-selector">
              {Object.entries(PRESETS).map(([key, preset]) => (
                <button 
                  key={key}
                  className={`preset-btn ${activePreset === key ? 'active' : ''}`}
                  onClick={() => loadPreset(key)}
                >
                  <Code size={14} />
                  {preset.name}
                </button>
              ))}
            </div>

            {/* Sequencer Grid */}
            <div className="sequencer-grid">
              {['kick', 'snare', 'hihat', 'bass'].map(track => (
                <div key={track} className="track-row">
                  <div className="track-label">{track.toUpperCase()}</div>
                  <div className="steps">
                    {grid[track].map((val, i) => (
                      <button
                        key={i}
                        className={`step-btn ${val ? 'active' : ''} ${currentStep === i ? 'playing' : ''}`}
                        onClick={() => toggleStep(track, i)}
                        title={`${track} [${i}]`}
                      >
                        {val ? (track === 'bass' ? val : '1') : '0'}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Global Controls */}
            <div className="global-controls">
              <div className="control-group">
                <Settings size={14} />
                <span className="label">BPM</span>
                <input 
                  type="number" 
                  value={bpm} 
                  onChange={(e) => setBpm(Number(e.target.value))}
                  className="bpm-input"
                />
              </div>
              <div className="control-group">
                <Volume2 size={14} />
                <input 
                  type="range" 
                  min="-60" 
                  max="0" 
                  value={volume} 
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="volume-slider"
                />
              </div>
              <button className="clear-btn" onClick={() => loadPreset(activePreset)}>
                <RefreshCw size={14} /> Reset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MusicPlayer;
