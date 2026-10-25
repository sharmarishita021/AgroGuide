import React, { useState } from 'react';

const cropOptions = [
  'Wheat',
  'Basmati Rice',
  'Mustard',
  'Moong Dal',
  'Sugarcane',
  'Cotton',
  'Maize',
  'Potato',
  'Tomato',
  'Soybean',
];

const symptomOptions = [
  'Yellowing leaves',
  'Slow growth',
  'Leaf curling',
  'Brown leaf edges',
  'Purple/reddish leaves',
  'Weak stems',
  'Poor flowering',
  'Poor fruit development',
  'Wilting',
  'Leaf spots',
];

const pesticideTypes = [
  'Insecticide',
  'Fungicide',
  'Herbicide',
  'Combination / Other',
];

const quantityOptions = [
  'Less than 25 kg',
  '25–50 kg',
  '50–100 kg',
  'More than 100 kg',
];

export default function DiagnosticSection() {
  const [crop, setCrop] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [pesticideUsed, setPesticideUsed] = useState('No');
  const [pesticideType, setPesticideType] = useState('');
  const [organicFertilizer, setOrganicFertilizer] = useState('No');
  const [lastDate, setLastDate] = useState('');

  const initFert = { used: 'No', qty: '' };

  const [urea, setUrea] = useState({ ...initFert });
  const [nitrogen, setNitrogen] = useState({ ...initFert });
  const [dap, setDap] = useState({ ...initFert });
  const [mop, setMop] = useState({ ...initFert });
  const [sulphate, setSulphate] = useState({ ...initFert });

  const [validationMsg, setValidationMsg] = useState('');
  const [results, setResults] = useState([]);

  const toggleSymptom = (sym) => {
    setSymptoms((prev) =>
      prev.includes(sym)
        ? prev.filter((s) => s !== sym)
        : [...prev, sym]
    );
  };

  const validate = () => {
    if (!crop) return 'Please select a crop.';
    if (symptoms.length === 0) return 'Select at least one symptom.';

    const fertGroups = [urea, nitrogen, dap, mop, sulphate];

    for (const fg of fertGroups) {
      if (fg.used === 'Yes' && !fg.qty) {
        return 'Select quantity for all selected fertilizers.';
      }
    }

    if (!lastDate) return 'Provide the last application date.';

    return '';
  };

  const isLowOrAbsent = (fert) => {
    if (fert.used === 'No') return true;

    return fert.qty === 'Less than 25 kg';
  };

  const isExcess = (fert) => {
    if (fert.used !== 'Yes') return false;

    return (
      fert.qty === '50–100 kg' ||
      fert.qty === 'More than 100 kg'
    );
  };

  const analyze = () => {
    const msg = validate();

    if (msg) {
      setValidationMsg(msg);
      setResults([]);
      return;
    }

    setValidationMsg('');

    const findings = [];

    if (
      symptoms.includes('Yellowing leaves') &&
      (isLowOrAbsent(nitrogen) || isLowOrAbsent(urea))
    ) {
      findings.push({
        type: 'Issue',
        title: 'Possible Nutrient Issue: Nitrogen deficiency',
        suggestion:
          'Consider nitrogen supplementation based on crop requirement. Avoid excessive application and prefer balanced nutrient management.',
      });
    }

    if (
      symptoms.includes('Purple/reddish leaves') &&
      isLowOrAbsent(dap)
    ) {
      findings.push({
        type: 'Issue',
        title: 'Possible Nutrient Issue: Phosphorus deficiency',
        suggestion:
          'Increase phosphate fertiliser according to recommended dose for the selected crop.',
      });
    }

    if (
      symptoms.includes('Brown leaf edges') &&
      isLowOrAbsent(mop)
    ) {
      findings.push({
        type: 'Issue',
        title: 'Possible Nutrient Issue: Potassium deficiency',
        suggestion:
          'Apply potassium (MOP) to improve leaf health, following crop-specific guidelines.',
      });
    }

    if (
      symptoms.includes('Slow growth') &&
      [urea, nitrogen, dap, mop, sulphate].every(isLowOrAbsent)
    ) {
      findings.push({
        type: 'Issue',
        title: 'Possible Nutrient Issue: General nutrient deficiency',
        suggestion:
          'Consider a balanced fertiliser program covering NPK and micronutrients.',
      });
    }

    if (
      [urea, nitrogen, dap, mop, sulphate].some(isExcess)
    ) {
      findings.push({
        type: 'Risk',
        title: 'Risk: Possible nutrient imbalance / over-application',
        suggestion:
          'Avoid unnecessary additional fertilizer. Follow recommended crop dosage and consider soil testing before repeated application.',
      });
    }

    if (pesticideUsed === 'Yes') {
      findings.push({
        type: 'Risk',
        title: 'Risk: Chemical-use risk',
        suggestion:
          'Avoid unnecessary repeated pesticide application. Use the appropriate pesticide only when required and prefer integrated pest management.',
      });
    }

    if (organicFertilizer === 'Yes') {
      findings.push({
        type: 'Positive',
        title: 'Positive Practice: Organic fertilizer use',
        suggestion:
          'Organic fertilizer can support soil health and improve organic matter.',
      });
    }

    if (findings.length === 0) {
      findings.push({
        type: 'Info',
        title:
          'No major nutrient issue detected from the provided information.',
        suggestion:
          'This is only a preliminary rule-based assessment. For accurate diagnosis, consider professional soil testing.',
      });
    }

    setResults(findings);
  };

  return (
    <div className="diagnostic-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          analyze();
        }}
      >
        <div className="diag-two-col">

          {/* LEFT COLUMN */}
          <div className="diag-col diag-col--left">

            <fieldset className="diag-fieldset">
              <legend>Crop Information</legend>

              <label htmlFor="crop-select">Crop</label>

              <select
                id="crop-select"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
              >
                <option value="">-- Select Crop --</option>

                {cropOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <div className="symptom-options">
                <span>Symptoms (choose all that apply):</span>

                {symptomOptions.map((sym) => (
                  <label key={sym}>
                    <input
                      type="checkbox"
                      checked={symptoms.includes(sym)}
                      onChange={() => toggleSymptom(sym)}
                    />
                    {sym}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="diag-fieldset">
              <legend>Previous Chemical Use</legend>

              <label>Previous pesticide used?</label>

              <div className="diag-radio-row">
                <label>
                  <input
                    type="radio"
                    name="pesticideUsed"
                    value="Yes"
                    checked={pesticideUsed === 'Yes'}
                    onChange={(e) =>
                      setPesticideUsed(e.target.value)
                    }
                  />
                  Yes
                </label>

                <label>
                  <input
                    type="radio"
                    name="pesticideUsed"
                    value="No"
                    checked={pesticideUsed === 'No'}
                    onChange={(e) =>
                      setPesticideUsed(e.target.value)
                    }
                  />
                  No
                </label>
              </div>

              {pesticideUsed === 'Yes' && (
                <>
                  <label htmlFor="pest-type">
                    Type of pesticide used
                  </label>

                  <select
                    id="pest-type"
                    value={pesticideType}
                    onChange={(e) =>
                      setPesticideType(e.target.value)
                    }
                  >
                    <option value="">-- Select Type --</option>

                    {pesticideTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </fieldset>

            <fieldset className="diag-fieldset">
              <legend>Organic Fertilizer</legend>

              <label>Organic fertilizer used?</label>

              <div className="diag-radio-row">
                <label>
                  <input
                    type="radio"
                    name="organicFertilizer"
                    value="Yes"
                    checked={organicFertilizer === 'Yes'}
                    onChange={(e) =>
                      setOrganicFertilizer(e.target.value)
                    }
                  />
                  Yes
                </label>

                <label>
                  <input
                    type="radio"
                    name="organicFertilizer"
                    value="No"
                    checked={organicFertilizer === 'No'}
                    onChange={(e) =>
                      setOrganicFertilizer(e.target.value)
                    }
                  />
                  No
                </label>
              </div>
            </fieldset>

          </div>

          {/* RIGHT COLUMN */}
          <div className="diag-col diag-col--right">

            <fieldset className="diag-fieldset">
              <legend>Nutrient / Fertilizer History</legend>

              {[
                { name: 'Urea', state: urea, setState: setUrea },
                {
                  name: 'Nitrogen',
                  state: nitrogen,
                  setState: setNitrogen,
                },
                {
                  name: 'DAP / Phosphate',
                  state: dap,
                  setState: setDap,
                },
                {
                  name: 'MOP / Potassium',
                  state: mop,
                  setState: setMop,
                },
                {
                  name: 'Sulphate',
                  state: sulphate,
                  setState: setSulphate,
                },
              ].map((f) => (
                <div className="fertilizer-group" key={f.name}>
                  <label>{f.name} used?</label>

                  <div className="diag-radio-row">
                    <label>
                      <input
                        type="radio"
                        name={`${f.name}-used`}
                        value="Yes"
                        checked={f.state.used === 'Yes'}
                        onChange={(e) =>
                          f.setState({
                            used: e.target.value,
                            qty: '',
                          })
                        }
                      />
                      Yes
                    </label>

                    <label>
                      <input
                        type="radio"
                        name={`${f.name}-used`}
                        value="No"
                        checked={f.state.used === 'No'}
                        onChange={(e) =>
                          f.setState({
                            used: e.target.value,
                            qty: '',
                          })
                        }
                      />
                      No
                    </label>
                  </div>

                  {f.state.used === 'Yes' && (
                    <select
                      value={f.state.qty}
                      onChange={(e) =>
                        f.setState({
                          ...f.state,
                          qty: e.target.value,
                        })
                      }
                    >
                      <option value="">
                        -- Select Quantity --
                      </option>

                      {quantityOptions.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </fieldset>

            <fieldset className="diag-fieldset">
              <legend>Application History</legend>

              <label htmlFor="last-date">
                Last fertilizer/pesticide application date
              </label>

              <input
                type="date"
                id="last-date"
                value={lastDate}
                onChange={(e) => setLastDate(e.target.value)}
              />
            </fieldset>

          </div>
        </div>

        {validationMsg && (
          <div className="validation-msg">
            {validationMsg}
          </div>
        )}

        <button type="submit" className="analyze-btn">
          Analyze
        </button>
      </form>

      {results.length > 0 && (
        <div className="result-section">
          {results.map((res, idx) => (
            <div className="result-card" key={idx}>
              <h4>{res.title}</h4>
              <p>{res.suggestion}</p>
            </div>
          ))}

          <div className="disclaimer">
            <em>
              This is a preliminary rule-based recommendation and not a
              laboratory soil test or professional diagnosis.
            </em>
          </div>
        </div>
      )}
    </div>
  );
}