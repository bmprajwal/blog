import axios from "axios";
import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { BACKEND_URL } from "../../config";

export const blogsAtom = atom({
  key: "blogsAtom",
  default: selector({
    key: "blogsSelector",
    get: async ()=> {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`)
      const blogs = response.data.blogs
      return blogs
    }
  })
})

export const blogsAtomFamily = atomFamily({
  key: "blogsAtomFamily",
  default: selectorFamily({
    key: "blogsSelectorFamily",
    get: function(id:string){
      return  async () => {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      })
      const blog = response.data
      
      return blog
    }
  }
  })
})