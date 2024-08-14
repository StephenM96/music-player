import React from 'react';

const SongList = ({ songs, onSelect }) =>{
    return (
        <div>
            <h2>Select a Song:</h2>
            <ul>
                {songs.map((song, index) => (
                    <li key={index} onClick={() => onSelect(song)}>
                        {song.title} - {song.artist}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SongList