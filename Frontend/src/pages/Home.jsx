import React, { useContext } from 'react';
import Header from '../components/Header';
import CardPizza from '../components/CardPizza'; 
import { DataPizzaContext } from '../contexts/DataPizzaContext';

const Home = () => {
    const { dataPizza, isLoading } = useContext(DataPizzaContext);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (dataPizza.length === 0) {
        return <div>No pizzas available</div>;
    }

    return (
        <>
            <div className="container-fluid p-0">
                <Header />
                <div className="row">
                    {dataPizza.map((pizza) => (
                        <div  className="col-12 col-md-4" key={pizza.id}>
                            <CardPizza pizza={pizza} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;


