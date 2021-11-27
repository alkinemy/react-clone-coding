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
            const url = await new Promise((resolve, reject) => {
                form.parse(req, async (err, fields, files) => {
                    const id = Data.photo.write(files.file)
                    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/files/${id}`;
                    resolve(url);
                });
            });
            res.statusCode = 201;
            return res.send(url);
        } catch (e) {
            console.log(e);
            return res.end();
        }
    }
    res.statusCode = 405;
    return res.end();
}