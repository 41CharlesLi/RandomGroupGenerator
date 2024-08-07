import React, { useState } from "react";

function NameInput({ names, setNames }) {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddNames = () => {
        const newNames = inputValue
            .split(",")
            .map((name) => name.trim())
            .filter((name) => name);
        setNames((prevNames) => [...prevNames, ...newNames]);
        setInputValue("");
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleAddNames();
        }
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter names separated by commas"
            />
            <button onClick={handleAddNames}>Add Names</button>
            <button onClick={() => setNames([])}>Clear All Names</button>
        </div>
    );
}

export default NameInput;
