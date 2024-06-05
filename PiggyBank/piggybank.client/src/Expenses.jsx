import { useEffect, useState } from 'react';
import './Expenses.css';

export function Expenses() {
    const [items, setItems] = useState([]); // Initialize with an empty array

    useEffect(() => {
        populateItemsData();
    }, []);

    async function populateItemsData() {
        const response = await fetch('home');
        const data = await response.json();
        console.log(data); // Log the response
        setItems(data);
    }

    return (
        <div>
            <h1 id="tableLabel">Items</h1>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item =>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Expenses;
