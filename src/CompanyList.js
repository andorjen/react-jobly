import { useState, useEffect } from "react";
import JoblyApi from "./api";
import SearchForm from "./SearchForm";
import CompanyCard from "./CompanyCard";
import Error from './Error';


/**Renders List of Companies
 * 
 * Props:
 *  - none
 * 
 * State: 
 *  - companies : [{ handle, name, description, numEmployees logoUrl},...]; default is []
 *  - needsCompanies: true/false; default is true
 *  - searchTerm : "string"; default is null
 *  - errors: array of error messages
 * 
 * Routes -> CompanyList -> CompanyCard
 * */

function CompanyList() {
    // console.log("CompanyList: beginning");

    const [companies, setCompanies] = useState([]);
    const [needsCompanies, setNeedsCompanies] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(function fetchCompaniesOnLoad() {

        async function getCompaniesFromApi() {
            try {
                const companies = await JoblyApi.getCompanies(searchTerm);
                setCompanies(companies);
                setNeedsCompanies(false);
            }
            catch (err) {
                setErrors(previousErrors => [...previousErrors, ...err]);
            }
        }
        // console.log("right before calling getJobsFromApi");  //wrap API call in

        getCompaniesFromApi();

    }, [searchTerm, needsCompanies]);

    function searchCompanies(formData) {
        console.log("perform search", { formData })
        setSearchTerm(formData);
        setNeedsCompanies(true);
    }

    if (errors.length > 0) {
        return (
            <div>
                Errors:
                {errors.map((error, idx) => <Error
                    key={idx}
                    message={error} />)}
            </div>)
    };

    if (needsCompanies) return <h1>Loading...</h1>;

    console.log("brefore return", { searchTerm })
    return (
        <div>
            <SearchForm submitSearch={searchCompanies} initialData={searchTerm} />
            {companies.map(company => <CompanyCard
                key={company.handle}
                company={company} />)}
        </div>
    );
}

export default CompanyList;