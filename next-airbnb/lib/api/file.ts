import {default as serverAxios} from "./index";
import {default as generalAxios} from "axios";


export const uploadFileAPI = (file: FormData) => serverAxios.post("/api/files/upload", file);

export const getPhotoAPI = (url: string) => generalAxios.get(url);
