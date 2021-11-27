import {readFileSync, writeFileSync} from "fs";
import {v4 as uuidv4} from "uuid";


const write = (file) => {
    const fileExtension = file.originalFilename.split(".").pop();
    let path = `data/photo/${uuidv4()}.${fileExtension}`;
    writeFileSync(path, readFileSync(file.filepath));
    return path;
}

const read = (path: string) => {
    return readFileSync(path);
}

export default { write, read }