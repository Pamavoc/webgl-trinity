import AudioManager from '@/classes/utils/audio';

let audio: AudioManager | null = null


const useAudio = (emitter) => {
	return audio || (audio = new AudioManager(emitter))
}
export default useAudio

