import Animations from '@/classes/Animations';

let animations: Animations | null = null

const useAnimations = (webgl) => {
	return animations || (animations = new Animations(webgl))
}

export default useAnimations