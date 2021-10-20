import { useState } from "react";

/**Renders a form with search bar
 * 
 * Props:
 *  - submitSearch(): function that sets state in parent
 *  - initialData: searchTerm from parent
 * 
 * State: 
 *  - formData
 * 
 * {JobList, CompanyList} -> SearchForm
 * */
function SearchForm({ submitSearch, initialData }) {
    // console.log("SearchForm: beginning");
    const [formData, setFormData] = useState(initialData);

    function handleChange(evt) {
        setFormData(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        submitSearch(formData);
        // setFormData('');
    }
    //keep the searchTerm in search bar
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
            <button className="btn btn-primary">Submit</button>

        </form>
    )
}

export default SearchForm;