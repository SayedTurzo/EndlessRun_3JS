import * as THREE from 'three';
import { Audio, AudioListener, AudioLoader } from 'three';

export function loadBackgroundMusic(camera) {
    // Create an AudioListener and add it to the camera
    const listener = new AudioListener();
    camera.add(listener);

    // Create an AudioLoader
    const audioLoader = new AudioLoader();

    // Load a sound and set it as the background music
    audioLoader.load('/Music/buckethead-baptism.mp3', function(buffer) {
        const music = new Audio(listener);
        music.setBuffer(buffer);
        music.setLoop(true); // Loop the music
        music.setVolume(0.5); // Adjust the volume
        music.play(); // Start playing the music
    });
}
