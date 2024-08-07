import React from "react";

function GroupDisplay({ groups }) {
    return (
        <div>
            <h2>Groups:</h2>
            {groups.map((group, index) => (
                <div key={index}>
                    <h3>Group {index + 1}:</h3>
                    <ul>
                        {group.map((name, i) => (
                            <li key={i}>{name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default GroupDisplay;
