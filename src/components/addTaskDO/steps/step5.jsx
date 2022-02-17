import React from 'react';
import FormikControl from '../../../formik/FormikControl'
import { compose } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import { getListTemplateDoc, getuserslist, getSY } from "../../../redux/reducers/reducer_taskDO";
import { withRouter } from 'react-router-dom';
import { Loading } from "../newchangs/loading";

function ReduserStep5(props) {
    let { values, setFieldValue, idTask, statusTask, submitForm, isValid } = props
    let loading = useSelector(state => state.TaskDOForm.loading)
    let statusUser = useSelector(state => state.TaskDOForm.statusUser)

    //console.log('statusUser', statusUser)

    if (idTask)
        switch (statusUser) {
            case 'Admin':
                return (<>
                    <References refs={values} />
                    {loading && <Loading />}
                    {loading || !statusTask && <AdminForm myProps={{ values, setFieldValue }} loading={loading} submitForm={submitForm} />}
                    {!isValid && <DangerNote />}
                </>)
            case 'ManagerPP':
                return (<>
                    <References refs={values} />
                </>)
            case 'ManagerCD':
                return (<>
                    <References refs={values} />
                    {loading && <Loading />}
                    {loading || statusTask == 2 && <ManagerDOForm myProps={{ values, setFieldValue }} loading={loading} submitForm={submitForm} />}
                    {!isValid && <DangerNote />}
                </>)
        }

    return <Step5Container {...props} />

}

function Step5(props) {
    let { values, setFieldValue, idTask, statusTask, getSY, TypeService, isValid } = props

    let myProps = { values, setFieldValue }
    let loading = useSelector(state => state.TaskDOForm.loading)
    //console.log(loading)
    React.useEffect(() => getSY(TypeService), [])

    //debugger
    if (props.refSY[0].ref) {
        var ref = (<>
            <label><h6>Шаблон СУ:</h6></label>
            <a href={props.refSY[0].ref} className='btn btn-light d-block text-left' download>{props.refSY[0].name}</a>
        </>)
    }
    return (
        <div>
            <h5>Шаг.5 Файлы</h5>
            <hr />
            <div className="form-group">
                {ref}
            </div>

            <small className="form-text text-muted m-0">Обязательные файлы</small>
            <hr className='mt-1' />

            <InputFileGroup
                name='FileSU'
                label={<>Существенные условия (СУ) <span className="text-success">excel</span></ >}
                accept='.xls,.xlsx,.xlsm'
                {...myProps}
            />
            <InputFileGroup
                name='FilePrice'
                label={<>Расчет стоимости ФЭУ <span className="text-success">excel</span></ >}
                accept='.xls,.xlsx,.xlsm'
                {...myProps}
            />

            <small className="form-text text-muted m-0">Обязательные файлы для услуг УУП, Подряд, Настройка, ИТ Разовые, Проектный офис</small>
            <hr className='mt-1' />


            <InputFileGroup
                name='fileListService'
                label={<>Перечень услуг (приложение №1) <span className="text-success">excel</span>/
                    <span className="text-primary">word</span></ >}
                accept='.xls,.xlsx,.xlsm,.doc,.docm,.docx'
                {...myProps}
            />
            <InputFileGroup
                name='FileExplanatoryNote'
                label={<>Пояснительная записка <span className="text-primary">word</span></ >}
                accept='.doc,.docm,.docx'
                {...myProps}
            />
            <small className="form-text text-muted m-0">Не обязательные файлы</small>
            <hr className='mt-1' />

            <InputFileGroup
                name='FileApplication'
                label={<>Приложение к договору <span className="text-primary">word</span></ >}
                accept='.doc,.docm,.docx'
                {...myProps}
            />
            <InputFileGroup
                name='FileEdit'
                label='Прикрепить перечень правок по тексту договора'
                accept='.doc,.docm,.docx'
                {...myProps}
            />
            <InputFileGroup
                name='FileUS'
                label={<>Протокол УС <span className="text-primary">pdf/jpg</span></ >}
                accept='.pdf,.jpg'
                {...myProps}
            />
            <InputFileGroup
                name='FileOther'
                label='Прикрепить прочие файлы'
                {...myProps}
            />
            <InputFileGroup
                name='fileScanContract'
                label={<>Скан-копия подписанного договора <span className="text-primary">pdf/jpg</span></ >}
                accept='.pdf,.jpg'
                {...myProps}
            />
            {loading && <Loading />}
            {!loading && <ButtonGroup idTask={idTask} myProps={myProps} statusTask={statusTask} loading={loading} />}
            {!isValid && <DangerNote />}
        </div>
    )
}

