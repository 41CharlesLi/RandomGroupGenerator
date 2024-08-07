import React from "react";

function TeacherTool({ restrictedPairings, setRestrictedPairings }) {
    // Handle changes in restricted pairings
    const handleRestrictedPairingsChange = (index, value) => {
        const newRestrictedPairings = [...restrictedPairings];
        const updatedPair = value
            .split(",")
            .map((name) => name.trim())
            .filter((name) => name);

        // Ensure each pair has exactly two names
        newRestrictedPairings[index] = updatedPair.length === 2 ? updatedPair : ["", ""];
        setRestrictedPairings(newRestrictedPairings);
    };

    // Add a new restricted pairing
    const handleAddRestrictedPairing = () => {
        setRestrictedPairings((prev) => [...prev, ["", ""]]);
    };

    // Delete a restricted pairing
    const handleDeleteRestrictedPairing = (index) => {
        const newRestrictedPairings = restrictedPairings.filter(
            (_, i) => i !== index
        );
        setRestrictedPairings(newRestrictedPairings);
    };

    return (
        <div>
            <h2>Teacher Tool: Restricted Pairings</h2>
            {restrictedPairings.map((pair, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={pair.join(", ")}  // Use ", " to separate names
                        onChange={(e) =>
                            handleRestrictedPairingsChange(
                                index,
                                e.target.value
                            )
                        }
                        placeholder="Pair of students to restrict, e.g., Student1, Student2"
                    />
                    <button onClick={() => handleDeleteRestrictedPairing(index)}>
                        Delete
                    </button>
                </div>
            ))}
            <button onClick={handleAddRestrictedPairing}>
                Add Restricted Pairing
            </button>
        </div>
    );
}

export default TeacherTool;
