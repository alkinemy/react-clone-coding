import {NextApiRequest, NextApiResponse} from "next";
import Data from "../../../lib/data";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        try {
            const id = req.query.id as string;
            const photo = Data.photo.read(id);
            res.statusCode = 200;
            return res.send(photo);
        } catch (e) {
            console.log(e);
            res.statusCode = 500;
            return res.end();
        }
    }
    res.statusCode = 405;
    return res.end();
}