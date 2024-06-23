import React, { useState, useEffect } from 'react'

export function Profile() {

    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = JSON.parse(localStorage.getItem('user')).username;
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);


    return (
        <>
            <p>Welcome, {username}!</p>
        </>
    )
}