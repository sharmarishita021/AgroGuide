import { useState } from "react";
import "./farmCheck.css";

import input from "./farmCheck_input.json";
import analyser from "./farmCheck_analyser.json";


function header() {

    return (
        <div className="form-header">
            <h1>{input.title}</h1>
             <p>Answer the questions given below to check the score of your farm. </p>
        </div>

    );
}



function getFields(fields,change) {

    return fields.map(field => {

        if (field.type === "select") {
            return (
                <div className="field"  key={field.id} >
                    <label className="label"> {field.label} </label>

                    <select className="select" onChange={(event) => change(field.id, event.target.value)}>
                        <option value=""> Select  </option>

                        {field.options.map(option => (

                            <option key={option} value={option} > {option}</option>
    ))}
                    </select></div>
            );
        }

        if (field.type === "radio") {

            return (

                <div className="field" key={field.id} >

                    <label className="label"> {field.label} </label>
                    <div className="radio-group">
                        {field.options.map(option => (

                            <label className="radio" key={option}>
                            <input type="radio" name={field.id} value={option} onChange={(event) => change(field.id, event.target.value)}/> {option}
                            </label>
    ))}
                    </div></div>
            );
        }

        if (field.type === "number") {

            return (

                <div className="field" key={field.id} >

                    <label className="label"> {field.label} </label>
                    <input className="input"  type="number" onChange={(event) => change(field.id, event.target.value)}/>
                </div>
            );}


        if (field.type === "text") {

            return (
                <div className="field" key={field.id} >

                    <label className="label"> {field.label} </label>
                    <input className="input" type="text" onChange={(event) => change(field.id, event.target.value)}/>
                </div>
            );}

        return null;

    });
}

function getImgUrl(id){
    if(id==="location"){
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiEINQUnkY-Thl1S3nEQUze073-KTsovhX0I_xJP4o2_X7ZZpboVAZm7A&s"
    }
    else if(id==="land"){
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcBC9bpkAN3dxL3Kp7Hl86XUPB9pnfsU98sDeg4KW2GA&s";
    }
    else if(id==="weather"){
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUFdRFaKzbi3CrSxgdgj4r6bj2XVL1qw_m5MKDChuBN9mpg-rBZo235a8&s";
    }
    else if (id==="water"){
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXlg10FaLv7IeFtwFyL3JN5EO-BD6PrZdxtWYKwLZCXXe60jb_OuxV3tY&s";
    }
    else if(id==="crop"){
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSToCK2DD3x08ZEpQXNP-DR28a9VPB0shDdJE4W1wvYAKxUbpE3UZvbg3U&s"
    }
    else if(id==="soilManagement"){
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVcpohILCoIQCAujBUG0IN1SdzKyno0mSaHGRx7priC80XlPqhDAxZH_k&s";
    }
    else if(id==="chemicals"){
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ88l9RfEfyzRzn57mRGNMaqYzFausVw8sODaSlckEzZEYywQCJB3wFT4&s";
    }
    else if(id==="soilConservation"){
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSRsErl7BcgZGPp5lVcPi_qRU9ci5rI0BNHS8HDKQVEVAZHMlMr085rdA&s"
    }
    else if(id=="energy"){
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3IBxWwE0tviEIY5W5WCFMbkBiAisUCwoz1woQ2DN1okR41NpinMD3Fik&s"
    }
    else if(id=="biodiversity"){
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS02klwYGENd_j8aPojs9fkyk1Bn4bscoOzV_MSfoFZrWptih4JIVVwNR8&s"
    }
    else{
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCiIznM3WmtuzPdMgMR82dnDagBoNnF3N0Nex3IvqKxExxykwoux8Q9ns&s";
    }
}

function getSections(change) {

    return (

        <div>
            {input.sections.map(section => (
                <div className="form-section" key={section.id}
                style={{ background: `url("${getImgUrl(section.id)}") center / cover no-repeat`}} >
                    <h2> {section.title} </h2>
                    {getFields(section.fields,change)}
                </div>
            ))}
        </div>
    );
}


function getFutureRisks(form) {

    const risks = [];

    analyser.futureRisks.forEach(risk => {
        const matches = risk.conditions.every(condition => {
            const answer = form[condition.field];
            return condition.values.includes(answer);
        });

        if (matches) {
            risks.push(risk);
        }
    });

    return risks;
}

function showFutureRisks(risks=[]) {

    if (risks.length === 0) {
        return null;
    }
    return (
        <div className="future-risks">

            <h2> Future Sustainability Risks </h2>

            {risks.map(risk => (

                <div  className={`risk ${risk.severity}`}  key={risk.id}  >

                    <h3> {risk.title}  </h3>
                    <p> {risk.message}   </p>
                </div>
            ))}</div>
    );
}

    
export default function FarmCheck() {

    const [form, setForm] = useState({});
    const [result, setResult] = useState(null);

   const change = (id, value) => {
    const newForm = { ...form, [id]: value };

    setForm(newForm);
};

    const analyse = () => {

        let total = 0;
        let weight = 0;
        const outputs = {};
        const futureRisks=getFutureRisks(form);

        Object.entries(analyser.outputs ).forEach(([id, output]) => {

                let score = 0;
                let answered = 0;
                Object.entries( output.fields ).forEach( ([field, rules]) => {

                        const answer = form[field];
                        if (answer) {
                            if ( rules[answer] !== undefined) {
                                score += rules[answer];
                                answered++;
                            }
                        }});

                const totalScore = answered > 0 ? Math.round( (score / answered) * 10 ) : 0;

                outputs[id] = { name: output.label, score: totalScore ,  recommendation: output.recommendations,messages: output.messages};

                total += totalScore * output.weight;
                weight += output.weight;
            });

        const totalScore = weight > 0 ? Math.round(total / weight) :0;

        const rating =
            analyser.rating.find(item => {  
                return totalScore >= item.min; 
             });

        setResult({
            score: totalScore,
            rating: rating,
            outputs: outputs,
            futureRisks: futureRisks
        });
    };

    const scoreClass=(score)=>{
        if(score>=50){
            return "redScore";
        }
        else{
            return "whiteScore";
        }
    };

   const rec=(score)=>{
    if(score>70){
        return "high";
    }
    if(score>45){
        return "medium";
    }
    return "low";
   }
return (
    <div className="container">
    {header()}
        <div className="farm-check">
            <form onSubmit={(event) => {
                 event.preventDefault(); 
                 analyse();}} >

                {getSections(change)}
                <button type="submit"> Analyse Farm </button></form>

            {result && (

                <div className="results">
                    <h2> Farm Sustainability Score </h2>
                    <div className="score"> {result.score}/100 </div>

                    {result.rating && (
                        <div>
                            <h3> {result.rating.label} </h3>
                            <p> {result.rating.description} </p>
                        </div> )}


                    <h2>Farm Analysis </h2>

                    {Object.values( result.outputs).map(output => (

                        <div className="output" key={output.name} >
                            <h3>  {output.name}  </h3>
                            <p  className={scoreClass(output.score)}>  <span>{output.score}</span>/100</p>
                            <p className="recommendation"> <strong>Recommendation: </strong>{output.recommendation}</p>
                            <p><strong>Mesage: </strong>{output.messages[rec(output.score)]}</p>
                        </div>
                    ))}
                </div>
            )}
            {result && showFutureRisks(result.futureRisks)}
        </div>
        </div>
    );
}