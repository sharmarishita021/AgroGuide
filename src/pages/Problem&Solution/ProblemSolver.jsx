import { useState } from "react";
import problems from "./Problem.js";
import ProblemCard from "./ProblemCard.jsx";
import ProblemDetails from "./ProblemDetails.jsx";
import "./Problem.css";

function ProblemSolver() {

    const [category, setCategory] = useState("weather");
    const [selectedProblem, setSelectedProblem] = useState(null);

    if (selectedProblem) {
        return (
            <ProblemDetails
                problem={selectedProblem}
                onBack={() => setSelectedProblem(null)}
            />
        );
    }

    return (
        <div className="problem-solver">

            <h1>Agricultural Problem Solver</h1>

            <div className="category-buttons">
                <button onClick={() => setCategory("weather")}>
                    Weather Problems
                </button>

                <button onClick={() => setCategory("soil")}>
                    Soil Problems
                </button>

                <button onClick={() => setCategory("crop")}>
                    Crop & Fertility Problems
                </button>

                <button onClick={() => setCategory("pest")}>
                    Pest & Chemical Problems
                </button>
            </div>

            <h2 className="problem-heading">{category}</h2>

            <div className="problem-grid">
                {problems[category].map((problem) => (
                    <ProblemCard
                        key={problem.id}
                        problem={problem}
                        onReadMore={setSelectedProblem}
                    />
                ))}
            </div>

        </div>
    );
}

export default ProblemSolver;