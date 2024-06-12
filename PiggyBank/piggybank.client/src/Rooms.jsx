import { useEffect, useState } from 'react';
import './Rooms.css';

export function Rooms() {
    const [modalRoom, setModalRoom] = useState('');
    const [rooms, setRooms] = useState([]); // Initialize with an empty array
    const [userRooms, setUserRooms] = useState([]);

    useEffect(() => {
        populateRoomsData();
        populateUserRoomsData();
    }, []);

    function showModal(room, status) {
        if (room.password !== null && status === "joined") {
            const modal = document.getElementById("modal-password");
            modal.showModal();
        }
        else {
            const modal = document.getElementById("modal");
            modal.querySelector("#info").innerText = "Successfully " + status + " room: " + room.name;
            modal.showModal();
            setUserRooms(prevUserRooms => [...prevUserRooms, { roomId: room.id }]);
        }
        setModalRoom(room);
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
        console.log(data); // Log the response
        setRooms(data);
    }

    async function populateUserRoomsData() {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const response = await fetch(`rooms/GetUserRooms?userId=${userId}`);
        const data = await response.json();
        console.log(data); // Log the response
        setUserRooms(data);
    }

    async function joinRoom(room) {
        const roomUserId = JSON.parse(localStorage.getItem('user')).id;
        const roomUser = {
            Id: roomUserId,
            FirstName: "Marek",
            Surname: "Lesny"
        };

        const matchedRoom = userRooms.find(userRoom => userRoom.roomId === room.id);

        if (matchedRoom) {
            try {
                const response = await fetch('rooms/leave', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ RoomId: room.id, Room: room, RoomUserId: roomUserId, RoomUser: roomUser }),
                });

                if (response.ok) {
                    showModal(room, "left");
                    setUserRooms(prevUserRooms => prevUserRooms.filter(userRoom => userRoom.roomId !== room.id));
                } else {
                    console.error('Failed to leave room');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        else {
            try {
                const response = await fetch('rooms/join', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ RoomId: room.id, Room: room, RoomUserId: roomUserId, RoomUser: roomUser }),
                });

                if (response.ok) {
                    showModal(room, "joined");
                } else {
                    console.error('Failed to join room');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    async function checkPasswordToRoom() {
        const password = document.getElementById('room-password').value;
        if (modalRoom.password === password) {
            document.getElementById('info-password').innerText = "Successfully joined the room";
            setUserRooms(prevUserRooms => [...prevUserRooms, { roomId: modalRoom.id }]);
        }
        else {
            document.getElementById('info-password').innerText = "Wrong password!";
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
                            <button class="btn btn-outline-secondary" type="button" onClick={() => joinRoom(room)}>
                                {userRooms.some(userRoom => userRoom.roomId === room.id) ? 'Leave' : 'Join'}
                            </button>
                        </tr>
                    )}
                </tbody>
            </table>
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