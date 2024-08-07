import React, { useState } from "react";

function RandomGroupGenerator() {
    const [inputValue, setInputValue] = useState("");
    const [names, setNames] = useState([]);
    const [groupCount, setGroupCount] = useState("");
    const [groups, setGroups] = useState([]);
    const [error, setError] = useState("");
    const [showTeacherTool, setShowTeacherTool] = useState(false); // Toggle for teacher tool
    const [restrictedPairings, setRestrictedPairings] = useState([["", ""]]);

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

    const handleClearNames = () => {
        setNames([]);
        setGroups([]);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleAddNames();
        }
    };

    const handleGroupCountChange = (event) => {
        setGroupCount(event.target.value);
    };

    const handleCreateRandomGroups = () => {
        const numGroups = parseInt(groupCount, 10);

        if (isNaN(numGroups) || numGroups <= 0) {
            setError("Please enter a valid number of groups.");
            setGroups([]);
            return;
        }

        setError("");

        // Shuffle names array
        const shuffledNames = [...names].sort(() => Math.random() - 0.5);

        // Create groups
        const newGroups = Array.from({ length: numGroups }, () => []);

        // Prepare constraints from restrictedPairings
        const constraints = restrictedPairings.reduce((acc, [a, b]) => {
            acc[a] = acc[a] || [];
            acc[a].push(b);
            acc[b] = acc[b] || [];
            acc[b].push(a);
            return acc;
        }, {});

        // Function to check if a name can be placed in a group
        const canPlaceInGroup = (name, group) => {
            return !group.some((member) => constraints[member]?.includes(name));
        };

        // Place names in groups
        shuffledNames.forEach((name) => {
            let placed = false;

            // Find the group with the least members where the name can be placed
            for (let i = 0; i < numGroups; i++) {
                const group = newGroups[i];
                if (canPlaceInGroup(name, group)) {
                    group.push(name);
                    placed = true;
                    break;
                }
            }

            // If not placed in any group, place in the least populated group
            if (!placed) {
                const leastPopulatedGroup = newGroups.reduce(
                    (leastGroup, currentGroup) =>
                        currentGroup.length < leastGroup.length
                            ? currentGroup
                            : leastGroup
                );
                leastPopulatedGroup.push(name);
            }
        });

        // Balance the groups if necessary
        while (true) {
            const maxGroup = newGroups.reduce((maxGroup, currentGroup) =>
                currentGroup.length > maxGroup.length ? currentGroup : maxGroup
            );
            const minGroup = newGroups.reduce((minGroup, currentGroup) =>
                currentGroup.length < minGroup.length ? currentGroup : minGroup
            );

            if (maxGroup.length - minGroup.length <= 1) {
                break;
            }

            const nameToMove = maxGroup.pop();
            minGroup.push(nameToMove);
        }

        setGroups(newGroups);
    };

    const handleRestrictedPairingsChange = (index, value) => {
        const newRestrictedPairings = [...restrictedPairings];
        newRestrictedPairings[index] = value
            .split(",")
            .map((name) => name.trim());
        setRestrictedPairings(newRestrictedPairings);
    };

    const handleAddRestrictedPairing = () => {
        setRestrictedPairings((prev) => [...prev, ["", ""]]);
    };

    const handleDeleteRestrictedPairing = (index) => {
        const newRestrictedPairings = restrictedPairings.filter(
            (_, i) => i !== index
        );
        setRestrictedPairings(newRestrictedPairings);
    };

    const handleToggleTeacherTool = () => {
        setShowTeacherTool(!showTeacherTool);
        if (!showTeacherTool) {
            setRestrictedPairings([["", ""]]);
        }
    };

    return (
        <div className="App">
            <h1>Random Group Generator</h1>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter names separated by commas"
                />
                <button onClick={handleAddNames}>Add Names</button>
                <button onClick={handleClearNames}>Clear All Names</button>
            </div>
            <div>
                <input
                    type="number"
                    value={groupCount}
                    onChange={handleGroupCountChange}
                    placeholder="Enter number of groups"
                    min="1"
                />
                <button onClick={handleCreateRandomGroups}>
                    Create Random Groups
                </button>
            </div>
            {error && (
                <div style={{ color: "red" }}>
                    <p>{error}</p>
                </div>
            )}
            {names.length > 0 && !error && (
                <div>
                    <h2>Current Names:</h2>
                    <ul>
                        {names.map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
                    </ul>
                </div>
            )}
            {groups.length > 0 && (
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
            )}
            <button onClick={handleToggleTeacherTool}>
                {showTeacherTool ? "Hide Teacher Tool" : "Show Teacher Tool"}
            </button>
            {showTeacherTool && (
                <div>
                    <h2>Teacher Tool: Restricted Pairings</h2>
                    {restrictedPairings.map((pair, index) => (
                        <div key={index} style={{ marginBottom: "8px" }}>
                            <input
                                type="text"
                                value={pair.join(", ").replace(/^, | ,/g, "")}
                                onChange={(e) =>
                                    handleRestrictedPairingsChange(
                                        index,
                                        e.target.value
                                    )
                                }
                                placeholder="Pair of students to restrict, e.g., Student1, Student2"
                            />
                            <button
                                onClick={() =>
                                    handleDeleteRestrictedPairing(index)
                                }
                                style={{ marginLeft: "8px" }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    <button onClick={handleAddRestrictedPairing}>
                        Add Restricted Pairing
                    </button>
                </div>
            )}
        </div>
    );
}

export default RandomGroupGenerator;
