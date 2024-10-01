import { createContext, useState, useMemo } from "react";


//Create context
export const CartContext = createContext();

export const CartProvider = ({children}) => {
    

    const [cart, setCart] = useState([]);


//Code to add piza to cart. 
    const addCart = (nuevaPizza) => {
        setCart(prevCarro => {
            const existe = prevCarro.find(pizza => pizza.id === nuevaPizza.id);
            if (existe) {
                return prevCarro.map(pizza =>
                    pizza.id === nuevaPizza.id
                        ? { ...pizza, count: pizza.count + nuevaPizza.count }
                        : pizza
                );
            } else {
                return [...prevCarro, nuevaPizza];
            }
        });
    };

// Code to substract pizzas from cart total 
    const removeFromCart = (pizzaId) => {
        setCart(prevCarro => {
            return prevCarro
                .map(pizza =>
                    pizza.id === pizzaId
                        ? { ...pizza, count: pizza.count > 1 ? pizza.count - 1 : pizza.count }
                        : pizza
                )
                .filter(pizza => pizza.count > 0);
        });
    };

//Detele pizza from cart 

const deletePizza = (pizzaId) => {
    setCart(prevCarro => prevCarro.filter(pizza => pizza.id !== pizzaId));
};

// Code to add cart total
    const total = useMemo(() => {
        return cart.reduce((pz, item) => pz + item.price * item.count, 0);
    }, [cart])

// Code to use sons generated. 
    return (
        <CartContext.Provider value = {{cart, addCart, removeFromCart, deletePizza, total }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider