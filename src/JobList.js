import { useState, useEffect } from "react";
import JoblyApi from "./api";
import SearchForm from "./SearchForm";
import JobCard from "./JobCard";

function JobList() {
    const [jobs, setJobs] = useState([]);
    const [needsJobs, setNeedsJobs] = useState(true);
    const [searchTerm, setSearchTerm] = useState(null);

    useEffect(function fetchJobsOnLoad() {
        async function getJobsFromApi() {
            const jobs = await JoblyApi.getJobs(searchTerm);
            setJobs(jobs);
            setNeedsJobs(false);
        }
        getJobsFromApi();
    }, [searchTerm])

    function searchJobs(formData) {
        setSearchTerm(formData);
        setNeedsJobs(true);
    }

    if (needsJobs) return <h1>Loading...</h1>;

    return (
        <div>
            <SearchForm submitSearch={searchJobs} />
            {jobs.map(job => <JobCard job={job} />)}
        </div>

    )
}

export default JobList;