import { useState } from "react";

function SearchForm({ submitSearch }) {
    const [formData, setFormData] = useState("");

    function handleChange(evt) {
        setFormData(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        submitSearch(formData);
        setFormData('');
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                id="searchTerm"
                name="searchTerm"
                placeholder="Enter search term..."
                value={formData}
                onChange={handleChange}
            />
            <button>Submit</button>
        </form>
    )
}

export default SearchForm;