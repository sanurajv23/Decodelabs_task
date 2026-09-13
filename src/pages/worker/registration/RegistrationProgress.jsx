export default function RegistrationProgress({ step = 1 }) {
  // Exact class logic matching vanilla templates
  const isStep1Active = step === 1;
  const isStep1Done = step > 1;

  const isStep2Active = step === 2;
  const isStep2Done = step > 2;

  const isStep3Active = step === 3;
  const isStep3Done = step > 3;

  const isStep4Active = step === 4;

  return (
    <div className="reg-progress" aria-label="Registration Progress">
      {/* Step 1 */}
      <div className="reg-step-item">
        <div className="reg-step-top">
          <div className={`reg-step-circle ${isStep1Done ? "completed" : isStep1Active ? "active" : ""}`}>
            1
          </div>
          <div className={`reg-step-line ${isStep1Done ? "completed" : ""}`}></div>
        </div>
        <span className={`reg-step-label ${isStep1Active ? "active" : ""}`}>Verify</span>
      </div>

      {/* Step 2 */}
      <div className="reg-step-item">
        <div className="reg-step-top">
          <div className={`reg-step-line ${isStep1Done ? "completed" : ""}`}></div>
          <div className={`reg-step-circle ${isStep2Done ? "completed" : isStep2Active ? "active" : ""}`}>
            2
          </div>
          <div className={`reg-step-line ${isStep2Done ? "completed" : ""}`}></div>
        </div>
        <span className={`reg-step-label ${isStep2Active ? "active" : ""}`}>Register Details</span>
      </div>

      {/* Step 3 */}
      <div className="reg-step-item">
        <div className="reg-step-top">
          <div className={`reg-step-line ${isStep2Done ? "completed" : ""}`}></div>
          <div className={`reg-step-circle ${isStep3Done ? "completed" : isStep3Active ? "active" : ""}`}>
            3
          </div>
          <div className={`reg-step-line ${isStep3Done ? "completed" : ""}`}></div>
        </div>
        <span className={`reg-step-label ${isStep3Active ? "active" : ""}`}>Add Work Details</span>
      </div>

      {/* Step 4 */}
      <div className="reg-step-item">
        <div className="reg-step-top">
          <div className={`reg-step-line ${isStep3Done ? "completed" : ""}`}></div>
          <div className={`reg-step-circle ${isStep4Active ? "active" : ""}`}>
            4
          </div>
        </div>
        <span className={`reg-step-label ${isStep4Active ? "active" : ""}`}>Complete</span>
      </div>
    </div>
  );
}
