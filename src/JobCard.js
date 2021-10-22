import { useState } from 'react';
import "./JobCard.css";
import { addCommas } from "./helper"
import Error from './Error';
/**Renders a card for a single job
 * 
 * Props:
 *  - job: {id, title, salary, equity, companyHandle, companyName}
 *  - isApplied
 *  - applyToJob(): Function to apply to job
 * 
 * State: 
 *  - errors
 * 
 * { JobCardList } -> JobCard
 * */

function JobCard({ job, isApplied, applyToJob }) {
    const [errors, setErrors] = useState([]);

    const { title, companyName, salary, equity } = job;
    const formatedSalary = `$ ${addCommas(salary)}`;

    async function handleJobApplication(jobId) {
        try {
            await applyToJob(jobId);
        } catch (err) {
            setErrors(err);
        }
    }

    return (
        <div className="JobCard card">
            <h4 className="JobCard-title">{title}</h4>
            <p className="JobCard-company">{companyName}</p>
            <p className="JobCard-salary">Salary: {formatedSalary}</p>
            {Number(equity) > 0 && <p className="JobCard-equity">Equity: {equity}%</p>}
            {errors.length > 0 && <Error messages={errors} />}
            {isApplied &&
                <button>Applied
                </button>}
            {!isApplied &&
                <button onClick={() => { handleJobApplication(job.id) }}>Apply
                </button>}
        </div>
    )
}

export default JobCard;