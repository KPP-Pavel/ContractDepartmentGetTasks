import FormikControl from "../../../formik/FormikControl"
import { Loading } from "./loading"
import React from 'react';
import { bllSendClarify } from '../../../redux/reducers/reducer_taskDO'

function ClarifyData(props) {
    let {idTask, submitForm}=props
    let [showModal, setShowModal] = React.useState(false)
    //console.log(showModal)
    return (
        <>
            <a href='#' className="btn btn-warning w-100"
                onClick={(e) => {
                    e.preventDefault()
                    submitForm()
                    setShowModal(!showModal)
                }}>Запрос дополнительной информации</ a>
            {showModal && <ModalClarifyData setShowModal={setShowModal} idTask={idTask} />}
        </>
    )
}

export default ClarifyData

function ModalClarifyData(props) {
    let { setShowModal,idTask } = props
    let [clarifyText, setClarifyText] = React.useState('')
    let [loading, setLoading] = React.useState(false)

    async function sendClarify(e) {
        //debugger
        e.preventDefault()
        if(!clarifyText){
            alert('Заполните текст запроса') 
            return false
        }

        setLoading(true)
        let data = await bllSendClarify(clarifyText,idTask)
        alert('Запрос на уточнение направлен:\n' + data)
        setLoading(false)
        setShowModal(false)

    }

    //console.log(clarifyText)

    return (
        <>
            <div className='myModal' onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setShowModal(false)
                }
            }}>
                <div className='myModal-dialog border mx-auto rounded'>
                    <div className="mx-3">
                        <div className='my-4'>
                            <h5 className='d-inline'>Запросить дополнительную информацию</h5>
                            <button className="close" onClick={() => setShowModal(false)}>
                                <span>×</span>
                            </button>
                        </div>
                        <hr />
                        <div className='my-4'>
                            <FormikControl
                                control='textarea'
                                label='Текст запроса:'
                                rows='3'
                                name='clarify'
                                value={clarifyText}
                                onChange={(e) => setClarifyText(e.target.value)}
                            />
                            {loading && <Loading />}
                            {!loading && <a href="#" className='btn btn-primary w-100' onClick={sendClarify}>Направить</a>}
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

/*{loading && <Loading />}
                            {!loading && <button type='submit' className='btn btn-primary w-100'>Направить</button>}*/