// import './HomePage.css';


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

    // QUESTION: we tried to set image background in css, but url doesn't work in css.

    return (
        <div className="homepage"
            style={{ backgroundImage: 'url(/jobly-background.png)' }}
        >
            <h1>Jobly</h1>

            <p>All the jobs in one, convenient place.</p>
        </div>
    );
}

export default HomePage;