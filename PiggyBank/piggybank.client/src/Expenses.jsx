import { useEffect, useState } from 'react';
import './Expenses.css';
import { React, Fragment } from 'react';

export function Expenses() {
    const [items, setItems] = useState([]); // Initialize with an empty array
    const [userRooms, setUserRooms] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [expenseName, setExpenseName] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');

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
            sortedData[item.roomId] = [];
            if (!sortedData[item.roomId][item.expenseName]) {
                sortedData[item.roomId][item.expenseName] = [];
            }
            sortedData[item.roomId][item.expenseName].push({
                purchaseDate: item.purchaseDate,
                itemName: item.itemName,
                itemPrice: item.itemPrice,
                roomName: item.roomName,
                expenseId: item.expenseId,
                roomId: item.roomId
            })
        });
        setUserRooms(sortedData);
        console.log(userRooms); // Log the response
    }

    const handleSubmitItem = async (roomId, expenseName, item) => {
        // Check if the provided roomName matches the available room
        if (userRooms.hasOwnProperty(roomId)) {
            // Access the expenses array for the given room
            const expensesArray = userRooms[roomId];
            // Iterate over each expense in the expenses array
            if (expensesArray.hasOwnProperty(expenseName)) {
                const itemsArray = expensesArray[expenseName];
                // Check if the current expense matches the provided expense

                    try {
                        const itemToAdd = {
                            Name: item.name,
                            Price: item.price,
                            ExpenseId: itemsArray[0].expenseId
                        };

                        // Make a POST request to add the item
                        const response = await fetch(`items/AddItem?item=${itemToAdd}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(itemToAdd),
                        });

                        // Check if the response is ok
                        if (response.ok) {
                            // Push the new item to the expense list
                            itemsArray.push({
                                itemName: item.name,
                                itemPrice: item.price,
                                roomId: roomId,
                                expenseId: itemsArray[0].expenseId
                            });
                        } else {
                            console.error('Failed to add item');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }
            }
        } else {
            console.error('Room not found');
        }
    };

    const handleFormItemSubmit = (roomId, expenseName) => (e) => {
        e.preventDefault();
        const item = {
            name: itemName,
            price: itemPrice
        };
        handleSubmitItem(roomId, expenseName, item);
    };

    const handleSubmitExpense = async (roomId, expense) => {
        debugger;
        // Check if the provided roomName matches the available room
        if (userRooms.hasOwnProperty(roomId)) {
            // Access the expenses array for the given room
            const expensesArray = userRooms[roomId];
            // Iterate over each expense in the expenses array
                try {
                    const expenseToAdd = {
                        Name: expense.name,
                        PurchaseDate: expense.purchaseDate,
                        RoomId: roomId,
                        RoomUserId: JSON.parse(localStorage.getItem('user')).id
                    };
                    debugger;
                    // Make a POST request to add the item
                    const response = await fetch(`items/AddExpense?expense=${expenseToAdd}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(expenseToAdd),
                    });

                    // Check if the response is ok
                    if (response.ok) {
                        // Push the new item to the expense list
                        expensesArray.push({
                            itemName: item.name,
                            itemPrice: item.price,
                            roomId: roomId,
                            expenseId: expense.id
                        });
                    } else {
                        console.error('Failed to add expense');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
        } else {
            console.error('Room not found');
        }
    };

    const handleFormExpenseSubmit = (roomId) => (e) => {
        e.preventDefault();
        const expense = {
            name: expenseName,
            purchaseDate: purchaseDate
        };
        handleSubmitExpense(roomId, expense);
    };

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
                    {Object.keys(userRooms).map(roomId => (
                        <div key={roomId}>
                            <h2>{roomId}</h2>
                                {Object.entries(userRooms[roomId]).map(([expenseName, expense], index) => (
                                    <div key={expenseName}>
                                        <h3>{expenseName}</h3>
                                        {expense.map((item, itemIndex) => (
                                            <div key={itemIndex}>
                                                <p>{item.itemName}: {item.itemPrice}</p>
                                            </div>
                                        ))}
                                        <h3>Add new item</h3>
                                        <div class="new-items">
                                            <form class="item-form" onSubmit={handleFormItemSubmit(roomId, expenseName)}>
                                            <p>Name</p>
                                                <input type="search" onChange={(e) => setItemName(e.target.value)} />
                                            <p>Price</p>
                                                <input type="search" onChange={(e) => setItemPrice(e.target.value)} />
                                            <button class="btn btn-outline-secondary" type="submit">Add</button>
                                        </form>
                                        </div>
                                    </div>
                                ))}
                                <h3>Add new expense</h3>
                            <div class="new-expenses">
                                <form class="expense-form" onSubmit={handleFormExpenseSubmit(roomId)}>
                                    <p>Name</p>
                                    <input type="search" onChange={(e) => setExpenseName(e.target.value)} />
                                <p>Purchase Date</p>
                                    <input type="search" onChange={(e) => setPurchaseDate(e.target.value)} />
                                    <button class="btn btn-outline-secondary" type="submit">Add</button>
                                </form>
                                </div>
                        </div>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Expenses;
