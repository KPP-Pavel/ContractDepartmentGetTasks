import { myAxios } from "../../dal/api";

const TOGGLEADDSERVICEFORM = 'TOGGLEADDSERVICEFORM';
const TOGGLESELECTCONTRACTFORM = 'TOGGLESELECTCONTRACTFORM';
const CHANGEDATA = 'CHANGEDATA';
const RULESSTEP1AC = 'RULESSTEP1AC';
const CLIENTLISTSELECTED = 'CLIENTLISTSELECTED'
const SETCLIENTS = 'SETCLIENTS'
const GETTYPESCONTRACT = 'GETTYPESCONTRACT'
const GETDEPARTMENTS = 'GETDEPARTMENTS'
const SETDATANULL = 'SETDATANULL'
const GETPERIODSACT = 'GETPERIODSACT'
const GETSERVICESLIST = 'GETSERVICESLIST'
const ADDSERVICESLISTSELECTED = 'ADDSERVICESLISTSELECTED'
const DELETESERVICESLISTSELECTEDAC = 'DELETESERVICESLISTSELECTEDAC'
const GETEOSZ = 'GETEOSZ'
const DEFAULTSUBJECT = 'DEFAULTSUBJECT'
const TOGGLEADDCLIENTFORM = 'TOGGLEADDCLIENTFORM'
const GETSY = 'GETSY'
const CHECKERRORS = 'CHECKERRORS'
const CLEARDATA = 'CLEARDATA'
const CLEARREFSY = 'CLEARREFSY'
const CHANGEDATANEWCLIENT = 'CHANGEDATANEWCLIENT'
const SAVENEWCLIENT = 'SAVENEWCLIENT'
const CHANGEDATANEWSERVICE = 'CHANGEDATANEWSERVICE'
const SAVENEWSERVICE = 'SAVENEWSERVICE'
const PURENTDOCUMENT = 'PURENTDOCUMENT'
const SETCONTRACTS = 'SETCONTRACTS'
const GETLISTTASK = 'GETLISTTASK'
const CHANGEDATAFILTER = 'CHANGEDATAFILTER'
const SETTASK = 'SETTASK'
const SETCURRENTTEASK = 'SETCURRENTTEASK'
const SETSTATUSUSER = 'SETSTATUSUSER'
const SETLISTSERVICESBYGID = 'SETLISTSERVICESBYGID'
const TOUCHEDAC = 'TOUCHEDAC'
const SENDDATA = 'SENDDATA'
const SETSTATUSTASK = 'SETSTATUSTASK'
const RESETERRORS = 'RESETERRORS'
const SETUSERSLIST = 'SETUSERSLIST'
const CLONETASK = 'CLONETASK'
const CHECKVALUESERROR = 'CHECKVALUESERROR'
const SETLOADING = 'SETLOADING'
const SETREDIRECT = 'SETREDIRECT'
const REBUTSTATE = 'REBUTSTATE'
const MANAGERDO = 'MANAGERDO'
const LISTTEMPLATEDOC = 'LISTTEMPLATEDOC'
const RIGHTS = 'RIGHTS'
const CLARIFY = 'CLARIFY'

export function bllSendClarify(text,idTask){
        return myAxios({ sendClarify: 'sendClarify', text, idTask })
}

export function getRights() {
    //debugger
    return dispatch=>{
        myAxios({ getRights: 'getRights' }).then(data => {
            //debugger
            //console.log(data)
            dispatch({
                type: RIGHTS,
                data: data
            })
        })
    }
}
export function getListTemplateDoc() {
    return dispatch=>{
        myAxios({ getListTemplateDoc: 'getListTemplateDoc' }).then(data => {
            //console.log(data)
            dispatch({
                type: LISTTEMPLATEDOC,
                data: data
            })
        })
    }
}
export function getManagerDO(gid) {
    return dispatch => {
        myAxios({ getManagerDO: 'getManagerDO',gid }).then(data => {
            //console.log(data)
            dispatch({
                type: MANAGERDO,
                data: data
            })
        })
    }
}


