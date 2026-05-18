import { useState } from 'react'
import StepController from './components/StepController'
import DevStepJump from './components/DevStepJump'
import Step01_Incident from './components/steps/Step01_Incident'
import Step04_MessagePicker from './components/steps/Step04_MessagePicker'
import Step06_ResultSanctie from './components/steps/Step06_ResultSanctie'
import Step07_ResultDescriptief from './components/steps/Step07_ResultDescriptief'
import Step08_ResultInjunctief from './components/steps/Step08_ResultInjunctief'
import Step09_BigFinding from './components/steps/Step09_BigFinding'
import Step10_HardeKern from './components/steps/Step10_HardeKern'
import Step11_Implications from './components/steps/Step11_Implications'
import Step12_Overview from './components/steps/Step12_Overview'

const TOTAL_STEPS = 9

export default function App() {
  const [step, setStep] = useState(1)
  const [ready, setReady] = useState(false)
  const [messageEstimates, setMessageEstimates] = useState({
    sanctie: null,
    descriptief: null,
    injunctief: null,
  })

  function saveMessageEstimate(messageId, value) {
    setMessageEstimates(prev => ({ ...prev, [messageId]: value }))
  }

  function goNext() {
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1)
      setReady(false)
    }
  }

  function goBack() {
    if (step > 1) {
      setStep(s => s - 1)
      setReady(true)
    }
  }

  function markReady() {
    setReady(true)
  }

  function jumpToStep(n) {
    if (n < 1 || n > TOTAL_STEPS) return
    setStep(n)
    setReady(false)
    if (n >= 3 && n <= 5) {
      setMessageEstimates(prev => ({
        sanctie: prev.sanctie ?? 'ineffective',
        descriptief: prev.descriptief ?? 'effective',
        injunctief: prev.injunctief ?? 'ineffective',
      }))
    }
  }

  function renderStep() {
    switch (step) {
      case 1:  return <Step01_Incident onReady={markReady} />
      case 2:  return (
        <Step04_MessagePicker
          onReady={markReady}
          onEstimate={saveMessageEstimate}
        />
      )
      case 3:  return <Step06_ResultSanctie onReady={markReady} />
      case 4:  return <Step07_ResultDescriptief onReady={markReady} />
      case 5:  return <Step08_ResultInjunctief onReady={markReady} />
      case 6:  return <Step09_BigFinding onReady={markReady} />
      case 7:  return <Step10_HardeKern onReady={markReady} />
      case 8:  return <Step11_Implications onReady={markReady} />
      case 9:  return <Step12_Overview onReady={markReady} />
      default: return null
    }
  }

  return (
    <>
      <StepController
        step={step}
        totalSteps={TOTAL_STEPS}
        canProceed={ready}
        onNext={goNext}
        onBack={goBack}
      >
        <div key={step}>{renderStep()}</div>
      </StepController>
      {import.meta.env.DEV ? (
        <DevStepJump currentStep={step} onJump={jumpToStep} />
      ) : null}
    </>
  )
}
