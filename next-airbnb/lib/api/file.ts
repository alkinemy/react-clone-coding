import axios from "./index";


export const uploadFileAPI = (file: FormData) => axios.post("/api/files/upload", file);
