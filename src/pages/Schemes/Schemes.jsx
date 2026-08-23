import schemes from "./Schemes.json";
import "./Schemes.css";
import { useState } from "react";
function Heading(){
    return(
        <section className="hero">
            <div className="capsule">Financial & Policy Support </div>
            <h2 className="Title">Government and Instituional Support Schemes</h2>
            <p className="abt"> Explore verified government subsidies and agricultural credit schemes
        that assist farmers in adopting drip irrigation, soil testing,
        stubble machinery, and solar pumps.</p>
        </section>
    )
}
function Cards() {
 const [filter, setFilter] = useState("all");

  let filteredSchemes;

  if (filter === "all") {
    filteredSchemes = schemes;
  } else {
    filteredSchemes = schemes.filter((scheme) => {
      return scheme.type === filter;
    });
  }
  return (
    <>
    <Heading />
    <div className="filterTabs">
        <button onClick={() => setFilter("all")}>
          All Schemes
        </button>

        <button onClick={() => setFilter("government")}>
          Government Subsidies
        </button>

        <button onClick={() => setFilter("credit")}>
          Private & Credit Schemes
        </button>
      </div>
    <div className="allcards">
      {filteredSchemes.map((scheme) => (
        <article className="scheme-card" key={scheme.id}>
          <div className="category">{scheme.category}</div>

          <div className="target">
            Targets: {scheme.target}
          </div>

          <h2 className="schemeName">{scheme.name}</h2>

          <div className="dept">
            Department: {scheme.department}
          </div>

          <div className="benefit-box">
            <p>Subsidy / Benefit Detail</p>
            <h3 className="benefit">{scheme.benefit}</h3>
            <p>{scheme.description}</p>
          </div>

          <div className="scheme-section">
            <h3>Key Scheme Benefits</h3>
            <ul>
              {scheme.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="scheme-section">
            <h3>Application Steps</h3>
            <ol>
              {scheme.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

        </article>
      ))}
    </div></>
  );
}
export default Cards