export function cloneTask() {
    //debugger
    return (dispatch, getState) => {
        //debugger
        dispatch(cloneTaskAC());
        dispatch(checkValuesError(getState));
    }
}
export function cloneTaskAC(params) {
    //debugger
    return {
        type: CLONETASK
    }
}
export function checkValuesError(getState) {
    //debugger
    var errState = { ...getState().TaskDOForm.errors };
    var tmpTaskDOState = getState().TaskDOForm.temporaryTaskDO;
    var err = true;
    errState.allInputs.forEach(val => {
        err = tmpTaskDOState[val] ? false : true;
        errState[val].error = err
    })

    if (!tmpTaskDOState['FileSU'][0]) errState['FileSU'].error = false;
    if (!tmpTaskDOState['FilePrice'][0]) errState['FilePrice'].error = false;
    if (!tmpTaskDOState['MainCP'][0].id) errState['MainCP'].error = false;

    return {
        type: CHECKVALUESERROR,
        data: errState
    }
}
export function rebutStateAC(params) {
    return {
        type: REBUTSTATE
    }
}
export function setloadingAC(params) {
    //debugger
    return {
        type: SETLOADING,
        data: params
    }
}
export function resetErrorsAC(params) {
    //debugger
    return {
        type: RESETERRORS
    }
}
export function touchedAC(params) {
    //debugger
    return {
        type: TOUCHEDAC,
        name: params
    }
}
export function setListservicesByGid(params) {
    return {
        type: SETLISTSERVICESBYGID,
        data: params
    }
}
export function setStatusUser(params) {
    return {
        type: SETSTATUSUSER,
        data: params
    }
}
export function ChangeDataFilterAC(params) {
    return {
        type: CHANGEDATAFILTER,
        data: params
    }
}
export function setPurentDocumentAC(params) {
    return {
        type: PURENTDOCUMENT,
        data: params
    }
}
export function changeDataNewServiceAC(params) {
    return {
        type: CHANGEDATANEWSERVICE,
        name: params.name,
        data: params.data
    }
}
export function changeDataNewClientAC(params) {
    return {
        type: CHANGEDATANEWCLIENT,
        name: params.name,
        data: params.data
    }
}
export function clearRefSYAC(params) {
    return {
        type: CLEARREFSY
    }
}
export function checkErrorsAC(params) {
    return {
        type: CHECKERRORS
    }
}
export function defaultSubjectAC(params) {
    return {
        type: DEFAULTSUBJECT
    }
}
export function deleteServicesListSelectedAC(params) {
    return {
        type: DELETESERVICESLISTSELECTEDAC,
        id: params.id
    }
}
export function addServicesListSelectedAC(params) {
    return {
        type: ADDSERVICESLISTSELECTED,
        data: {
            id: params.id,
            name: params.name
        }
    }
}
export function toggleAddServiceFormAC(params) {
    return {
        type: TOGGLEADDSERVICEFORM
    }
}
export function toggleAddClientFormAC(params) {
    return {
        type: TOGGLEADDCLIENTFORM
    }
}
export function toggleSelectContractFormAC(params) {
    return {
        type: TOGGLESELECTCONTRACTFORM,
        data: params
    }
}
export function changeDataAC(params) {
    //debugger;
    return {
        type: CHANGEDATA,
        name: params.name,
        data: params.data
    }
}
export function clearDataAC(params) {
    return {
        type: CLEARDATA,
        name: params.name
    }
}
export function rulesStep1AC(params) {
    return { type: RULESSTEP1AC }
}
function setDataNullAC(d) {
    return {
        type: SETDATANULL,
        data: d
    }
}
export function getuserslist() {
    //debugger
    return dispatch =>
        myAxios({ getuserslist: 'getuserslist' }).then(data => {
            //console.log(data)
            dispatch({
                type: SETUSERSLIST,
                data: data
            })
        }
        )
}
function setCurrentTeask(params) {
    return {
        type: SETCURRENTTEASK,
        data: params
    }
}
export function setSelectedClientDataAC(params) {

    return {
        type: CLIENTLISTSELECTED,
        data: {
            id: params.id
        }
    }
}
function getDepartmentsAC(d) {
    return { type: GETDEPARTMENTS, data: d }
}
export function sendData(values) {
    //debugger
    return (dispatch, getState) => {
        //debugger;

        let formData = new FormData();

        function addFiles(name) {
            for (var key in values[name][0]) {
                formData.append(`${name}[]`, values[name][0][key]);
            }
        }
        //formData.append('FileSU',newStateT.FileSU)
        addFiles('FileSU');
        addFiles('FilePrice');
        addFiles('fileListService');
        addFiles('FileExplanatoryNote');
        addFiles('FileApplication');
        addFiles('FileEdit');
        addFiles('FileUS');
        addFiles('FileOther');
        addFiles('fileScanContract');
        addFiles('aditionalFilesDO');

        var data = JSON.stringify(values);
        formData.append('senddata', 'senddata');
        formData.append('data', data);

        //debugger
        return myAxios(formData)/* .then(data => {
            {
                //debugger
                dispatch(sendDataAC(data))
            }
        }) */

    }
}
export function sendDataAC(data) {
    //debugger;
    return {
        type: SENDDATA,
        data: data
    }
}
export function saveNewClient(state) {
    //debugger
    var jsonState = JSON.stringify(state)
    return dispatch => {
        dispatch(setloadingAC(true));
        myAxios({ newClient: jsonState }).then(data => {
            //debugger
            dispatch(setloadingAC(false));
            dispatch(toggleAddClientFormAC());
        })
    }
}
export function saveNewService(state) {
    //debugger
    var jsonState = JSON.stringify(state)
    return dispatch => {
        dispatch(setloadingAC(true))
        myAxios({ newService: jsonState }).then(data => {
            //debugger
            dispatch(setloadingAC(false))
            dispatch(toggleAddServiceFormAC())
        })
    }
}
export function getListservicesByGid(gid,typeService) {
    //debugger;
    return (dispatch) => {
        myAxios({ getListservicesByGid: 'getListservicesByGid', gid, typeService }).then(data => {
            //debugger;
            dispatch(setListservicesByGid(data))
        })
    }
}

