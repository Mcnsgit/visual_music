// Main.js
import React from 'react';
import Playlist from './playlist';
import AudioPlayer from './AudioPlayer';
import FileUpload from './FileUpload';
import VisualizationArea from './VisualizationArea';

const Main = () => {
  return (
    <main className="main-content">
      <FileUpload />
      <Playlist />
      <AudioPlayer />
      <VisualizationArea />
    </main>
  );
};

export default Main;
