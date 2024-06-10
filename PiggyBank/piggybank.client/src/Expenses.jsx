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
            if (!sortedData[item.roomName][item.expenseName]) {
                sortedData[item.roomName][item.expenseName] = [];
            }
            sortedData[item.roomName][item.expenseName].push({
                purchaseDate: item.purchaseDate,
                itemName: item.itemName,
                itemPrice: item.itemPrice
            })
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
                                {Object.entries(userRooms[roomName]).map(([expenseName, expense], index) => (
                                    <div key={expenseName}>
                                        <h3>{expenseName}</h3>
                                        {expense.map((item, itemIndex) => (
                                            <div key={itemIndex}>
                                                <p>{item.itemName}: {item.itemPrice}</p>
                                            </div>
                                        ))}
                                        <h3>Add new item</h3>
                                        <div id="new-items">
                                            <p>Name</p>
                                            <input type="search" />
                                            <p>Price</p>
                                            <input type="search" />
                                            <button class="btn btn-outline-secondary">Add</button>
                                        </div>
                                    </div>
                                ))}
                                <h3>Add new expense</h3>
                                <div id="new-expenses">
                                    <p>Name</p>
                                <input type="search" />
                                <p>Purchase Date</p>
                                <input type="search" />
                                <button class="btn btn-outline-secondary">Add</button>
                                </div>
                        </div>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Expenses;
