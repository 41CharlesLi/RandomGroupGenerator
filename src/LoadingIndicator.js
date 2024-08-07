import React from "react";

function LoadingIndicator({ gif }) {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <img
                src={gif}
                alt="Loading..."
                style={{ width: '100px', height: '100px' }}
            />
        </div>
    );
}

export default LoadingIndicator;
