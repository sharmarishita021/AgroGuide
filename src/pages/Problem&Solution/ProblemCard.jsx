function ProblemCard({ problem, onReadMore }) {
    return (
        <div className="problem-card">

            <div className="card-image">
                <img
                    src={problem.image}
                    alt={problem.title}
                />
            </div>

            <div className="card-content">
                <h3>{problem.title}</h3>

                <p>{problem.description}</p>

                <button onClick={() => onReadMore(problem)}>
                    Read More <span>→</span>
                </button>
            </div>

        </div>
    );
}

export default ProblemCard;