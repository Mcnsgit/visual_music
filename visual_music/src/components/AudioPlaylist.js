import React from 'react';
import '../App.css';

const AudioPlaylist = () => {
  return (
    <div className="w-full">
      <div className="h-2 bg-red-light"></div>
      <div className="flex items-center justify-center h-screen bg-red-lightest">
        <div className="bg-white shadow-lg rounded-lg" style={{width: '45rem'}}>
          <div className="flex">
            <div>
              <img className="w-full rounded hidden md:block" src="https://tailwindcss.com/img/card-top.jpg" alt="Album Pic" />
            </div>
            <div className="w-full p-8">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-2xl text-grey-darkest font-medium">A Sky Full of Stars</h3>
                  <p className="text-sm text-grey mt-1">Ghost Stories</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-8">
                {/* Audio control icons */}
              </div>
            </div>
          </div>
          <div className="mx-8 py-4">
            <div className="flex justify-between text-sm text-grey-darker">
              <p>0:40</p>
              <p>4:20</p>
            </div>
            <div className="mt-1">
              <div className="h-1 bg-grey-dark rounded-full">
                <div className="w-1/5 h-1 bg-red-light rounded-full relative">
                  <span className="w-4 h-4 bg-red absolute pin-r pin-b -mb-1 rounded-full shadow"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlaylist;
