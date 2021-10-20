import { Link } from "react-router-dom";
import "./CompanyCard.css"
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
        <div className="CompanyCard">
            <Link to={`/companies/${company.handle}`}>

                <h4 className="CompanyCard-name">{company.name}</h4>
                <p className="CompanyCard-description">{company.description}</p>
                {company.logoUrl &&
                    <img
                        className="CompanyCard-logo"
                        src={company.logoUrl}
                        alt={`${company.name} logo`}>
                    </img>
                }
            </Link >
        </div>
    )
}

export default CompanyCard;