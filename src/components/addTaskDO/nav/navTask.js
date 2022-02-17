import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import React from 'react';
import { getTask } from '../../../redux/reducers/reducer_taskDO'


function NavBar(props) {
    //debugger;
    let { errors, touched, setValues } = props
    let idtask = props.match.params.idtask
    let serverValues = useSelector(state => state.TaskDOForm.temporaryTaskDO)
    let dispatch = useDispatch()

    //console.log('serverValues',serverValues)

    React.useEffect(() => {
        if (idtask) {
            dispatch(getTask(idtask))
        }
    }, [idtask])
    React.useEffect(() => {
        if (serverValues) {
            //debugger
            setValues(serverValues)
        }
    }, [serverValues])

    var Myerror = {};

    if (errors.Dep && touched.Dep) Myerror.step1 = true
    if (errors.TypeDoc && touched.TypeDoc) Myerror.step1 = true
    if (errors.TypeService && touched.TypeService) Myerror.step1 = true

    if (errors.MainCP && touched.MainCP) Myerror.step2 = true

    if (errors.PerActService && touched.PerActService) Myerror.step3 = true
    if (errors.SubjectContract && touched.SubjectContract) Myerror.step3 = true
    if (errors.selectedServices && touched.selectedServices) Myerror.step3 = true
    if (errors.FileSU && touched.FileSU) Myerror.step5 = true

    let idTask = props.match.params.idtask ? `/${props.match.params.idtask}` : '';
    return (
        <div className="btn-group" role="group" aria-label="Basic example">
            <NavLink to={`/react/AddTaskDO/step1${idTask}`} className={Myerror.step1 ? 'btn btn-danger' : 'btn btn-primary'}>Шаг 1</NavLink>
            <NavLink to={`/react/AddTaskDO/step2${idTask}`} className={Myerror.step2 ? 'btn btn-danger' : 'btn btn-primary'}>Шаг 2</NavLink>
            <NavLink to={`/react/AddTaskDO/step3${idTask}`} className={Myerror.step3 ? 'btn btn-danger' : 'btn btn-primary'}>Шаг 3</NavLink>
            <NavLink to={`/react/AddTaskDO/step4${idTask}`} className={Myerror.step4 ? 'btn btn-danger' : 'btn btn-primary'}>Шаг 4</NavLink>
            <NavLink to={`/react/AddTaskDO/step5${idTask}`} className={Myerror.step5 ? 'btn btn-danger' : 'btn btn-primary'}>Шаг 5</NavLink>
            <NavLink to={`/react/AddTaskDO/allSteps${idTask}`} className="btn btn-primary">Все шаги</NavLink>
            <NavLink to={`/react/AddTaskDO/listTask${idTask}`} className="btn btn-primary">Список задач</NavLink>
        </div>
    )
}

export default NavBar;