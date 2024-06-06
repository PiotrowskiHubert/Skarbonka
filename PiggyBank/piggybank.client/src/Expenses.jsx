import { useEffect, useState } from 'react';
import './Expenses.css';
import { React, Fragment } from 'react';

export function Expenses() {
    const [items, setItems] = useState([]); // Initialize with an empty array
    const [userRooms, setUserRooms] = useState([]);

    useEffect(() => {
        populateItemsData();
        populateUserExpensesData();
    }, []);

    async function populateItemsData() {
        const response = await fetch('items/GetItems');
        const data = await response.json();
        setItems(data);
    }

    async function populateUserExpensesData() {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const response = await fetch(`items/GetRoomExpenses?userId=${userId}`);
        const data = await response.json();
        console.log(data);
        var sortedData = [];
        data.map(item => {
            if (!sortedData[item.roomName]) {
                sortedData[item.roomName] = [];
            }
            sortedData[item.roomName].push({
                expenseName: item.expenseName,
                purchaseDate: item.purchaseDate,
                itemName: item.itemName,
                itemPrice: item.itemPrice
            });
        });
        setUserRooms(sortedData);
        console.log(userRooms); // Log the response
    }

    useEffect(() => {
        console.log(userRooms);
    }, [userRooms]);

    return (
        <div>
            <h1 id="tableLabel">Expenses</h1>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Room name</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(userRooms).map(roomName => (
                        <div key={roomName}>
                            <h2>{roomName}</h2>
                            <ul>
                                {userRooms[roomName].map((expense, index) => (
                                    <div key={index}>
                                        {index === 0 && <h3>{expense.expenseName}</h3>}
                                        <div key={index}>
                                            <p>{expense.itemName}: {expense.itemPrice}</p>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Expenses;
