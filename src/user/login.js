import React from "react"

export default function Login() {
  React.useEffect(() => {
    document.title = "登录 - THE.TOP LINK"
  }, [])
  return (
    <div className="login-main">
      <div className="login-wraper">
        
      </div>
    </div>
  )
}

function MultiStepsForm() {
  const [step, setStep] = React.useState(0)

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleReset = () => {
    setStep(0)
  }

  return (
    <div>
      {step === 0 && (
        <div>
          <p>Step 1</p>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 1 && (
        <div>
          <p>Step 2</p>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <p>Step 3</p>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  )
}