function ButtonGroup(props) {
    let { myProps, idTask, statusTask, loading } = props
    return (
        <>
            {!idTask && <button type='submit' className='btn btn-primary w-100'>Направить заявку</button>}
            {idTask && !statusTask && <AdminForm myProps={myProps} loading={loading} />}
        </>
    )
}

let mapStateToProps = (state) => {
    //debugger;
    return {
        refSY: state.TaskDOForm.refSY
    }
}

let Step5Container = compose(
    connect(mapStateToProps,
        { getSY }),
    withRouter
)(Step5);




function SelectedFiles(props) {
    let { arr, name, setFieldValue } = props
    arr = arr[0]
    function clearData(e) {
        //debugger
        e.preventDefault();
        setFieldValue(name, [])
    }

    if (!arr) return <></>

    if (!arr['length']) return <></>
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        newArr.push(arr[i])
        newArr[i].id = i
    }
    //debugger
    let selectedFilesSY = newArr.map(item =>
        <p className='m-0' key={item.id}>{item.name}</p>)

    return <div>
        <h6 className='d-inline-block'>Выбранные файлы</h6>
        <a className='ml-3' onClick={clearData} href='#'>&#10060;Очистить</a>
        {selectedFilesSY}
    </div>
}

function InputFileGroup(props) {
    let { values, setFieldValue, ...rest } = props
    return (
        <div className="row mt-2">
            <div className="col-5">
                <FormikControl
                    control='InputFile'
                    multiple='multiple'
                    {...rest}
                />
            </div>
            <div className="col-7">
                <SelectedFiles
                    arr={values[rest.name]}
                    setFieldValue={setFieldValue}
                    name={rest.name}
                />
            </div>
        </div>
    )

}

function ManagerDOForm(props) {
    let { myProps, submitForm } = props
    function setStatus(status) {
        myProps.setFieldValue('statusTask', status)
    }

    return (
        <>
            <FormikControl
                control='input'
                label='ID задачи ПК'
                type='number'
                name='IDPK'
            />

            <FormikControl
                control='textarea'
                name='CommentCD'
                label='Комментарий ДО'
                rows='3'
                placeholder='Указать для особых случаев'
            />
            <div className="row mb-4">
                <div className="col-6">
                    <ButtonToWork setFieldValue={myProps.setFieldValue} submitForm={submitForm} />
                </div>
                <div className="col-6">
                    <ButtonReject setFieldValue={myProps.setFieldValue} submitForm={submitForm} />
                </div>
            </div>
        </>
    )
}

export function ButtonToWork(props) {
    let { setFieldValue, submitForm } = props
    function setStatus(status) {
        setFieldValue('statusTask', status)
    }
    return (
        <button
            type='submit'
            onClick={() => {
                setStatus(1)
                submitForm()
            }}
            className='btn btn-primary w-100'>Направить в работу</button>
    )
}

export function ButtonReject(props) {
    let { setFieldValue, submitForm } = props
    function setStatus(status) {
        setFieldValue('statusTask', status)
    }
    return (
        <button
            type='submit'
            onClick={() => {
                setStatus(3)
                submitForm()
            }}
            className='btn btn-danger w-100'>Отклонить</button>
    )
}
export function ButtonAdditionalApprove(props) {
    let { setFieldValue, submitForm } = props
    function setStatus(status) {
        setFieldValue('statusTask', status)
    }
    return (
        <button
            type='submit'
            onClick={() => {
                setStatus(2)
                submitForm()
            }}
            className='btn btn-warning w-100'>Направить на предварительное согласование</button>
    )
}


