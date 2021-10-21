import './HomePage.css';


/**Renders HomePage
 * 
 * Props:
 *  - none
 * 
 * State: 
 *  - none
 * 
 * Routes -> HomePage
 * */

function HomePage() {

    return (
        <div className="HomePage">
            <div className="HomePage-content">
                <h1 className="HomePage-title">Jobly</h1>
                <p className="HomePage-description">All the jobs in one, convenient place.</p>
            </div>
        </div>
    );
}

export default HomePage;