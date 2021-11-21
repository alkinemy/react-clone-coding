import { readFileSync, writeFileSync } from "fs";

export type StoredUserType = {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthday: string;
    profileImage: string;
}

const getList = () => {
    const usersBuffer = readFileSync("data/users.json");
    const usersString = usersBuffer.toString();
    if (!usersString) {
        return [];
    }
    const users: StoredUserType[] = JSON.parse(usersString);
    return users;
}

const exist = ({email}: { email: string }) => {
    const users = getList();
    return users.some((user) => user.email === email);
};

const write = async (users: StoredUserType[]) => {
    writeFileSync("data/users.json", JSON.stringify(users));
};

export default { getList, exist, write };