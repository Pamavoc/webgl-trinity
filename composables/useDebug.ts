import Debug from '@/classes/webgl/managers/Debug';

let debug: Debug | null = null

const useDebug = () => {
	return debug || (debug = new Debug())
}

export default useDebug