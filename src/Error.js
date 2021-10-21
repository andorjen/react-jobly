import "./Error.css";

/** Renders an error message
 * 
 * State:
 *  - none
 * 
 * Props:
 *  - message string
 * 
 */
function Error({ message }) {
    return (
        <div className="Error">
            {message}
        </div>
    );
}

export default Error;