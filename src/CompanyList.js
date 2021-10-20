import { useState, useEffect } from "react";
import JoblyApi from "./api";
import SearchForm from "./SearchForm";
import CompanyCard from "./CompanyCard";


/**Renders List of Companies
 * 
 * Props:
 *  - none
 * 
 * State: 
 *  - companies : [{ handle, name, description, numEmployees logoUrl},...]; default is []
 *  - needsCompanies: true/false; default is true
 *  - searchTerm : "string"; default is null
 * 
 * Routes -> CompanyList -> CompanyCard
 * */

function CompanyList() {
    // console.log("CompanyList: beginning");

    const [companies, setCompanies] = useState([]);
    const [needsCompanies, setNeedsCompanies] = useState(true);
    const [searchTerm, setSearchTerm] = useState(null);

    useEffect(function fetchCompaniesOnLoad() {

        async function getCompaniesFromApi() {
            const companies = await JoblyApi.getCompanies(searchTerm);
            setCompanies(companies);
            setNeedsCompanies(false);
        }
        // console.log("right before calling getJobsFromApi");
        getCompaniesFromApi();
    }, [searchTerm, needsCompanies]);

    function searchCompanies(formData) {
        setSearchTerm(formData);
        setNeedsCompanies(true);
    }

    if (needsCompanies) return <h1>Loading...</h1>;

    return (
        <div>
            <SearchForm submitSearch={searchCompanies} />
            {companies.map(company => <CompanyCard
                key={company.handle}
                company={company} />)}
        </div>
    );
}

export default CompanyList;