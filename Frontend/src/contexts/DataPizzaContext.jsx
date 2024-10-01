import { createContext, useState, useEffect } from "react";


//Create context 
export const DataPizzaContext = createContext();

export const DataPizzaProvider = ({children}) => {
    const [dataPizza, setDataPizza] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

//Url for API    
    const urlBase = "http://localhost:5000/api/pizzas";
    const getPizzas = async () => {
        setIsLoading(true);
        try {
        const response = await fetch(urlBase);
        const pizzas = await response.json();
        setDataPizza(pizzas);
        } catch (error) {
        console.error(error);
        } finally {
        setIsLoading(false);
        }
    };
    
    useEffect(() => {
    getPizzas();
    }, []);


// Code to use, sons generated. 
    return (
    <DataPizzaContext.Provider value = {{dataPizza, getPizzas, isLoading }}>
        {children}
    </DataPizzaContext.Provider>
    );

};
export default DataPizzaProvider