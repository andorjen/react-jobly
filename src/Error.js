import "./Error.css";

/** Renders an error message
 * 
 * State:
 *  - none
 * 
 * Props:
 *  - Array of errror messages
 * 
 */
function Error({ messages }) {
    return (
        <div className="Error">
            {messages.map((message, idx) => <p key={idx}>{message}</p>)}
        </div>
    );
}

export default Error;