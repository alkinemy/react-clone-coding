

export const cookieStringToObject = (cookieString: string | undefined) => {
    const cookies: { [key: string]: string } = {};
    if (cookieString) {
        const itemString = cookieString?.split(/\s*;\s*/);
        itemString.forEach((pairs) => {
            const pair = pairs.split(/\s*=\s*/);
            cookies[pair[0]] = pair.splice(1).join("=");
        });
    }
    return cookies;
}

export const getNumber = (string: string) => {
    const numbers = string.match(/\d/g)?.join("");
    if (numbers) {
        return Number(numbers);
    }
    return null;
}

export const makeMoneyString = (input: string) => {
    const amountString = input.replace(/[^0-9]/g, "");
    if (amountString) {
        return parseInt(amountString, 10).toLocaleString();
    }
    return "";
};