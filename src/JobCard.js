function JobCard({ job }) {
    return (
        <div>
            <h4 className="JobCard-title">{job.title}</h4>
            <p className="JobCard-company">{job.companyName}</p>
            <p className="JobCard-salary">Salary: {job.salary}</p>
            <p className="JobCard-equity">Equity: {job.equity}</p>
        </div>
    )
}


export default JobCard;