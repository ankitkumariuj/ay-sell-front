import React, { useState, useEffect } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);  // Initialize with an empty array
    const [loading, setLoading] = useState(true);   // To manage loading state
    const [error, setError] = useState(null);       // To handle errors

    useEffect(() => {
        const url = 'https://real-time-amazon-data.p.rapidapi.com/search?query=t-shirt&page=1&country=IN&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&deals_and_discounts=NONE';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '0ca2bd0cb9msh60d7d79c58dd286p11a53cjsn204e4c806e02',
                'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await fetch(url, options);
                const result = await response.json(); // Parse the response as JSON

                // Ensure that result.products exists and is an array
                if (result && Array.isArray(result.products)) {
                    setProducts(result.products); 
                    console.log(result) // Update the state with the fetched products
                } else {
                    setError('No products found');
                }
                setLoading(false);  // Set loading to false after data is fetched
            } catch (err) {
                setError(err.message);  // Set error if the fetch fails
                setLoading(false);  // Set loading to false if error occurs
            }
        };

        fetchProducts();
    }, []);  // Empty dependency array ensures this runs only once when the component mounts

    // Render loading, error, or product list based on state
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Product List</h1>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="product">
                            <h3>{product.name}</h3>
                            <p>Price: {product.price}</p>
                            <img src={product.image_url} alt={product.name} />
                        </div>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
