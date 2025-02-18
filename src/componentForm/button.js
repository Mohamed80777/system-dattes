import React from 'react';

export default function Button({ name = "", className = "", onClick }) {
    return (
        <input type="submit" value={name} className={className} onClick={onClick} />
    );
}