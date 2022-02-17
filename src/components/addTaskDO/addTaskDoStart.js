import NavTaskContainer from "./nav/navTaskContainer"
import { NavLink, Route } from 'react-router-dom';
import logo from '../../logo.svg';
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import Step4 from "./steps/step4";
import Step5, { ButtonAdditionalApprove, ButtonReject, ButtonToWork } from "./steps/step5";
import AllSteps from "./steps/allSteps";
import ListTask from "./steps/listTask";
import { AddServiceContainer } from "./newchangs/addService";
import { AddClientContainer } from "./newchangs/addClient";
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from "yup"
import './steps/modalWindow.css';
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "./newchangs/loading";
import StatusNote from './newchangs/statusNote'
import MyRedirect from './newchangs/redirect'
import ClarifyData from './newchangs/clarifyData'
import { rebutStateAC, getStatusUser, sendDat } from "../../redux/reducers/reducer_taskDO";

export let reguiredFields

function AddTaskDoStart(props) {

    let statusUser = useSelector(state => state.TaskDOForm.statusUser)
    let dispatch = useDispatch();
    let [totalLoading, setTotalLoading] = React.useState(true)
    let [stateMainCP, setStateMainCP] = React.useState([])
    let [stateNewService, setStateNewService] = React.useState({})

    //console.log(stateMainCP)

    React.useEffect(() => dispatch(getStatusUser()), [])

    React.useEffect(() => {
        if (statusUser) {
            setTotalLoading(false)
        }
    }, [statusUser])
    //debugger
    if (totalLoading) return (
        <div className='w-25 mx-auto mt-4'>
            <Loading note='Загрузка' />
        </div>
    )

    const initialValues = {
        idTask: null,
        IDPK: '',
        statusTask: null,
        IdAuthor: null,
        taskActualization: '0',
        taskActualizationNumber: '',
        TypeDoc: '',
        Dep: '',
        TypeService: '',
        MainCP: [],
        num_doc_parent: { id: '', number: '' },
        PerActService: '',
        DateStart: '',
        DateEnd: '',
        DateText: '',
        selectedServices: [],
        SubjectContract: '',
        AdditionalConditional: '',
        signerClient: '',
        ContactManagerGA: '',
        ContactsCp: '',
        systemsClient: '',
        CommentCD: '',
        boxServiceBool: '0',
        coExecutorBool: '0',
        worcClientAreaBool: '0',
        TransferAreaBool: '0',
        TransferToolsBool: '0',
        templateDoc: '',
        FileSU: [],
        FilePrice: [],
        fileListService: [],
        FileExplanatoryNote: [],
        FileApplication: [],
        FileEdit: [],
        FileUS: [],
        FileOther: [],
        fileScanContract: [],
        aditionalFilesDO: []
    }


    let reguiredText = 'Обязательное поле'
    const validationSchema = Yup.object({
        TypeDoc: Yup.string().required(reguiredText),
        Dep: Yup.string().required(reguiredText),
        TypeService: Yup.string().required(reguiredText),
        PerActService: Yup.string().required(reguiredText),
        SubjectContract: Yup.string().required(reguiredText),
        MainCP: Yup.array().min(1, reguiredText),
        FileSU: Yup.array().min(1, reguiredText),
        selectedServices: Yup.array().min(1, reguiredText)
    })

    reguiredFields = validationSchema._nodes;

    const onSubmit = values => {
        //debugger
        dispatch(sendDat(values))
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                    formik => {
                        let { values, setFieldValue, setValues, resetForm, submitForm, isValid } = formik
                        console.log(values.taskActualizationNumber)

                        //if(serverValues)formik.setValues(serverValues)


                        let gid = values.MainCP[0] ? values.MainCP[0].id : 0;
                        let idPK = values.idPK
                        let idTask = values.idTask

                        let { FileSU,
                            FilePrice,
                            fileListService,
                            FileExplanatoryNote,
                            FileApplication,
                            FileEdit,
                            FileUS,
                            FileOther,
                            fileScanContract,
                            aditionalFilesDO } = formik.values

                        let propsStep1 = {
                            dep: values.Dep,
                            taskActualization: values.taskActualization,
                            taskActualizationNumber: values.taskActualizationNumber,
                            setFieldValue
                        }
                        let propsStep2 = {
                            setFieldValue,
                            MainCP: values.MainCP,
                            newMainCP: stateMainCP,
                            TypeDoc: values.TypeDoc,
                            num_doc_parent: values.num_doc_parent,
                            TypeService: values.TypeService
                        }
                        let propsStep3 = {
                            setFieldValue,
                            stateNewService,
                            selectedServices: values.selectedServices,
                            gid,
                            TypeService: values.TypeService,
                            statusUser
                        }
                        let propsStep4 = {}
                        let propsStep5 = {
                            setFieldValue,
                            values: {
                                FileSU,
                                FilePrice,
                                fileListService,
                                FileExplanatoryNote,
                                FileApplication,
                                FileEdit,
                                FileUS,
                                FileOther,
                                fileScanContract,
                                aditionalFilesDO
                            },
                            idTask: values.idTask,
                            statusTask: values.statusTask,
                            TypeService: values.TypeService,
                            submitForm,
                            isValid
                        }



                        //console.log('FileSU',FileSU.length)
                        //console.log('formik', formik.values)
                        //rebutStateAC
                        return (
                            <div className='container-fuild mx-2'>
                                <MyRedirect />
                                <Form>
                                    <TopButtonGroup
                                        resetForm={resetForm}
                                        setFieldValue={setFieldValue}
                                        validateForm={formik.validateForm}
                                        setFieldTouched={formik.setFieldTouched}
                                        statusUser={statusUser}
                                        idTask={idTask}
                                        submitForm={submitForm}
                                        statusTask={values.statusTask}
                                    />
                                    {/* <NavLink to='/react/AddTaskDO/step1' className="btn btn-success my-2"
                                        onClick={() => {
                                            resetForm()
                                            dispatch(rebutStateAC())
                                        }}>Подать новую заявку</ NavLink>
                                    {statusUser != 'ManagerPP' && <ClarifyData idTask={idTask} />}
                                    <CloneTask
                                        setFieldValue={setFieldValue}
                                        validateForm={formik.validateForm}
                                        setFieldTouched={formik.setFieldTouched}
                                    /> */}
                                    <StatusNote
                                        statusTask={values.statusTask}
                                        idTask={values.idTask}
                                        gid={gid}
                                        idPK={idPK} />
                                    <div className='my-2'>
                                        <Route path="/react/AddTaskDO/:step?/:idtask?"
                                            render={() =>
                                                <NavTaskContainer
                                                    reguiredFields={reguiredFields}
                                                    errors={formik.errors}
                                                    touched={formik.touched}
                                                    setValues={setValues}
                                                />
                                            } />
                                        <img src={logo} className="App-logo float-right mb-2" alt="logo" />
                                    </div>
                                    <Route path="/react/AddTaskDO/step1/:idtask?"
                                        render={() => <Step1 {...propsStep1} />} />
                                    <Route path="/react/AddTaskDO/step2/:idtask?"
                                        render={() => <Step2 {...propsStep2} />} />
                                    <Route path="/react/AddTaskDO/step3/:idtask?"
                                        render={() => <Step3 {...propsStep3} />} />
                                    <Route path="/react/AddTaskDO/step4/:idtask?"
                                        render={() => <Step4 {...propsStep4} />} />
                                    <Route path="/react/AddTaskDO/step5/:idtask?"
                                        render={() => <Step5 {...propsStep5} />} />
                                    <Route path="/react/AddTaskDO/allSteps/:idtask?" render={() => <AllSteps
                                        propsStep1={propsStep1}
                                        propsStep2={propsStep2}
                                        propsStep3={propsStep3}
                                        propsStep4={propsStep4}
                                        propsStep5={propsStep5}
                                    />} />
                                    <Route path="/react/AddTaskDO/listTask/:idtask?" render={() => <ListTask />} />
                                </Form>
                            </div>
                        )
                    }
                }
            </Formik>
            <AddClientContainer setMainCP={setStateMainCP} />
            <AddServiceContainer setStateNewService={setStateNewService} />
        </>
    )
}

