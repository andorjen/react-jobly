// import './HomePage.css';
// import './jobly-background.png';

function HomePage() {

    return (
    <div className="homepage" 
    style={{backgroundImage: 'url(/jobly-background.png)'}}
    >
        <h1>Jobly</h1>
        {/* <img src='/jobly-background.png' alt='background-image'></img> */}
        <p>All the jobs in one, convenient place.</p>
    </div>
    );
}

export default HomePage;