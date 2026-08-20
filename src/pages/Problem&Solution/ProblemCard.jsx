function ProblemCard({ problem, onReadMore }) {
    return (
        <div className="problem-card">
            <h3>{problem.title}</h3>

            <p>{problem.description}</p>

            <button onClick={() => onReadMore(problem)}>
                Read More
            </button>
        </div>
    );
}

export default ProblemCard;