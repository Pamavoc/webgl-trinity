import RAF from '@/classes/RAF'

let raf: RAF | null = null

const useRAF = () => {
	return raf || (raf = new RAF())
}

export default useRAF
