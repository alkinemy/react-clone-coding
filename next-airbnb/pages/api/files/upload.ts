import {NextApiRequest, NextApiResponse} from "next";
import formidable from "formidable";
import Data from "../../../lib/data";

export const config = {
    api: {
        bodyParser: false,
    },
};


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const form = new formidable.IncomingForm();
            const path = await new Promise((resolve, reject) => {
                form.parse(req, async (err, fields, files) => {
                    const path = Data.photo.write(files.file)
                    resolve(path);
                });
            });
            res.statusCode = 201;
            return res.send(path);
        } catch (e) {
            console.log(e);
            return res.end();
        }
    }
    res.statusCode = 405;
    return res.end();
}