export default AddTaskDoStart

function TopButtonGroup(props) {
    let { resetForm, setFieldValue, validateForm, setFieldTouched, statusUser, idTask, submitForm } = props
    let dispatch = useDispatch()
    let loading = useSelector(state => state.TaskDOForm.loading)
    return (
        <>
            <div className='row my-2'>
                <div className='col-4'>
                    <NavLink to='/react/AddTaskDO/step1' className="btn btn-success w-100"
                        onClick={() => {
                            resetForm()
                            dispatch(rebutStateAC())
                        }}>Подать новую заявку</ NavLink>
                </div>
                {statusUser != 'ManagerPP' && <div className='col-4'><ClarifyData idTask={idTask} submitForm={submitForm} /></div>}
                <div className='col-4'>
                    <CloneTask
                        setFieldValue={setFieldValue}
                        validateForm={validateForm}
                        setFieldTouched={setFieldTouched}
                    />
                </div>
            </div>
            {loading && <Loading />}
            {!loading && <ReduserBtn {...props} />}

        </>
    )
}

function ReduserBtn(props) {
    let { setFieldValue, statusUser, idTask, submitForm, statusTask } = props

    if (statusUser == 'Admin') {
        if (idTask) {
            if (statusTask == null) {
                return (
                    <div className='row mb-2'>
                        <div className='col-4'>
                            <ButtonToWork setFieldValue={setFieldValue} submitForm={submitForm} />
                        </div>
                        <div className='col-4'>
                            <ButtonAdditionalApprove setFieldValue={setFieldValue} submitForm={submitForm} />
                        </div>
                        <div className='col-4'>
                            <ButtonReject setFieldValue={setFieldValue} submitForm={submitForm} />
                        </div>
                    </div>
                )
            }
        }
    }
    if (statusUser == 'ManagerCD') {
        if (idTask) {
            if (statusTask == 2) {
                return (
                    <div className='row mb-2'>
                        <div className='col-4'>
                            <ButtonToWork setFieldValue={setFieldValue} submitForm={submitForm} />
                        </div>
                        <div className='col-4'>
                            <ButtonReject setFieldValue={setFieldValue} submitForm={submitForm} />
                        </div>
                    </div>
                )
            }
        }
    }
    return <></>
}

function CloneTask(props) {
    let { setFieldValue, validateForm, setFieldTouched } = props
    const cloneTaskF = (e) => {
        setFieldValue('idTask', null)
        setFieldValue('idPK', null)
        setFieldValue('statusTask', null)
        setFieldValue('IdAuthor', null)
        setFieldValue('FileSU', [])
        setFieldValue('FilePrice', [])
        setFieldValue('fileListService', [])
        setFieldValue('FileExplanatoryNote', [])
        setFieldValue('FileApplication', [])
        setFieldValue('FileEdit', [])
        setFieldValue('FileUS', [])
        setFieldValue('FileOther', [])
        setFieldValue('fileScanContract', [])
        setFieldValue('aditionalFilesDO', [])
        setFieldTouched('FileSU')
        validateForm()
    }
    return (
        <NavLink to='/react/AddTaskDO/step1' className='btn btn-warning w-100' onClick={cloneTaskF}>Создать на основании</ NavLink>
    )
}









