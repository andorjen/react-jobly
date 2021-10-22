import { useContext } from "react";
import CurrUserContext from "./CurrUserContext";
import JobCard from "./JobCard";
// import "./JobCardList.css";

/**
 * 
 * Props:
 *  - jobs
 *  - applyToJob(): Function to apply to job
 * 
 * State:
 *  - None
 * 
 * Context:
 * - currUser
 * 
 * {CompanyList, JobList} -> JobCardList -> JobCard
 * 
 */
function JobCardList({ jobs, applyToJob }) {
    const user = useContext(CurrUserContext);

    const jobList = jobs.map(job => {
        if (user.applications.includes(job.id)) {
            return { job, isApplied: true }
        }
        else {
            return { job, isApplid: false }
        }
    });

    return (
        <div>
            {jobList.map(({ job, isApplied }) =>
                <JobCard
                    key={job.id}
                    job={job}
                    isApplied={isApplied}
                    applyToJob={applyToJob}
                />)}
        </div>
    )
}

export default JobCardList;