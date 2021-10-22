import { useState, useEffect } from "react";
import JoblyApi from "./api";
import SearchForm from "./SearchForm";
import JobCardList from "./JobCardList";
import "./JobList";
import Error from './Error'

/**Renders List of Jobs
 * 
 * Props:
 *  - applyToJob(): Function to apply to job
 * 
 * State: 
 *  - jobs : [{ id, title, salary, equity, companyHandle, companyName},...]; default is []
 *  - needsJobs: true/false; default is true
 *  - searchTerm : "string"; default is null
 *  - errors: array of error messages
 * 
 * Routes -> JobList -> JobCardList
 * */

function JobList({ applyToJob }) {
    // console.log("JobList: beginning");

    const [jobs, setJobs] = useState([]);
    const [needsJobs, setNeedsJobs] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [errors, setErrors] = useState([]);


    // console.log({ jobs, needsJobs, searchTerm });

    useEffect(function fetchJobsOnLoad() {
        // console.log("fetchJobsOnLoad");

        async function getJobsFromApi() {
            // console.log("getJobsFromApi:", { searchTerm });
            try {
                const jobs = await JoblyApi.getJobs(searchTerm);
                setJobs(jobs);
                setNeedsJobs(false);
            }
            catch (err) {
                setErrors(previousErrors => [...previousErrors, ...err]);
            }
        }
        // console.log("right before calling getJobsFromApi");   //try/catch
        getJobsFromApi();
    }, [searchTerm, needsJobs]);

    function searchJobs(formData) {
        setSearchTerm(formData);
        setNeedsJobs(true);
    }

    if (errors.length > 0) {
        console.log({ errors });
        return <Error messages={errors} />;
    }

    if (needsJobs) return <h1>Loading...</h1>;

    return (
        <div className="background-theme">
            <SearchForm submitSearch={searchJobs} initialData={searchTerm} />
            <JobCardList jobs={jobs} applyToJob={applyToJob} />
        </div>

    )
}

export default JobList;

// {/* {jobs.map(job => <JobCard key={job.id} job={job} />)} */}