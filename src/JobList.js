import { useState, useEffect } from "react";
import JoblyApi from "./api";
import SearchForm from "./SearchForm";
import JobCard from "./JobCard";

/**Renders List of Jobs
 * 
 * Props:
 *  - none
 * 
 * State: 
 *  - jobs : [{ id, title, salary, equity, companyHandle, companyName},...]; default is []
 *  - needsJobs: true/false; default is true
 *  - searchTerm : "string"; default is null
 * 
 * Routes -> JobList -> JobCard
 * */

function JobList() {
    // console.log("JobList: beginning");

    const [jobs, setJobs] = useState([]);
    const [needsJobs, setNeedsJobs] = useState(true);
    const [searchTerm, setSearchTerm] = useState(null);

    // console.log({ jobs, needsJobs, searchTerm });

    useEffect(function fetchJobsOnLoad() {
        // console.log("fetchJobsOnLoad");

        async function getJobsFromApi() {
            // console.log("getJobsFromApi:", { searchTerm });

            const jobs = await JoblyApi.getJobs(searchTerm);
            setJobs(jobs);
            setNeedsJobs(false);
        }
        // console.log("right before calling getJobsFromApi");
        getJobsFromApi();
    }, [searchTerm, needsJobs]);

    function searchJobs(formData) {
        setSearchTerm(formData);
        setNeedsJobs(true);
    }

    if (needsJobs) return <h1>Loading...</h1>;

    return (
        <div>
            <SearchForm submitSearch={searchJobs} />
            {jobs.map(job => <JobCard key={job.id} job={job} />)}
        </div>

    )
}

export default JobList;