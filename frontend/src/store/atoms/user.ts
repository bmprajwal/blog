import { atom, selector } from "recoil";


export interface User {
	id: string;
	name: string;
	email: string;
}
export const userAtom = atom<User | null>({
  key: "userAtom",
  default: null
})

export const isUserLoggedInSelector = selector({
	key: "isUserLoggedInSelector",
	get: ({get})=>{
		const user = get(userAtom)
		const token = localStorage.getItem("jwt")
		return (user && token)
	}
})