import "./CropDoctor.css"
import diseases from "./CropDoctor.json"
import { useState } from "react"

function Heading(){
    return(
        <div className="crop-doctor-hero">
            <div className="capsule">Crop Diagnostics</div>
            <div className="title">Crop Doctor — Leaf Disease Detector</div>
            <p className="abt">Upload a photo of your crop leaf or select a test sample to detect common fungal and bacterial diseases, review severity, and get immediate curative actions.</p>
        </div>
    )
}

function Selected({disease}){
    return(
        <div className="box">
            <div className="tags">
                <div style={{backgroundColor:disease.severityColor}}>Severity: {disease.severity}</div>
                <div>{disease.confidence}</div>
            </div>

            <div className="name">{disease.name}</div>

            <div className="info">
                Target Crop: {disease.name} | Scientific Pathogen: {disease.scientificName}
            </div>

            <img className="img" src={disease.image} alt={disease.name}/>

            <div className="result">
                <div className="symptoms"><div className="symptom-cap">Symptoms</div>
                    {disease.symptoms.map(x => <div>{x}</div>)}
                </div>

                <div className="prevent"><div className="prevent-cap">Preventions</div>
                    {disease.prevention.map(x => <div>{x}</div>)}
                </div>

                <div className="cure"><div className="cures-cap">Cures</div>
                    {disease.cure.map(x => <div>{x}</div>)}
                </div>
            </div>
        </div>
    )
}

function ImageBox({image,setImage,onAnalyze,onUpload}){
    
    function upload(e){
        const file=e.target.files[0]
                 if(file){
        setImage(URL.createObjectURL(file))
        onUpload()
    }

    }

    return(
        <div className="preview">
            {!image ? (
                <div className="upload">
                    <div className="icon">📁</div>
                    <h3>Click to browse or drop leaf image here</h3>
                    <p>Supported formats: JPG, PNG, WebP</p>
                    <input
                        type="file"
                      
                        onChange={upload}
                    />
                </div>
            ) : (
                <div className="previewImg">
                    <img src={image} alt="Selected crop leaf"/>

                    <p>
                        <strong>Sample Image Uploaded</strong>
                    </p>

                    <p>
                        <strong>Status:</strong>
                        <span className="ready"> Ready for analysis</span>
                    </p>

                    <button className="change" onClick={()=>{setImage(null) 
                        onUpload(false)}}>
                        Change Image
                    </button>

                    <button id="analyze" onClick={onAnalyze}>
                        Analyze Leaf for Disease
                    </button>
                </div>
            )}
        </div>
    )
}

function Samples(){

    const [filter,setFilter]=useState("rice-blast")
    const [image,setImage]=useState(null)
    const [show,setShow]=useState(false)
      const [isUploaded,setIsUploaded]=useState(false)

    const disease=diseases.find(x=>x.id===filter)

    const samples=[
        ["Rice","rice-blast"],
        ["Wheat","wheat-rust"],
        ["Tomato","tomato-blight"],
        ["Potato","potato-blight"]
    ]

    return(
        <>
            <Heading/>
            <ImageBox
                image={image}
                setImage={setImage}
                   onUpload={()=>setIsUploaded(true)}
                 onAnalyze={()=>{
        if(isUploaded){
            setFilter("rice-blast")
        }
        setShow(true)}}
      />
              <div className="sampleText">
                Or test with a sample crop leaf:
            </div>

            <div className="tabs">
                {samples.map(([name,id])=>(
                    <button onClick={()=>{
                        setFilter(id)
                        setImage(diseases.find(x=>x.id===id).image)
                         setIsUploaded(false)
                        setShow(false)
                    }}>
                        {name}
                    </button>
                ))}
            </div>

       {show ? <Selected disease={disease} /> : null}
        </>
    )
}

export default Samples