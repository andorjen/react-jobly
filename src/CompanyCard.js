import { Link } from "react-router-dom";

/**Renders a card for a single company
 * 
 * Props:
 *  - company : {handle, name, description, numEmployees logoUrl}
 * 
 * State: 
 *  - None
 * 
 * CompanyList -> CompanyCard -> Link( do we need this?)
 * */
function CompanyCard({ company }) {
    return (
        <Link to={`/companies/${company.handle}`}>
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
        </Link>
    )
}

export default CompanyCard;