export function sendDat(values) {
    //debugger;
    return (dispatch, getState) => {
        dispatch(setloadingAC(true))
        dispatch(sendData(values)).then((data) => {
            //debugger
            //console.log(JSON.parse(data))
            //console.log(data)
            dispatch(setloadingAC(false))
            dispatch(setRedirectAC('/react/AddTaskDO/step1/' + data))
            dispatch(setRedirectAC(null))
        })
        
    }
}

function setRedirectAC(params) {
    return {
        type: SETREDIRECT,
        data: params
    }
}

export function getStatusUser() {
    //debugger;
    return dispatch => {
        myAxios({ getStatusUser: 'getStatusUser' }).then(data => {
            if (!data) window.location.href = "http://webdo.gk.rosatom.local/Authorization.php"
            dispatch(setStatusUser(data))
        }
        )
    }
}
export function getuserdata() {
    //debugger;
    return dispatch => {
        myAxios({ getuserdata: 'getuserdata' }).then(data =>
            //console.log(data)
            dispatch({
                type: SETTASK,
                data: data
            })
        )
    }
}
export function getTask(idTask = null) {
    //debugger;
    return (dispatch, getState) => {
        dispatch(setCurrentTeask(idTask));
        myAxios({ getTask: 'getTask', idTask }).then(data => {
            //debugger
            dispatch({
                type: SETTASK,
                data: data
            })
        }).then(() => dispatch(checkValuesError(getState)))
    }
}
export function getEOSZ() {
    return dispatch =>
        myAxios({ getEOSZ: 'getEOSZ' }).then(data =>
            dispatch({
                type: GETEOSZ,
                data: data
            })
        )
}
export function getListTask(filter = null) {
    //debugger
    return (dispatch, getState) => {
        //debugger
        //var filter = getState().TaskDOForm.filterListTask;
        myAxios({ getListTask: 'getListTask', filter }).then(data => {
            //console.log(data);
            dispatch({
                type: GETLISTTASK,
                data: data
            })
        }
        )
    }
}
function setStatus(params) {
    return {
        type: SETSTATUSTASK,
        data: params
    }
}

