import Animations from '@/classes/webgl/managers/Animations';

let animations: Animations | null = null

const useAnimations = () => {
	return animations || (animations = new Animations())
}

export default useAnimations