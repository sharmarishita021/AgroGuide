function ProblemDetails({ problem, onBack }) {
    return (
        <div className="problem-details">

            <button className="back-button" onClick={onBack}>
                ← Back to Problems
            </button>

            <h1>{problem.title}</h1>


            {/* About section + image */}
            <div className="details-intro">

                <div className="about-section">
                    <h2>About the Problem</h2>

                    <p>{problem.details}</p>
                </div>

                <div className="problem-image">
                    <img
                        src={problem.image}
                        alt={problem.title}
                    />
                </div>

            </div>


            {/* Effects + Solutions */}
            <div className="details-two-column">

                <div className="details-section">
                    <h2>Effects</h2>

                    <ul>
                        {problem.effects.map((effect, index) => (
                            <li key={index}>{effect}</li>
                        ))}
                    </ul>
                </div>


                <div className="details-section">
                    <h2>Solutions</h2>

                    <ul>
                        {problem.solutions.map((solution, index) => (
                            <li key={index}>{solution}</li>
                        ))}
                    </ul>
                </div>

            </div>


            {/* Crop suggestions */}
            <div className="crop-section">

                <h2>Crop Suggestions</h2>

                <ul>
                    {problem.crops.map((crop, index) => (
                        <li key={index}>{crop}</li>
                    ))}

                </ul>

            </div>

        </div>
    );
}

export default ProblemDetails;