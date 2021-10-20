import "./JobCard.css";
import { addCommas } from "./helper"
/**Renders a card for a single job
 * 
 * Props:
 *  - job: {id, title, salary, equity, companyHandle, companyName}
 * 
 * State: 
 *  - None
 * 
 * {JobList, CompanyDetails} -> JobCard
 * */

function JobCard({ job }) {
    const { title, companyName, salary, equity } = job;
    const formatedSalary = `$ ${addCommas(salary)}`;

    return (
        <div className="JobCard">
            <h4 className="JobCard-title">{title}</h4>
            <p className="JobCard-company">{companyName}</p>
            <p className="JobCard-salary">Salary: {formatedSalary}</p>
            {Number(equity) > 0 && <p className="JobCard-equity">Equity: {equity}%</p>}
        </div>
    )
}

export default JobCard;