import axios from "axios";

export const getInfo = async () => {
    const info = await axios.get("https://pacific-lowlands-66049.herokuapp.com/");
    // const info = await axios.get("http://localhost:3001/");
    const data = info.data;
    return data;
}

export const calculateBalance = (arr) => {
    let result = {
        balance: 0,
        incomes: 0,
        expenses: 0,
    }
    if (!arr.length) {
        return result;
    }


    const sumAmounts = (array) => {

        let result = array.reduce((a, b) => {
            return a + b.amount;
        }, 0)

        return result
    }

    result = {
        balance: sumAmounts(arr),
        incomes: sumAmounts(arr.filter(element => element.type === "income")),
        expenses: sumAmounts(arr.filter(element => element.type === "expense")),
    }
    return result;
}

export const filterInfo = (arr, str) => {
    if (str === '') {
        return arr;
    }
    let result = arr.filter(element => {
        return element.type === str;
    })
    return result
}