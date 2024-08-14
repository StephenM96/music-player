import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const MusicPlayer = ({ song }) => {
    return (
        <div>
            <h2>Now Playing:</h2>
            <p>{song.title} - {song.artist}</p>
            <ReactAudioPlayer 
                src={song.url}
                autoPlay
                controls
            />
        </div>
    )
}

export default MusicPlayer