export function getContracts(GID, idTypeContract) {
    //debugger;
    return dispatch =>
        myAxios({ getContracts: 'getContracts', GID: GID, idTypeContract: idTypeContract }).then(data =>
            dispatch({
                type: SETCONTRACTS,
                data: data
            })
        )
}
export function getSY(n) {
    return dispatch =>
        myAxios({ getSY: n }).then(data =>
            dispatch({
                type: GETSY,
                data: data
            })
        )
}
export function getPeriodsAct() {
    return dispatch =>
        myAxios({ getPeriodsAct: 'getPeriodsAct' }).then(data =>
            dispatch({
                type: GETPERIODSACT,
                data: data
            })
        )
}
export function getServices(name = null) {
    return (dispatch, getState) => {
        //debugger
        myAxios({ getServices: 'getServices', name }).then(data => {
            //console.log(data)
            dispatch({
                type: GETSERVICESLIST,
                data: data
            })
        })
    }
}
export function getClients(gid = null, name = null) {
    return dispatch =>
        myAxios({ getClients: 'getClients', gid: gid, name: name }).then(data => {
            //console.log(data)
            dispatch({
                type: SETCLIENTS,
                data: data
            })
        }
        )
}
export function getTypesContract(data) {
    return dispatch =>
        myAxios({ gettypesContract: 'gettypesContract', data: data }).then(data => {
            //console.log(data)
            //debugger
            dispatch({
                type: GETTYPESCONTRACT,
                data: data
            })
        }
        )
}
export function getDepartments(filter, markSetNull = false) {
    return dispatch => {
        if (markSetNull) dispatch(setDataNullAC('Dep'))
        myAxios({ getdepartments: 'getdepartments', filter }).then(data =>
            dispatch(getDepartmentsAC(data))
        )
    }
}

function objError(params) {
    return {
        step: params,
        touched: false,
        error: true
    }
}

let initialState = {
    listUsersPP: [],
    listTemplateDoc: [],
    rights: true,
    statusUser: '',
    managerDO: '',
    addClient: {
        inn: '',
        gid: '',
        name: '',
        contects: ''
    },
    addService: {
        department: '',
        groupService: '',
        manager: '',
        codeService: '',
        nameService: '',
        typeService: '',
        nomenclatureGroup: '',
        measurement: ''
    },
    contracts: [{
        id: '123',
        numberContract: '1234',
        dateContract: '1235',
        subject: '1236'
    },
    {
        id: '',
        numberContract: '',
        dateContract: '',
        subject: ''
    }],
    listServicesByGid: [{
        id: '',
        idDocument: '',
        codeService: '',
        numDoc: '',
        statusDoc: '',
        dateBegeen: '',
        dateEnd: ''
    }],
    filterListTask: {
        idtask: '',
        dateTask: '',
        authorTask: '',
        statusTask: '',
        datelastiteration: '',
        idpk: '',
        managerDO: '',
        department: '',
        typeContract: '',
        typedoc: '',
        GID: '',
        nameClient: '',
        subjectTask: '',
        comment: ''
    },
    listTasks: [
        {
            idtask: '',
            dateTask: '',
            authorTask: '',
            statusTask: '',
            datelastiteration: '',
            idpk: '',
            managerDO: '',
            department: '',
            typedoc: '',
            GID: '',
            nameClient: '',
            subjectTask: '',
            comment: ''
        }
    ],
    departmentsList: [],
    typeContractsList: [],
    clientsList: [],
    ClientListSelected: [],
    servicesList: [],
    servicesListSelected: [],
    EOSZList: [],
    periodsActList: [],
    templateFiles: {},
    toggleForms: {
        addClientForm: false,
        addServiceForm: false,
        selectContractForm: false
    },
    refSY: [{
        ref: null,
        name: null
    }],
    errors:
    {
        totalError: false,
        allInputs: [
            'TypeDoc',
            'TypeService',
            'Dep',
            'MainCP',
            'PerActService',
            'DateStart',
            'DateEnd',
            'SubjectContract',
            'FileSU',
            'FilePrice'
        ],
        ID: objError(0),
        IdAuthor: objError(0),
        DateTask: objError(0),
        TypeTask: objError(0),
        OneOrVileTasks: objError(1),
        NumberParentTask: objError(0),
        TypeDoc: objError(1),
        num_doc_parent: objError(0),
        TemplateDoc: objError(1),
        Dep: objError(1),
        TypeService: objError(1),
        MainCP: objError(2),
        BranchCP: objError(0),
        TypePerActService: objError(0),
        PerActService: objError(3),
        DateStart: objError(3),
        DateEnd: objError(3),
        DateText: objError(3),
        Services: objError(3),
        EOSZ: objError(3),
        SubjectContract: objError(3),
        ContactManagerGA: objError(4),
        AdditionalConditional: objError(3),
        ContactsCp: objError(4),
        FileSU: objError(5),
        FilePrice: objError(5),
        FileEdit: objError(5),
        FileApplication: objError(5),
        FileUS: objError(5),
        FileOther: objError(5),
        CommentCD: objError(3),
        signerClient: objError(4),
        systemsClient: objError(4),
        Active: objError(0),
        boxServiceBool: objError(4),
        coExecutorBool: objError(4),
        worcClientAreaBool: objError(4),
        TransferAreaBool: objError(4),
        TransferToolsBool: objError(4)
    },
    currentTeask: '',
    loading: false,
    redirect: null,
    temporaryTaskDO: null
};

