import { createStandaloneToast, Spinner, useToast } from "@chakra-ui/react";
import axios from "axios";


export const getInfo = async () => {
    // const info = await axios.get("https://pacific-lowlands-66049.herokuapp.com/");
    const info = await axios.get("http://localhost:3001/");
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

    let incomes = sumAmounts(arr.filter(element => element.type === "income"))
    let expenses = sumAmounts(arr.filter(element => element.type === "expense"))

    result = {
        incomes: incomes,
        expenses: expenses,
        balance: incomes - expenses,
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



export const customizeDate = (str) => {
    let customDate = str.replaceAll('/', '-').split('-').reverse()
    if (customDate[1].length === 1) {
        customDate[1] = `0${customDate[1]}`
    }
    if (customDate[2].length === 1) {
        customDate[2] = `0${customDate[2]}`
    }
    customDate = customDate.join('-')
    return customDate
}


export const postMovement = async (state, chakraTool) => {
    chakraTool({
        title: "Procesando...",
        description: "",
        status: 'info',
        duration: 2000,
        isClosable: true,
        position: "top-right"
    })
    try {
        await axios.post('http://localhost:3001/', state)
        chakraTool({
            title: "Listo!",
            description: "Movimiento cargado",
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: "top-right"
        })
    }
    catch (error) {
        chakraTool({
            title: "Error",
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: "top-right"
        })
    }
}

export const updateMovement = async (state, chakraTool) => {
    chakraTool({
        title: "Procesando...",
        description: "",
        status: 'info',
        duration: 2000,
        isClosable: true,
        position: "top-right"
    })
    try {
        let result = await axios.put('http://localhost:3001/', state)
        chakraTool({
            title: "Listo!",
            // description: result.data,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: "top-right"
        })
    }
    catch (error) {
        chakraTool({
            title: "Error",
            // description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: "top-right"
        })
    }
}


export const deleteMovement = async (state, chakraTool) => {
    chakraTool({
        title: "Procesando...",
        description: "",
        status: 'info',
        duration: 2000,
        isClosable: true,
        position: "top-right"
    })
    try {
        await axios.delete('http://localhost:3001/', { data: state })
        chakraTool({
            title: "Listo!",
            description: "Movimiento eliminado",
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: "top-right"
        })
    }
    catch (error) {
        chakraTool({
            title: "Error",
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: "top-right"
        })
    }
}



/* 
    let customDate = item.date.replaceAll('/', '-').split('-').reverse()
    customDate[1] = `0${customDate[1]}`
    customDate[2] = `0${customDate[2]}`
    customDate = customDate.join('-')
*/