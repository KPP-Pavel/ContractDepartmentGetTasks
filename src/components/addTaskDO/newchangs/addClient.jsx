import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from "yup"
import FormikControl from '../../../formik/FormikControl'
import '.././steps/modalWindow.css';
import { compose } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import { toggleAddClientFormAC, saveNewClient } from "../../../redux/reducers/reducer_taskDO";
import { Loading } from "./loading";

function AddClientButton(props) {
    return (
        <>
            <a className='btn btn-light w-100'
                onClick={(e)=>{
                    e.preventDefault()
                    props.toggleAddClientFormAC()
                }}
            >
                Запрос на добавление заказчика
            </a>
        </>
    )
}

function AddClient(props) {
    let loading=useSelector(state=>state.TaskDOForm.loading)
    let dispatch=useDispatch();
    let {setMainCP}=props


    if (!props.addClientForm) return <></>
    let initialValues2 = {
        inn: '',
        gid: '',
        name: '',
        contacts: ''
    }

    let reguiredText = 'Обязательное поле'

    let validationSchema = Yup.object({
        inn: Yup.number().required(reguiredText),
        gid: Yup.number().required(reguiredText),
        name: Yup.string().required(reguiredText),
        contacts: Yup.string().required(reguiredText)
    })

    let onSubmit = (values, ...rest) => {
        //debugger
        //console.log('rest',rest)
        setMainCP([{id: 0, name: values.name}])
        setMainCP([])
        dispatch(saveNewClient(values))
        //resetForm(false)
    }

    return (
        <>
            <div className='myModal' onClick={(e) => {
                if (e.target === e.currentTarget) {
                    props.toggleAddClientFormAC()
                }
            }}>
                <div className='myModal-dialog border mx-auto rounded'>
                    <div className="mx-3">
                        <div className='my-4'>
                            <h5 className='d-inline'>Подать заявку на добавление заказчика</h5>
                            <button className="close" onClick={props.toggleAddClientFormAC}>
                                <span>×</span>
                            </button>
                        </div>
                        <hr />
                        <div className='my-4'>
                            <Formik
                                id='kpp'
                                initialValues={initialValues2}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                {
                                    formik => {
                                        return (
                                            <Form onSubmit={formik.handleSubmit}>
                                                <FormikControl
                                                    control='input'
                                                    label='ИНН:'
                                                    type='number'
                                                    name='inn'
                                                />
                                                <FormikControl
                                                    control='input'
                                                    label='GID:'
                                                    type='number'
                                                    name='gid'
                                                />
                                                <FormikControl
                                                    control='textarea'
                                                    label='Наименование контрагента:'
                                                    rows='3'
                                                    name='name'
                                                />
                                                <FormikControl
                                                    control='textarea'
                                                    label='Контактное лицо со стороны заказчика:'
                                                    rows='3'
                                                    name='contacts'
                                                />
                                                {loading&&<Loading/>}
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


let mapStateToProps = (state) => {
    //debugger;
    return {
        addClientForm: state.TaskDOForm.toggleForms.addClientForm
    }
}

export let AddClientContainer = compose(
    connect(mapStateToProps,
        { toggleAddClientFormAC })
)(AddClient);

let mapStateToProps1 = (state) => {
    //debugger;
    return {}
}

export let AddClientButtonContainer = compose(
    connect(mapStateToProps1,
        { toggleAddClientFormAC })
)(AddClientButton);






