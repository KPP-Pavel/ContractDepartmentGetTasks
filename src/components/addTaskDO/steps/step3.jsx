import React from 'react';
import FormikControl from '../../../formik/FormikControl'
import { compose } from "redux";
import { connect } from "react-redux";
import { getPeriodsAct, getServices } from "../../../redux/reducers/reducer_taskDO";
import { withRouter } from 'react-router-dom';
import { AddServiceButtonContainer } from '../newchangs/addService';
import ListServicesByGid from '../newchangs/listServicesByGid'
import { ErrorMessage } from 'formik';
import TextError from '../../../formik/fields/textError';

function Step3(props) {
    let { periodsActList, servicesList, setFieldValue, selectedServices,
        gid, TypeService, statusUser, stateNewService, ...rest } = props


    React.useEffect(() => {
        props.getPeriodsAct();
        props.getServices()
    }, [])
    React.useEffect(() => {
        if (stateNewService.name) {
            setFieldValue('selectedServices', [stateNewService, ...selectedServices])
        }
    }, [stateNewService])
    function assService(e) {
        var id = e.target.value
        var name = e.currentTarget
            .querySelector(`option[value="${e.target.value}"]`)
            .textContent
        setFieldValue(
            'selectedServices', [{ id, name }, ...selectedServices]
        )
    }

    function deleteServicesListSelected(e) {
        var id = e.target.getAttribute('data-id')
        var selectedServicesClone = [...selectedServices].filter(item => item.id != id)
        setFieldValue(
            'selectedServices', selectedServicesClone
        )
    }

    function defaultSubject(e) {
        e.preventDefault()

        var SubjectContract = selectedServices.map(item => item.name).join(', ')
        console.log(SubjectContract)
        setFieldValue('SubjectContract', SubjectContract)
    }

    let contentsSelectedServices = selectedServices.map(item => <p className='m-0'><span className='finger'
        data-id={item.id}
        onClick={deleteServicesListSelected}>&#10060;</span>{item.name}</p>)
    return (
        <>
            <h5>Шаг.3 Услуги</h5>
            <hr />
            <FormikControl
                control='select'
                name='PerActService'
                label='Периодичность актирования'
                options={periodsActList}
            />
            <small className="form-text text-muted">Допустим ввод двух дат или текстового поля</small>
            <div className='row align-items-start mx-0'>
                <div className='d-inline-block'>
                    <FormikControl
                        control='input'
                        type='date'
                        name='DateStart'
                        label='Начало оказания услуг'
                    />
                </div>
                <div className='d-inline-block ml-2'>
                    <FormikControl
                        control='input'
                        type='date'
                        name='DateEnd'
                        label='Окончание оказания услуг'
                    />
                </div>
            </div>
            <FormikControl
                control='textarea'
                name='DateText'
                label='Текстовый период'
                rows='3'
                placeholder='пример: "С даты подписания акта"'
            />
            <div className="form-group">
                <label><h6>Код услуги/проекта</h6></label>
                <small className="form-text text-muted">Услуга добавляется двойным кликом</small>
                <div className='row'>
                    <div className='col-6'>
                        <FormikControl
                            control='input'
                            type='text'
                            name='findService'
                            placeholder='Поиск услуги'
                            onKeyPress={(e) => {
                                if (e.key == 'Enter') {
                                    e.preventDefault();
                                    props.getServices(e.target.value)
                                }
                            }}
                            onChange={() => { }}
                        />
                    </div>
                    <div className='col-6'>
                        Выбранные услуги
                        </div>
                </div>
                <div className='row'>
                    <div className='col-6 h-100'>
                        <FormikControl
                            control='select'
                            name='selectAddService'
                            size='5'
                            options={servicesList}
                            onDoubleClick={assService}
                        />
                    </div>
                    <div className='col-6 h-100'>
                        <div className='h-100 overflow-auto'>
                            {contentsSelectedServices}
                        </div>
                        <ErrorMessage name='selectedServices' component={TextError} />
                    </div>
                </div>
            </div>
            <AddServiceButtonContainer />
            <a href='#' className='float-right' onClick={defaultSubject}>Заполнить по умолчанию</ a>
            <FormikControl
                control='textarea'
                name='SubjectContract'
                label='Предмет документа'
                rows='3'
                placeholder='Кнопка "Заполнить по умолчанию" внесет все услуги через запятую,
для дополнительного соглашения необходимо внести предмет документа'
            />
            <FormikControl
                control='textarea'
                name='AdditionalConditional'
                label='Дополнительные условия'
                rows='3'
                placeholder='Укажите информацию, которую необходимо учесть при подготовке договора'
            />
            {statusUser == 'Admin' && <ListServicesByGid gid={gid} TypeService={TypeService} />}
        </>
    )
}

let mapStateToProps = (state) => {
    //debugger;
    return {
        periodsActList: state.TaskDOForm.periodsActList,
        servicesList: state.TaskDOForm.servicesList
    }
}

export default compose(
    connect(mapStateToProps,
        { getPeriodsAct, getServices }),
    withRouter
)(Step3);