function AdminForm(props) {
    let { myProps, loading, submitForm } = props
    let listUsersPP = useSelector(state => state.TaskDOForm.listUsersPP)
    let listTemplateDoc = useSelector(state => state.TaskDOForm.listTemplateDoc)
    let dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getuserslist())
        dispatch(getListTemplateDoc())
    }, [])

    //console.log('loading', loading)

    function setStatus(status) {
        myProps.setFieldValue('statusTask', status)
    }

    //debugger
    return (
        <div>
            <small className="form-text text-muted m-0">Панель администратора</small>
            <hr className='mt-1' />
            <FormikControl
                control='select'
                label='Шаблон договора'
                name='templateDoc'
                options={listTemplateDoc}
            />
            <FormikControl
                control='select'
                label='Изменить автора задачи'
                name='IdAuthor'
                options={listUsersPP}
            />

            <FormikControl
                control='input'
                label='ID задачи ПК'
                type='number'
                name='IDPK'
            />

            <FormikControl
                control='textarea'
                name='CommentCD'
                label='Комментарий ДО'
                rows='3'
                placeholder='Указать для особых случаев'
            />
            <InputFileGroup
                name='aditionalFilesDO'
                label='Добавить файлы ДО'
                {...myProps}
            />
            {loading && <Loading />}
            {!loading && <div className="row mb-4">
                <div className="col-4">
                    <ButtonToWork setFieldValue={myProps.setFieldValue} submitForm={submitForm} />
                </div>

                <div className="col-4">
                    <ButtonAdditionalApprove setFieldValue={myProps.setFieldValue} submitForm={submitForm} />
                </div>


                <div className="col-4">
                    <ButtonReject setFieldValue={myProps.setFieldValue} submitForm={submitForm} />
                </div>
            </div>}
        </div>
    )
}

function References(props) {
    let { refs } = props
    /*let refs = [
        {
            ref: '#',
            name: 'KPP1'
        },
        {
            ref: '#',
            name: 'KPP2'
        }
    ] */

    return (
        <div>
            <h5>Шаг.5 Файлы</h5>
            <hr />

            <small className="form-text text-muted m-0">Обязательные файлы</small>
            <hr className='mt-1' />
            <ReferenceGroup label='Существенные условия (СУ)' name='FileSU' optionsRef={refs.FileSU} />
            <ReferenceGroup label='Расчет стоимости ФЭУ' name='FilePrice' optionsRef={refs.FilePrice} />

            <small className="form-text text-muted m-0">Обязательные файлы для услуг УУП, Подряд, Настройка, ИТ Разовые, Проектный офис</small>
            <hr className='mt-1' />

            <ReferenceGroup label='Перечень услуг (приложение №1)' name='fileListService' optionsRef={refs.fileListService} />
            <ReferenceGroup label='Пояснительная записка' name='FileExplanatoryNote' optionsRef={refs.FileExplanatoryNote} />

            <small className="form-text text-muted m-0">Не обязательные файлы</small>
            <hr className='mt-1' />

            <ReferenceGroup label='Приложение к договору' name='FileApplication' optionsRef={refs.FileApplication} />
            <ReferenceGroup label='Прикрепить перечень правок по тексту договора' name='FileEdit' optionsRef={refs.FileEdit} />
            <ReferenceGroup label='Протокол УС' name='FileUS' optionsRef={refs.FileUS} />
            <ReferenceGroup label='Прикрепить прочие файлы' name='FileOther' optionsRef={refs.FileOther} />
            <ReferenceGroup label='Скан-копия подписанного договора' name='fileScanContract' optionsRef={refs.fileScanContract} />
            <ReferenceGroup label='Добавленные файлы ДО' name='aditionalFilesDO' optionsRef={refs.aditionalFilesDO} />

        </div>
    )
}


function ReferenceGroup(props) {
    let { label, optionsRef } = props
    let refs = optionsRef ? optionsRef.map(item => <a
        href={item.ref}
        className='btn btn-light d-block text-left'
        download
    >{item.name}</a>) : '';
    return (
        <div className="row align-items-center mb-2" >
            <div className="col-5">
                <h6>{label}</h6>
            </div>
            <div className="col-7">
                {refs}
            </div>
        </div >
    )
}

export function DangerNote(props) {
    return (
        <div className="alert alert-danger my-2" role="alert">
            <h4 className="alert-heading">Ошибка!</h4>
            <p>В форме ошибка. Шаги с ошибками и поля подсвечены красным</p>
            <hr />
            <p className="mb-0">При возникновении вопросов обратитеcь к <a href='EKaVinokurova@greenatom.ru'>Винокуровой Екатерине</a></p>
        </div>
    )
}

export default ReduserStep5