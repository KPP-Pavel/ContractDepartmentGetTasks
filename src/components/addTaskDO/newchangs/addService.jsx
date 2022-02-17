import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from "yup"
import FormikControl from '../../../formik/FormikControl'
import '.././steps/modalWindow.css';
import { compose } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import { toggleAddServiceFormAC,getDepartments,getTypesContract,saveNewService } from "../../../redux/reducers/reducer_taskDO";
import { Loading } from "./loading";

function AddServiceButton(props) {
    return (
        <>
            <a className='btn btn-light w-100'
                onClick={(e)=>{
                    e.preventDefault()
                    props.toggleAddServiceFormAC()
                }}
            >
                Запрос на добавление услуги
            </a>
        </>
    )
}


function AddService(props) {
    let { setStateNewService }=props
    let loading=useSelector(state=>state.TaskDOForm.loading)
    let dispatch=useDispatch();

    React.useEffect(() => {
        props.getDepartments()
        props.getTypesContract()
    }, [])

    if (!props.addServiceForm) return <></>
    let initialValues = {
        department: '',
        groupService: '',
        manager: '',
        codeService: '',
        nameService: '',
        typeService: '',
        nomenclatureGroup: '',
        measurement: ''
    }

    let reguiredText = 'Обязательное поле'

    let validationSchema = Yup.object({
        department: Yup.number().required(reguiredText),
        groupService: Yup.string().required(reguiredText),
        manager: Yup.string().required(reguiredText),
        codeService: Yup.string().required(reguiredText),
        nameService: Yup.string().required(reguiredText),
        typeService: Yup.number().required(reguiredText),
        nomenclatureGroup: Yup.string().required(reguiredText),
        measurement: Yup.string().required(reguiredText)
    })

    let onSubmit = values => {
        setStateNewService({id: 0, name: values.codeService})
        setStateNewService({})
        dispatch(saveNewService(values))
    }

    return (
        <>
            <div className='myModal' onClick={(e) => {
                if (e.target === e.currentTarget) {
                    props.toggleAddServiceFormAC()
                }
            }}>
                <div className='myModal-dialog border mx-auto rounded'>
                    <div className="mx-3">
                        <div className='my-4'>
                            <h5 className='d-inline'>Подать заявку на добавление услуги</h5>
                            <button className="close" onClick={props.toggleAddServiceFormAC}>
                                <span>×</span>
                            </button>
                        </div>
                        <hr />
                        <div className='my-4'>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                {
                                    formik => {
                                        return (
                                            <Form>
                                                <FormikControl
                                                    control='select'
                                                    label='Подразделение, оказывающее услугу (МВЗ):'
                                                    name='department'
                                                    options={props.departmentsList}
                                                />
                                                <FormikControl
                                                    control='input'
                                                    label='Группа услуг::'
                                                    type='text'
                                                    name='groupService'
                                                    placeholder='Для проектов - есть в калькуляторе УУП, для остальных услуг - в бюджете'
                                                />
                                                <FormikControl
                                                    control='input'
                                                    label='Менеджер услуги:'
                                                    type='text'
                                                    name='manager'
                                                />
                                                <FormikControl
                                                    control='input'
                                                    label='Код услуги/проекта:'
                                                    type='text'
                                                    name='codeService'
                                                />
                                                <FormikControl
                                                    control='textarea'
                                                    label='Наименование услуги:'
                                                    rows='3'
                                                    name='nameService'
                                                />
                                                <FormikControl
                                                    control='select'
                                                    label='Вид договора:'
                                                    name='typeService'
                                                    options={props.typeContractsList}
                                                />
                                                <FormikControl
                                                    control='input'
                                                    label='Номенклатурная группа:'
                                                    type='text'
                                                    name='nomenclatureGroup'
                                                />
                                                <FormikControl
                                                    control='input'
                                                    label='Единица измерения услуги:'
                                                    type='text'
                                                    name='measurement'
                                                />

                                                {loading&&<Loading />}
                                                {!loading&&<button type='submit' className='btn btn-primary w-100'>Направить</button>}
                                            </Form>

                                        )
                                    }
                                }
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

let mapStateToProps3 = (state) => {
    //debugger;
    return {
        addServiceForm: state.TaskDOForm.toggleForms.addServiceForm,
        typeContractsList: state.TaskDOForm.typeContractsList,
        departmentsList: state.TaskDOForm.departmentsList
    }
}

export let AddServiceContainer = compose(
    connect(mapStateToProps3,
        { toggleAddServiceFormAC,getDepartments,getTypesContract })
)(AddService);


let mapStateToProps4 = (state) => {
    //debugger;
    return {
        addServiceForm: state.TaskDOForm.toggleForms.addServiceForm,
        typeContractsList: state.TaskDOForm.typeContractsList,
        departmentsList: state.TaskDOForm.departmentsList
    }
}

export let AddServiceButtonContainer = compose(
    connect(mapStateToProps4,
        { toggleAddServiceFormAC})
)(AddServiceButton);