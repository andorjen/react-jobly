import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCardList from "./JobCardList";
import Error from './Error';
import "./CompanyDetails.css";

/**Renders Details of one company
 * 
 * Props:
 *  - applyToJob(): Function to apply to job
 * 
 * State: 
 *  - currCompany : {handle, name, description, numEmployees, logoUrl, jobs:[{ id, title, salary, equity },...]}; default is null
 *  - needsCurrCompany: true/false; default is true
 *  - errors: array of error messages
 * 
 * Routes -> CompanyDetails -> JobCardList
 * */

function CompanyDetails({ applyToJob }) {
    const [currCompany, setCurrCompany] = useState(null);
    const [needsCurrCompany, setNeedsCurrCompany] = useState(true);
    const [errors, setErrors] = useState([]);

    const { handle } = useParams();

    useEffect(function fetchCurrCompanyOnLoad() {
        async function getCurrCompanyFromApi() {
            try {
                const company = await JoblyApi.getCompany(handle);
                setCurrCompany(company);
                setNeedsCurrCompany(false);
            }
            catch (err) {
                console.log({ err });
                setErrors(previousErrors => [...previousErrors, ...err]);
            }
        }

        getCurrCompanyFromApi();  //try/catch with err msg
    }, [handle]);

    if (errors.length > 0) {
        console.log({ errors });
        return <Error messages={errors} />;
    }

    if (needsCurrCompany) return <h1>Loading...</h1>;

    const { name, description, jobs } = currCompany;
    return (
        <div className="background-theme">
            <div className="CompanyDetails-top">
                <h2>{name}</h2>
                <p>{description}</p>
            </div>
            <JobCardList jobs={jobs} applyToJob={applyToJob} />
        </div>
    );
}

export default CompanyDetails;

// {jobs.map(job => <JobCard
//     key={job.id}
//     job={job} />)}