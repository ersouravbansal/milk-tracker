import React, { useRef, useEffect, useState } from "react";
import "../styles/home.css";
import Popup from "./Popup";
import ProgressBar from "./ProgressBar";
import audio1 from "../audio/scottBuckleyMoonlight.mp3";
import audio2 from "../audio/AfterTheRain-InspiringAtmosphericMusic.mp3";
import audio3 from "../audio/MoonWaltz.mp3";
import audio4 from "../audio/sbadriftamonginfinitestars.mp3";

const audioFiles = [
  { name: "Audio1", src: audio1 },
  { name: "Audio2", src: audio2 },
  { name: "Audio3", src: audio3 },
  { name: "Audio4", src: audio4 },
];

const HomePage = () => {
  const [isMilking, setIsMilking] = useState(false);
  const [milkingDuration, setMilkingDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState(audioFiles[0]);
  const [milkingStarted, setMilkingStarted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [milkingStopped, setMilkingStopped] = useState(false);
  const [startTimes, setStartTimes] = useState(null);
  const audioRef = useRef(new Audio());
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(selectedAudio.src);
    audioRef.current.currentTime = 0;
    audioRef.current.loop = true;
  }, [selectedAudio]);

  useEffect(() => {
    if (isMilking && !isPaused) {
      audioRef.current.play();
    }
  }, [isMilking, isPaused, selectedAudio]);

  useEffect(() => {
    if (isMilking && !isPaused && !milkingStopped) {
      timerRef.current = setInterval(() => {
        setMilkingDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isPaused, isMilking, milkingStopped]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}h: ${minutes
      .toString()
      .padStart(2, "0")}m: ${seconds.toString().padStart(2, "0")}s`;
  };

  const controlMilking = () => {
    if (!milkingStarted) {
      setIsMilking(true);
      setMilkingDuration(0);
      setMilkingStarted(true);
      setStartTimes(new Date)
      audioRef.current.play();
    } else {
      if (isPaused) {
        setIsPaused(false);
        audioRef.current.play();
      } else {
        setIsPaused(true);
        audioRef.current.pause();
      }
    }
  };

  const stopMilking = () => {
    setMilkingStopped(true);
    audioRef.current.pause();
    setShowPopup(true);
  };

  const handlePopupSubmit = (milkQuantity) => {
    const endTime = new Date();
    const totalMilkingTime = milkingDuration;
    const startTime = startTimes;
    const milkingData = {
      date: new Date().toISOString(),
      startTime: startTime,
      endTime: endTime,
      totalMilkingTime: formatTime(totalMilkingTime),
      milkQuantity: milkQuantity,
    };

    const existingMilkingHistory =
      JSON.parse(localStorage.getItem("milkingHistory")) || [];
    const updatedMilkingHistory = [...existingMilkingHistory, milkingData];

    localStorage.setItem(
      "milkingHistory",
      JSON.stringify(updatedMilkingHistory)
    );

    setIsMilking(false);
    setIsPaused(false);
    setMilkingStarted(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const handleAudioChange = (e) => {
    const selected = audioFiles.find((audio) => audio.name === e.target.value);
    setSelectedAudio(selected);
  };

  return (
    <div className="home-container">
      <h1>Welcome to Milking Tracker with Music</h1>
      <div className="audio-selection">
        <label htmlFor="audio-select">Select Audio:</label>
        <select
          id="audio-select"
          value={selectedAudio.name}
          onChange={handleAudioChange}
        >
          {audioFiles.map((audio, index) => (
            <option key={index} value={audio.name}>
              {audio.name}
            </option>
          ))}
        </select>
      </div>
      {!isMilking ? (
        <button className="start-milking-button" onClick={controlMilking}>
          Start Milking
        </button>
      ) : (
        <div>
          <button className="milking-control-button" onClick={controlMilking}>
            {isPaused ? "Resume" : "Pause"}
          </button>
          <button className="milking-control-button" onClick={stopMilking}>
            Stop
          </button>
          <div className="milking-timer-container">
            <p className="milking-timer">{formatTime(milkingDuration)}</p>
          </div>
        </div>
      )}
      {isMilking && (
        <ProgressBar
          currentTime={audioRef.current.currentTime}
          duration={audioRef.current.duration}
        />
      )}
      <Popup
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        onSubmit={handlePopupSubmit}
      />
    </div>
  );
};

export default HomePage;
