import React from 'react';
import FormikControl from '../../../formik/FormikControl'
import { compose } from "redux";
import { connect } from "react-redux";
import { getTypesContract, getDepartments, rulesStep1AC } from "../../../redux/reducers/reducer_taskDO";
import { withRouter } from 'react-router-dom';
import ListTask from './listTask';
import './modalWindow.css';
import { DangerNote } from './step5';

function Step1(props) {

    let { dep, typeContractsList, departmentsList, taskActualization, setFieldValue, ...rest } = props

    React.useEffect(() => props.getDepartments(),
        []
    )

    React.useEffect(() => props.getTypesContract(dep),
        [dep]
    )


    let onChangetaskActualization = (e) => {
        let val = e.target.value
        //debugger
        setFieldValue('taskActualization', val)
        if (val == '0') setFieldValue('taskActualizationNumber', null)
    }




    const TypeDocOptions = [
        { id: '1', name: 'Договор' },
        { id: '2', name: 'ДС' }
    ]
    const taskActualizationOptions = [
        { id: '1', name: 'Да' },
        { id: '0', name: 'Нет' }
    ]

    //console.log(taskActualization)

    return (
        <>
            <h5>Шаг.1 Документ</h5>
            <hr />
            <FormikControl
                control='radio'
                label='Актуализация задачи'
                name='taskActualization'
                options={taskActualizationOptions}
                onChange={onChangetaskActualization}
            />
            {taskActualization == '1' && <FindTask setFieldValue={setFieldValue} />}


            <FormikControl
                control='radio'
                label='Тип документа'
                name='TypeDoc'
                options={TypeDocOptions}
            />
            <FormikControl
                control='select'
                label='Подразделение оказывающее услуги (МВЗ)'
                name='Dep'
                options={departmentsList}
            />
            <FormikControl
                control='select'
                label='Вид договора'
                name='TypeService'
                options={typeContractsList}
            />
            <DangerNote />
        </>
    )
}

let mapStateToProps = (state) => {
    //debugger;
    return {
        typeContractsList: state.TaskDOForm.typeContractsList,
        departmentsList: state.TaskDOForm.departmentsList
    }
}

export default compose(
    connect(mapStateToProps,
        { getTypesContract, getDepartments }),
    withRouter
)(Step1);

function FindTask(props) {

    let { setFieldValue } = props

    let setTaskActualizationNumber = (val) => {
        setFieldValue('taskActualizationNumber', val)
        setToggleModal(false)
    }

    let [toggleModal, setToggleModal] = React.useState(false)

    let showModal = (e) => {
        e.preventDefault()
        setToggleModal(true)
    }

    return (
        <>
            <a href='#' className='btn btn-light w-100' onClick={showModal}>Выбрать задачу</a>
            <FormikControl
                control='input'
                type='text'
                readOnly='readOnly'
                name='taskActualizationNumber'
                label='Актуализируемая задача'
            />
            {toggleModal && <ModalSelectTask
                toggleModal={toggleModal}
                setToggleModal={setToggleModal}
                setTaskActualizationNumber={setTaskActualizationNumber}
            />}
        </>
    )
}


function ModalSelectTask(props) {
    let { toggleModal, setToggleModal, setTaskActualizationNumber } = props
    return (
        <div className='myModal' onClick={(e) => {
            if (e.target === e.currentTarget) {
                setToggleModal(!toggleModal)
            }
        }}>
            <div className='myModal-dialog border mx-auto rounded' style={{ maxWidth: '90%' }}>
                <div className="mx-3">
                    <div className='my-4'>
                        <h5 className='d-inline'>Выбрать задачу</h5>
                        <button className="close" onClick={(e) => { e.preventDefault(); setToggleModal(!toggleModal) }}>
                            <span>×</span>
                        </button>
                    </div>
                    <hr />
                    <div className='my-4'>
                        <ListTask formRef='1' setTaskActualizationNumber={setTaskActualizationNumber} />
                    </div>
                </div>
            </div>
        </div >
    )
}