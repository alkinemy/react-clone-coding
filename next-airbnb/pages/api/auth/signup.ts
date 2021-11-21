import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../../lib/data";
import bcrypt from "bcryptjs";
import { StoredUserType } from "../../../lib/data/user";
import jwt from "jsonwebtoken"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        let { email, firstName, lastName, password, birthday } = req.body;
        const userExist = Data.user.exist({email});
        if (userExist) {
            console.log(0);
            res.statusCode = 409;
            res.send("이미 가입된 이메일입니다.");
            return res.end();
        }
        const hashedPassword = bcrypt.hashSync(password, 8);
        const users = Data.user.getList();
        let userId;
        if (users.length === 0) {
            userId = 1;
        } else {
            userId = users[users.length - 1].id + 1;
        }
        const newUser: StoredUserType = {
            id: userId,
            email,
            firstName,
            lastName,
            password: hashedPassword,
            birthday,
            profileImage: "/static/image/user/default_user_profile_image.jpg",
        };
        await Data.user.write([...users, newUser]);

        const token = jwt.sign(String(newUser.id), "" + process.env.JWT_SECRET!);
        res.setHeader(
            "Set-Cookie",
            `access_token=${token}; path=/; expires=${new Date(Date.now() + 60 * 60 * 24 * 1000 * 3).toUTCString()}; httponly`
        )
        const newUserWithoutPassword: Partial<Pick<StoredUserType, "password">> = newUser;
        delete newUserWithoutPassword.password;
        res.statusCode = 200;
        return res.send(newUser);
    }
    res.statusCode = 405;
    return res.end();
}