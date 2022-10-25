import AudioManager from '@/classes/utils/audio';

let audio: AudioManager | null = null

const useAudio = () => {
	return audio || (audio = new AudioManager())
}

export default useAudio

