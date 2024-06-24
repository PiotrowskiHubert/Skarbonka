import { useEffect, useState } from 'react';
import './Rooms.css';

export function Rooms() {
    const [modalRoom, setModalRoom] = useState('');
    const [rooms, setRooms] = useState([]);
    const [userRooms, setUserRooms] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        populateRoomsData();
        populateUserRoomsData();
    }, []);

    function showModalJoinNoPassword(room) {
        const modal = document.getElementById("modal");
        modal.querySelector("#info").innerText = "Successfully joined room: " + room.name;
        modal.showModal();
        setUserRooms(prevUserRooms => [...prevUserRooms, { roomId: room.id }]);
        setModalRoom(room);
    }

    function showModalJoinPassword(room) {
        const modal = document.getElementById("modal-password");
        modal.showModal();
        setModalRoom(room);
    }

    function showModalLeft(room) {
        const modal = document.getElementById("modal");
        modal.querySelector("#info").innerText = "Successfully left room: " + room.name;
        modal.showModal();
    }

    function closeModal() {
        if (modalRoom.password !== null) {
            const modal = document.getElementById("modal-password");
            modal.close();
        }
        else {
            const modal = document.getElementById("modal");
            modal.close();
        }
    }

    async function populateRoomsData() {
        const response = await fetch('rooms');
        const data = await response.json();
        setRooms(data);
    }

    async function populateUserRoomsData() {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const response = await fetch(`rooms/GetUserRooms?userId=${userId}`);
        const data = await response.json();
        setUserRooms(data);
    }

    async function leaveRoom(room) {
        const roomUserId = JSON.parse(localStorage.getItem("user")).id
        const roomUser = {
            Id: roomUserId,
            FirstName: "Marek",
            Surname: "Lesny"
        };
        try {
            const response = await fetch('rooms/leave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ RoomId: room.id, Room: room, RoomUserId: roomUserId, RoomUser: roomUser }),
            });

            if (response.ok) {
                showModalLeft(room);
                setUserRooms(prevUserRooms => prevUserRooms.filter(userRoom => userRoom.roomId !== room.id));
            } else {
                console.error('Failed to leave room');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function joinRoom(room) {
        const roomUserId = JSON.parse(localStorage.getItem("user")).id
        const roomUser = {
            Id: roomUserId,
            FirstName: "Marek",
            Surname: "Lesny"
        };
        if (room.password == null) {
            try {
                const response = await fetch('rooms/join', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ RoomId: room.id, Room: room, RoomUserId: roomUserId, RoomUser: roomUser }),
                });

                if (response.ok) {
                    showModalJoinNoPassword(room);
                } else {
                    console.error('Failed to join room');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        else {
            showModalJoinPassword(room);
        }
    }

    async function joinRoomWithPassword(room) {
        const roomUserId = JSON.parse(localStorage.getItem("user")).id
        const roomUser = {
            Id: roomUserId,
            FirstName: "Marek",
            Surname: "Lesny"
        };
        try {
            const response = await fetch('rooms/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ RoomId: room.id, Room: room, RoomUserId: roomUserId, RoomUser: roomUser }),
            });

            if (response.ok) {
                const modal = document.getElementById("modal");
                modal.querySelector("#info").innerText = "Successfully joined room: " + room.name;
            } else {
                console.error('Failed to join room');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function checkPasswordToRoom() {
        const password = document.getElementById('room-password').value;
        if (modalRoom.password === password) {
            joinRoomWithPassword(modalRoom);
            document.getElementById('info-password').innerText = "Successfully joined the room";
            setUserRooms(prevUserRooms => [...prevUserRooms, { roomId: modalRoom.id }]);
        }
        else {
            document.getElementById('info-password').innerText = "Wrong password!";
        }
    }

    async function handleCreateRoom() {
        const room = {
            name: roomName,
            password: password
        };

        try {
            const response = await fetch('rooms/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(room),
            });

            if (response.ok) {
                console.log("Room created");
            } else {
                console.error('Failed to join room');
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }

    return (
        <div>
            <h1 id="tableLabel">Available Rooms</h1>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room =>
                        <tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.name}</td>
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => {
                                    if (userRooms.some(userRoom => userRoom.roomId === room.id)) {
                                        leaveRoom(room);
                                    } else {
                                        joinRoom(room);
                                    }
                                }}
                            >
                                {userRooms.some(userRoom => userRoom.roomId === room.id) ? 'Leave' : 'Join'}
                            </button>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="new-expenses">
                <h3>Create new room</h3>
                <form className="expense-form" onSubmit={handleCreateRoom}>
                    <p>Name</p>
                    <input type="search" onChange={(e) => setRoomName(e.target.value)} />
                    <p>Password (leave empty if none)</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="btn btn-outline-secondary" type="submit">Add</button>
                </form>
            </div>
            <div id="middle">
                <dialog id="modal">
                    <div class="close-modal">
                    <button class="btn btn-primary rounded-circle p-2 lh-1" type="button" onClick={closeModal}>
                        X
                        <span class="visually-hidden">Dismiss</span>
                        </button>
                    </div>
                    <p id="info"></p>
                </dialog>
                <dialog id="modal-password">
                    <div class="close-modal">
                        <button class="btn btn-primary rounded-circle p-2 lh-1" type="button" onClick={closeModal}>
                            X
                            <span class="visually-hidden">Dismiss</span>
                        </button>
                    </div>
                    <p>Please enter password:</p>
                    <input id="room-password" type="password"></input>
                    <div id="center">
                        <button id="confirm-password" class="btn btn-outline-secondary" onClick={checkPasswordToRoom}>Enter</button>
                    </div>
                    <p id="info-password"></p>
                </dialog>
            </div>
        </div>
        
    );
}

export default Rooms;