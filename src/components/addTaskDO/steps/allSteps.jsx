import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import Step4 from './step4'
import Step5 from './step5'

function AllSteps(props) {
    let {propsStep1,propsStep2,propsStep3,propsStep4,propsStep5}=props
    return <>
        <Step1 {...propsStep1}/>
        <Step2 {...propsStep2}/>
        <Step3 {...propsStep3}/>
        <Step4 {...propsStep4}/>
        <Step5 {...propsStep5}/>
    </>
}

export default AllSteps