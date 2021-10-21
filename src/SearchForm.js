import { useState } from "react";
import "./SearchForm.css"
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
            <div className="SearchForm">
                <div className="SearchForm-input">
                    <input
                        className="form-control"
                        id="searchTerm"
                        name="searchTerm"
                        placeholder="Enter search term..."
                        value={formData}
                        onChange={handleChange}
                    />
                </div>
                <div className="SearchForm-button">
                    <button className="btn text-white">Submit</button>
                </div>
            </div>
        </form>
    )
}

export default SearchForm;