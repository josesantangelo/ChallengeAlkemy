import axios from "axios";

export const getInfo = async () => {
    const info = await axios.get("https://pacific-lowlands-66049.herokuapp.com/");
    // const info = await axios.get("http://localhost:3001/");
    const data = info.data;
    return data;
}