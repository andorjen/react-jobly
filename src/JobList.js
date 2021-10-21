import { useState, useEffect } from "react";
import JoblyApi from "./api";
import SearchForm from "./SearchForm";
import JobCard from "./JobCard";
import "./JobList";
import Error from './Error'

/**Renders List of Jobs
 * 
 * Props:
 *  - none
 * 
 * State: 
 *  - jobs : [{ id, title, salary, equity, companyHandle, companyName},...]; default is []
 *  - needsJobs: true/false; default is true
 *  - searchTerm : "string"; default is null
 *  - errors: array of error messages
 * 
 * Routes -> JobList -> JobCard
 * */

function JobList() {
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
        return (
            <div>
                {errors.map((error, idx) => <Error
                    key={idx}
                    message={error} />)}
            </div>)
    };

    if (needsJobs) return <h1>Loading...</h1>;

    return (
        <div className="background-theme">
            <SearchForm submitSearch={searchJobs} initialData={searchTerm} />
            {jobs.map(job => <JobCard key={job.id} job={job} />)}
        </div>

    )
}

export default JobList;