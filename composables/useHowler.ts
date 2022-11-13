import Audio from '@/classes/Audio';

let audio: Audio | null = null

const useHowler = () => {
	return audio || (audio = new Audio())
}
export default useHowler

