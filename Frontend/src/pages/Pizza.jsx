import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { DataPizzaContext } from '../contexts/DataPizzaContext';

export const Pizza = () => {
  const { id } = useParams();
  const { dataPizza } = useContext(DataPizzaContext);
  const { addCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    if (dataPizza.length > 0) {
      const foundPizza = dataPizza.find(p => p.id === id);
      setPizza(foundPizza);
    }
  }, [dataPizza, id]);

  if (!pizza) {
    return <p>Loading...</p>;
  }

  return (
    <div className="cardPizza mb-4 mt-4 col d-flex justify-content-center">
      <img
        src={pizza.img || 'default-image.jpg'}
        alt={pizza.name || 'Pizza'}
        className="card-img-top rounded mx-auto d-block"
      />
      <div className="card-body">
        <h2 className="card-title text-center text-uppercase mt-4 mb-4">{pizza.name || 'Nombre de Pizza'}</h2>
        <p className='card-text text-start m-4 text-justify'>{pizza.desc || 'Descripción no disponible'}</p>
        <p className="card-text m-4 "><strong>Ingredientes:</strong></p>
        <ul className="card-text list-inline m-4">
          {(pizza.ingredients || []).map((ingredient, index) => (
            <li key={index} className="list-group-item"> 🍕{ingredient}</li>
          ))}
        </ul>
        <h4 className="card-text text-center p-1">
          <strong>Precio: ${pizza.price ? pizza.price.toLocaleString() : '0.00'}</strong>
        </h4>
        <div className="d-flex justify-content-evenly">
          <button
            className="btn btn-primary px-2" onClick={() => { addCart({ ...pizza, count: 1 })}}> 🛒<strong>Añadir</strong>
          </button>
          <button onClick={() => navigate("/") } className="btn btn-primary px-2"> 🍕 Home</button>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
