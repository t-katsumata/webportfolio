import axios from "axios"

const api = axios.create({
  baseURL: "https://tk-webportfolio.microcms.io/api/v1",
  headers: { "X-API-KEY": import.meta.env.VITE_MICROCMS_API_KEY }
})

export const useWorks = async () => {
  const res = await api.get("/works")
  return res.data.contents
}