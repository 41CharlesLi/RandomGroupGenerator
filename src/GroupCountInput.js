import React from "react";

function GroupCountInput({ groupCount, setGroupCount, handleCreateRandomGroups }) {
    return (
        <div>
            <input
                type="number"
                value={groupCount}
                onChange={(e) => setGroupCount(e.target.value)}
                placeholder="Enter number of groups"
                min="1"
            />
            <button onClick={handleCreateRandomGroups}>Create Random Groups</button>
        </div>
    );
}

export default GroupCountInput;
