import axios from "axios";

export const fetcher = async (
    url,
    method = "get",
    headers = {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    ownConfig = false
) => {
    const config = ownConfig ? ownConfig : {
        method,
        headers
    };

    const data = await axios[method](url, config);
    return data;
};