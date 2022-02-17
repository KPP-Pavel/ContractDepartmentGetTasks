import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import styles from "./listTask.module.css"
import { getListTask } from "../../../redux/reducers/reducer_taskDO";
import React from 'react';

function ListTask(props) {
    let { formRef,setTaskActualizationNumber } = props
    let [filterListTask, setFilterListTask] = React.useState({
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
    })

    //console.log(filterListTask)


    let dispatch = useDispatch()
    useEffect(() => dispatch(getListTask()), [])

    let listTasks = useSelector((state) => state.TaskDOForm.listTasks)

    let onChangeFilter = (e) => {
        var name = e.target.getAttribute('data-name')
        setFilterListTask({
            ...filterListTask,
            [name]: e.target.value
        })
    }

    let onKeyPressFilter = (e) => {

        if (e.key == 'Enter') {
            e.preventDefault()
            //console.log(filterListTask)
            dispatch(getListTask(filterListTask))
            //getListTask(filterListTask)
        }
    }

    let rowFilter = (name) => {
        return (
            <th scope="col" className='align-top'>
                <input
                    type='text'
                    className='w-100'
                    data-name={name}
                    value={filterListTask[name]}
                    onChange={onChangeFilter}
                    onKeyPress={onKeyPressFilter}
                />

            </th>
        )
    }

    let selectTask=(e)=>{
        e.preventDefault()
        setTaskActualizationNumber(e.target.textContent.trim())
    }

    let rows = listTasks.map(item => {
        let ref=<th scope="row"><NavLink to={'/react/AddTaskDO/step1/' + item.idtask}>{item.idtask}</NavLink></th>
        if(formRef==1)ref=<th scope="row"><a href='#' onClick={selectTask}>{item.idtask}</a></th>

        return (
            <tr key={item.idtask}>
                {ref}
                <td>{item.dateTask}</td>
                <td>{item.authorTask}</td>
                <td>{item.statusTask}</td>
                <td>{item.datelastiteration}</td>
                <td>{item.idpk}</td>
                <td>{item.managerDO}</td>
                <td>{item.department}</td>
                <td>{item.typeContract}</td>
                <td>{item.typedoc}</td>
                <td>{item.GID}</td>
                <td>{item.nameClient}</td>
                <td>{item.subjectTask}</td>
                <td>{item.comment}</td>
            </tr>)
    })

    return (
        <div>
            <table className={"table table-sm table-responsive " + styles.smalSize}>
                <thead>
                    <tr>
                        <th scope="col" className='align-top text-center'>ID задачи</th>
                        <th scope="col" className='align-top text-center'>Дата заявки</th>
                        <th scope="col" className='align-top text-center'>Автор заявки</th>
                        <th scope="col" className='align-top text-center'>Статус заявки</th>
                        <th scope="col" className='align-top text-center'>Дата обработки заявки<br />(в работы/отклонено)</th>
                        <th scope="col" className='align-top text-center'>id ПК</th>
                        <th scope="col" className='align-top text-center'>Ответственный ДО</th>
                        <th scope="col" className='align-top text-center'>Департамент</th>
                        <th scope="col" className='align-top text-center'>Вид договора</th>
                        <th scope="col" className='align-top text-center'>Вид документа</th>
                        <th scope="col" className='align-top text-center'>GID</th>
                        <th scope="col" className='align-top text-center'>Краткое наименование КА</th>
                        <th scope="col" className='align-top text-center'>Предмет документа</th>
                        <th scope="col" className='align-top text-center'>Комментарий ДО</th>
                    </tr>
                    <tr>
                        {rowFilter('idtask')}
                        {rowFilter('dateTask')}
                        {rowFilter('authorTask')}
                        {rowFilter('statusTask')}
                        {rowFilter('datelastiteration')}
                        {rowFilter('idpk')}
                        {rowFilter('managerDO')}
                        {rowFilter('department')}
                        {rowFilter('typeContract')}
                        {rowFilter('typedoc')}
                        {rowFilter('GID')}
                        {rowFilter('nameClient')}
                        {rowFilter('subjectTask')}
                        {rowFilter('comment')}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}
export default ListTask