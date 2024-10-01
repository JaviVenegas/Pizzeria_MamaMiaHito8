import React from 'react';

const Header = () => {
    return (
        <header>
            <div
                className="p-5 text-center bg-image mb-4"
                style={{
                    backgroundImage: 'url("https://arteflame.com/cdn/shop/articles/The_10_Best_Pizza_Toppings_and_Why_They_Reign_Supreme.webp?v=1717620006&width=1600")',
                    height: '17rem',
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    margin: '0'
                }}
            >
                <div
                    className="mask"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                >
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-white">
                            <h1 className="mb-3">Pizzería Mamma Mía</h1>
                            <h4 className="mb-3">¡Las mejores pizzas de Santiago!</h4>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
