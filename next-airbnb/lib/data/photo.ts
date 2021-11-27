import {readFileSync, writeFileSync} from "fs";
import {v4 as uuidv4} from "uuid";


const photoPathOf = (id: string) => {
    const fileExtension = id.split("_").pop();
    const fileName = `${id}.${fileExtension}`;
    return `data/photo/${fileName}`;
}

const write = (file) => {
    const fileExtension = file.originalFilename.split(".").pop();
    const id = `${uuidv4()}_${fileExtension}`;
    const path = photoPathOf(id);
    writeFileSync(path, readFileSync(file.filepath));
    return id;
}

const read = (id: string) => {
    const path = photoPathOf(id);
    return readFileSync(path);
}

export default { write, read }