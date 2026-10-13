import React from "react";

function ProblemCard({ problem, onReadMore }) {
  return (
    <div className="problem-card common-card">
      <div className="card-image">
        <img src={problem.image} alt={problem.title} />
      </div>

      <div className="card-content">
        <h3>{problem.title}</h3>
        <p>{problem.description}</p>

        <button
          className="btn btn-outline-green btn-small problem-read-btn"
          onClick={() => onReadMore(problem)}
        >
          View Solution Blueprint <span>→</span>
        </button>
      </div>
    </div>
  );
}

export default ProblemCard;