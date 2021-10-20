import { useState } from "react";

function SearchForm({ submitSearch }) {
    // console.log("SearchForm: beginning");
    const [formData, setFormData] = useState("");

    function handleChange(evt) {
        setFormData(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        submitSearch(formData);
        setFormData('');
    }

    // console.log("SearchForm: about to return");
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