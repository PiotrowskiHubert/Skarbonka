import { useEffect, useState, useRef } from 'react';
import './Expenses.css';
import { React } from 'react';

export function Expenses() {
    const [items, setItems] = useState([]);
    const [userRooms, setUserRooms] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [expenseName, setExpenseName] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');

    const userRoomsRef = useRef();
    userRoomsRef.current = userRooms;

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
        const sortedData = {};

        data.forEach(item => {
            if (!sortedData[item.roomId]) {
                sortedData[item.roomId] = {
                    roomName: item.roomName,
                    expenses: {}
                };
            }
            if (!sortedData[item.roomId].expenses[item.expenseId]) {
                sortedData[item.roomId].expenses[item.expenseId] = {
                    expenseName: item.expenseName,
                    items: []
                };
            }
            sortedData[item.roomId].expenses[item.expenseId].items.push({
                purchaseDate: item.purchaseDate,
                itemName: item.itemName,
                itemPrice: item.itemPrice,
                itemId: item.itemId,
            });
        });
        setUserRooms(sortedData);
    }

    const handleSubmitItem = async (roomId, expenseId, item) => {
        if (userRooms.hasOwnProperty(roomId)) {
            const expensesArray = userRooms[roomId].expenses;
            if (expensesArray.hasOwnProperty(expenseId)) {
                const itemsArray = expensesArray[expenseId];

                    try {
                        const itemToAdd = {
                            Name: item.name,
                            Price: item.price,
                            ExpenseId: expenseId
                        };

                        const response = await fetch('items/AddItem', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(itemToAdd),
                        });

                        const result = await response.json();
                        
                        //debugger;
                        if (response.ok) {
                            // Push the new item to the expense list
                            itemsArray.items.push({
                                itemName: item.name,
                                itemPrice: parseFloat(item.price),
                                itemId: result.id,
                                roomId: roomId,
                                expenseId: expenseId
                            });
                            setUserRooms({ ...userRoomsRef.current });
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

    const handleFormItemSubmit = (roomId, expenseId) => (e) => {
        e.preventDefault();
        const item = {
            name: itemName,
            price: itemPrice
        };
        handleSubmitItem(roomId, expenseId, item);
    };

    const handleSubmitExpense = async (roomId, expense) => {
        if (userRooms.hasOwnProperty(roomId)) {
            const expensesArray = userRooms[roomId].expenses;
                try {
                    const expenseToAdd = {
                        Name: expense.name,
                        PurchaseDate: expense.purchaseDate,
                        RoomId: roomId
                    };

                    const response = await fetch('items/AddExpense', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(expenseToAdd),
                    });

                    const newExpenseId = await response.json();

                    if (response.ok) {
                        expensesArray[newExpenseId.id] = {
                            expenseName: expense.name,
                            items: []
                        };
                        setUserRooms({ ...userRoomsRef.current });
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

    const countSumOfItems = (roomId, expenseId) => (e) => {
        let sum = 0;
        userRooms[roomId].expenses[expenseId].items.forEach((item) => {
            sum += item.itemPrice;
        });
        sum = sum.toFixed(2);
        return sum;
    };

    const countSumOfExpenses = (roomId) => (e) => {
        let sum = 0;
        const expensesSome = userRooms[roomId].expenses;
        let iterated = false;
        Object.keys(expensesSome).map((expenseId) => {
            expensesSome[expenseId].items.forEach((item) => {
                const price = parseFloat(item.itemPrice);
                if (!isNaN(price)) {
                    sum += price;
                    iterated = true;
                }
            });
        });
        if (iterated) {
            sum = sum.toFixed(2);
        }
        else {
            sum = 0;
        }
        return sum;
    }
    
    const removeItem = async (roomId, expenseId, item) => {
        try {
            const itemToRemove = {
                Id: item.itemId,
                Name: item.itemName,
                Price: item.itemPrice,
                ExpenseId: expenseId
            };

            const response = await fetch('items/RemoveItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemToRemove),
            });

            if (response.ok) {
                const updatedUserRooms = { ...userRoomsRef.current };
                const itemsArray = updatedUserRooms[roomId].expenses[expenseId].items;
                const itemIndex = itemsArray.findIndex(i => i.itemId === item.itemId);
                if (itemIndex > -1) {
                    itemsArray.splice(itemIndex, 1);
                    setUserRooms(updatedUserRooms);
                }
            } else {
                console.error('Failed to add item');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const removeExpense = async (roomId, expenseId) => {
        try {
            const response = await fetch(`items/RemoveExpense?expenseId=${expenseId}`, {
                method: 'POST'
            });

            if (response.ok) {
                const updatedUserRooms = { ...userRoomsRef.current };
                const expensesObject = updatedUserRooms[roomId].expenses;
                delete expensesObject[expenseId];
                setUserRooms(updatedUserRooms);
            } else {
                console.error('Failed to remove item');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

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
                    {Object.keys(userRooms).length > 0 ? (
                        Object.keys(userRooms).map(roomId => (
                        <div className="h-100 p-5 bg-body-tertiary border rounded-3" key={roomId}>
                            <h2>{userRooms[roomId].roomName}</h2>
                            {Object.keys(userRooms[roomId].expenses).length > 0 ? (
                                Object.keys(userRooms[roomId].expenses).map(expenseId => (
                                <div className="h-100 p-5 bg-body-tertiary border rounded-3" key={expenseId}>
                                    <div className="one-row">
                                        <h3>{userRooms[roomId].expenses[expenseId].expenseName}</h3>
                                        <button className="btn btn-outline-secondary" type="button" onClick={() => removeExpense(roomId, expenseId)}>X</button>
                                    </div>
                                    <div>
                                        {userRooms[roomId].expenses[expenseId].items.length > 0 ? (
                                            userRooms[roomId].expenses[expenseId].items.map((item, itemIndex) => (
                                                <div className="one-row" key={itemIndex}>
                                                    {item.itemName !== null ? (
                                                        <>
                                                            <p>{item.itemName}: {item.itemPrice}</p>
                                                            <button className="btn btn-outline-secondary" type="button" onClick={() => removeItem(roomId, expenseId, item)}>X</button>
                                                        </>
                                                    ) : (
                                                        <p>No items</p>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <p>No items</p>
                                        )}
                                        <p>Summary price of items: {countSumOfItems(roomId, expenseId)()}</p>
                                    </div>

                                    <h3>Add new item</h3>
                                    <div className="new-items">
                                        <form className="item-form" onSubmit={handleFormItemSubmit(roomId, expenseId)}>
                                            <p>Name</p>
                                            <input type="search" onChange={(e) => setItemName(e.target.value)} />
                                            <p>Price</p>
                                            <input type="search" onChange={(e) => setItemPrice(e.target.value)} />
                                            <button className="btn btn-outline-secondary" type="submit">Add</button>
                                        </form>
                                    </div>
                                </div>
                                ))
                                ) : (
                                    <p>No expenses</p>
                                )}
                                <p>Summary of room expenses: {countSumOfExpenses(roomId)()}</p>
                            
                                <div className="new-expenses">
                                    <h3>Add new expense</h3>
                                    <form className="expense-form" onSubmit={handleFormExpenseSubmit(roomId)}>
                                        <p>Name</p>
                                        <input type="search" onChange={(e) => setExpenseName(e.target.value)} />
                                        <p>Purchase Date</p>
                                        <input type="search" onChange={(e) => setPurchaseDate(e.target.value)} />
                                        <button className="btn btn-outline-secondary" type="submit">Add</button>
                                    </form>
                                </div>
                        </div>
                        ))
                ) : (
                    <p>No rooms</p>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default Expenses;
