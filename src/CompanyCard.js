function CompanyCard({company}) {
    return (
        <div>
            <h4 className="CompanyCard-name">{company.name}</h4>
            <p className="CompanyCard-description">{company.description}</p>
            {company.logoUrl &&
            <img
                className="CompanyCard-logo"
                src={company.logoUrl}
                alt="CompanyCard-logo">
            </img>
            }
             </div>
    )
}

export default CompanyCard;