function TaskDOReducer(state = initialState, action) {

    switch (action.type) {
        case RIGHTS:
            return {
                ...state,
                rights: action.data
            }
        case LISTTEMPLATEDOC:
            return {
                ...state,
                listTemplateDoc: action.data
            }
        case MANAGERDO:
            return {
                ...state,
                managerDO: action.data
            }
        case REBUTSTATE:
            return {...state,
                temporaryTaskDO: null
            };
        case SETREDIRECT:
            //debugger
            //console.log(action.data);
            return {
                ...state,
                redirect: action.data
            }
        case CHECKVALUESERROR:
            //debugger
            var newState = {
                ...state,
                errors: {
                    ...action.data,
                    totalError: false
                }

            };
            newState.errors.allInputs.forEach(val => {
                var err = newState.temporaryTaskDO[val] ? false : true;
                /* var val2=newState.temporaryTaskDO[val];
                debugger */
                newState.errors[val].error = err
                //console.log(val)
            })

            return newState;
        case CLONETASK:
            //debugger
            return {
                ...state,
                temporaryTaskDO: {
                    ...state.temporaryTaskDO,
                    ID: '',
                    statusTask: '',
                    FileSU: '',
                    FilePrice: '',
                    FileExplanatoryNote: '',
                    FileEdit: '',
                    FileApplication: '',
                    FileUS: '',
                    FileOther: '',
                    aditionalFilesDO: ''
                }
            }
        case SETLOADING:
            return {
                ...state,
                loading: action.data
            }
        case SETUSERSLIST:
            return {
                ...state,
                listUsersPP: [
                    ...action.data
                ]
            }
        case RESETERRORS:
            //debugger
            var newObj = {}
            Object.keys(state.errors).forEach(item => {
                if (item != 'allInputs') {
                    newObj[item] = {
                        ...state.errors[item],
                        touched: false,
                        error: true
                    }
                }
            })
            return {
                ...state,
                errors: {
                    ...state.errors,
                    totalError: false,
                    ...newObj
                }
            }
        case SETSTATUSTASK:
            return {
                ...state,
                temporaryTaskDO: {
                    ...state.temporaryTaskDO,
                    statusTask: action.data
                }
            }
        case SENDDATA:
            //debugger
            //console.log(action.data);
            //var data=JSON.parse(action.data);
            var data = action.data;
            return {
                ...state,
                temporaryTaskDO: null
            }
        case TOUCHEDAC:
            //debugger;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.name]: {
                        ...state.errors[action.name],
                        touched: true
                    }
                }
            }
        case SETLISTSERVICESBYGID:
            //debugger
            return {
                ...state,
                listServicesByGid: [...action.data]
            }
        case SETSTATUSUSER:
            return {
                ...state,
                statusUser: action.data
            }
        case SETCURRENTTEASK:
            return {
                ...state,
                currentTeask: action.data
            }
        case SETTASK:
            //debugger
            //var newData = { ...action.data } 
            //console.log(JSON.parse(action.data.Services));

            /* for (var key in newData) {
                try {
                    console.log(key);
                    newData[key] = JSON.parse(newData[key]);
                } catch { }
            } */
            //console.log(newData);
            var data=action.data?{ ...action.data }:null;
            return {
                ...state,
                temporaryTaskDO: data
            }
        case CHANGEDATAFILTER: {
            return {
                ...state,
                filterListTask: {
                    ...state.filterListTask,
                    [action.data.name]: action.data.data
                }
            }
        }
        case GETLISTTASK:
            //debugger
            return {
                ...state,
                listTasks: [...action.data]
            }
        case SETCONTRACTS:
            return {
                ...state,
                contracts: [...action.data]
            }
        case PURENTDOCUMENT:
            return {
                ...state,
                temporaryTaskDO: {
                    ...state.temporaryTaskDO,
                    num_doc_parent: {
                        id: action.data.id,
                        number: action.data.number
                    }
                }
            }
        case SAVENEWSERVICE:
            //debugger;
            return {
                ...state,
                temporaryTaskDO: {
                    ...state.temporaryTaskDO,
                    Services: [{
                        id: 0,
                        name: action.data.codeService
                    }, ...state.temporaryTaskDO.Services]
                },
                errors: {
                    ...state.errors,
                    Services: false
                }
            };
        case SAVENEWCLIENT:
            return {
                ...state,
                addClient: { ...action.data },
                temporaryTaskDO: {
                    ...state.temporaryTaskDO,
                    MainCP: [{
                        id: action.data.gid,
                        name: action.data.name
                    }]
                },
            };
        case CHECKERRORS:
            //debugger;
            var newState = {
                ...state,
                errors: { ...state.errors }
            }
            var totalError = false;
            let checkArr = [...state.errors.allInputs]
            checkArr.forEach(item => {
                if (!state.temporaryTaskDO[item]) {
                    newState.errors[item] = {
                        ...newState.errors[item],
                        error: true,
                        touched: true
                    }
                    totalError = true
                }
            })
            //debugger;
            if (state.errors.DateStart.error || state.errors.DateEnd.error || state.errors.DateText.error) {
                if ((state.errors.DateStart.error || state.errors.DateEnd.error) && state.errors.DateText.error) {
                    totalError = true
                }
            }

            newState.errors.totalError = totalError;
            /* if(!state.temporaryTaskDO.TypeDoc)console.log('hello')
            console.log(state.temporaryTaskDO) */
            return newState;
        case GETSY:
            return {
                ...state,
                refSY: { ...action.data }
            };
        case CHANGEDATANEWSERVICE:
            return {
                ...state,
                addService: {
                    ...state.addService,
                    [action.name]: action.data
                }
            };
        case CHANGEDATANEWCLIENT:
            return {
                ...state,
                addClient: {
                    ...state.addClient,
                    [action.name]: action.data
                }
            };
        case CLEARREFSY:
            return {
                ...state,
                refSY: [{
                    ref: null,
                    name: null
                }]
            };
        case DEFAULTSUBJECT:
            var newSubject = '';
            state.temporaryTaskDO.Services.forEach(item => newSubject += newSubject ? ", " + item.name : item.name)
            var errMark = newSubject ? false : true;
            return {
                ...state,
                temporaryTaskDO: {
                    ...state.temporaryTaskDO,
                    SubjectContract: newSubject
                },
                errors: {
                    ...state.errors,
                    SubjectContract: {
                        ...state.errors.SubjectContract,
                        error: errMark
                    }

                }
            };
        case DELETESERVICESLISTSELECTEDAC:
            var newState = {
                ...state,
                temporaryTaskDO: {
                    ...state.temporaryTaskDO,
                    Services: [...state.temporaryTaskDO.Services]
                }
            }
            var delid = newState.temporaryTaskDO.Services.findIndex(item => item.id == action.id)
            newState.temporaryTaskDO.Services.splice(delid, 1);
            return newState
        case ADDSERVICESLISTSELECTED:
            var elem = state.servicesList.find(item => item.id == action.data.id)
            return {
                ...state,
                temporaryTaskDO: {
                    ...state.temporaryTaskDO,
                    Services: [{ ...elem }, ...state.temporaryTaskDO.Services]
                },
                errors: {
                    ...state.errors,
                    Services: false
                }
            };
        case GETEOSZ:
            return {
                ...state,
                EOSZList: [...action.data]
            };
        case GETSERVICESLIST:
            return {
                ...state,
                servicesList: [...action.data]
            };
        case GETPERIODSACT:
            return {
                ...state,
                periodsActList: [...action.data]
            };
        case SETCLIENTS:
            return {
                ...state,
                clientsList: [...action.data]
            };
        case SETDATANULL:
            return {
                ...state,
                temporaryTaskDO: {
                    ...state.temporaryTaskDO,
                    Dep: ''
                }
            };
        case GETDEPARTMENTS:
            return {
                ...state,
                departmentsList: [...action.data]
            };
        case GETTYPESCONTRACT:
            return {
                ...state,
                typeContractsList: [...action.data]
            };
        case CLIENTLISTSELECTED:
            //debugger;
            var elem = state.clientsList.find(item => item.id == action.data.id)
            return {
                ...state,
                temporaryTaskDO: {
                    ...state.temporaryTaskDO,
                    MainCP: [{ ...elem }]
                }

            };
        case RULESSTEP1AC:
            var OneOrVileTasks = state.temporaryTaskDO.TypeDoc == 2 ? 'one' : state.temporaryTaskDO.OneOrVileTasks;
            if (state.temporaryTaskDO.OneOrVileTasks == OneOrVileTasks) return state;

            return {
                ...state,
                temporaryTaskDO: {
                    ...state.temporaryTaskDO,
                    OneOrVileTasks: OneOrVileTasks
                }
            };
        case CHANGEDATA:
            //debugger;
            var errMark = action.data[0] ? false : true;
            return {
                ...state,
                temporaryTaskDO: {
                    ...state.temporaryTaskDO,
                    [action.name]: action.data
                },
                errors: {
                    ...state.errors,
                    [action.name]: {
                        ...state.errors[action.name],
                        error: errMark
                    }

                }
            };
        case CLEARDATA:
            //debugger;
            var errMark = false;
            return {
                ...state,
                temporaryTaskDO: {
                    ...state.temporaryTaskDO,
                    [action.name]: ''
                },
                errors: {
                    ...state.errors,
                    [action.name]: {
                        ...state.errors[action.name],
                        error: errMark
                    }

                }
            };
        case TOGGLEADDSERVICEFORM:
            //debugger;
            return {
                ...state,
                toggleForms: {
                    ...state.toggleForms,
                    addServiceForm: !state.toggleForms.addServiceForm
                }
            };
        case TOGGLEADDCLIENTFORM:
            //debugger;
            return {
                ...state,
                toggleForms: {
                    ...state.toggleForms,
                    addClientForm: !state.toggleForms.addClientForm
                }
            };
        case TOGGLESELECTCONTRACTFORM:
            //debugger;
            return {
                ...state,
                toggleForms: {
                    ...state.toggleForms,
                    selectContractForm: action.data
                }
            };
        default:
            return state;
    }
}
export default TaskDOReducer;