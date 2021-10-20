
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCard from "./JobCard";

/**Renders Details of one company
 * 
 * Props:
 *  - none
 * 
 * State: 
 *  - currCompany : {handle, name, description, numEmployees, logoUrl, jobs:[{ id, title, salary, equity },...]}; default is null
 *  - needsCurrCompany: true/false; default is true
 * 
 * Routes -> CompanyDetails -> JobCard
 * */

function CompanyDetails() {
    const [currCompany, setCurrCompany] = useState(null);
    const [needsCurrCompany, setNeedsCurrCompany] = useState(true);

    const { handle } = useParams();

    useEffect(function fetchCurrCompanyOnLoad() {

        async function getCurrCompanyFromApi() {
            const company = await JoblyApi.getCompany(handle);
            setCurrCompany(company);
            setNeedsCurrCompany(false);
        }

        getCurrCompanyFromApi();  //try/catch with err msg
    }, [handle]);


    if (needsCurrCompany) return <h1>Loading...</h1>;

    const { name, description, jobs } = currCompany;
    return (
        <div>
            <h2>{name}</h2>
            <p>{description}</p>
            {jobs.map(job => <JobCard
                key={job.id}
                job={job} />)}
        </div>
    );
}

export default CompanyDetails;
