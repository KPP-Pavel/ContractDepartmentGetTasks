import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getManagerDO} from '../../../redux/reducers/reducer_taskDO'

function StatusNote(props) {
    let {statusTask,idTask,gid,idPK}=props
    let dispatch=useDispatch()
    let managerDO=useSelector(state=>state.TaskDOForm.managerDO)

    React.useEffect(()=>dispatch(getManagerDO(gid)),[gid])

    var classB = '';
    var note = '';
    switch (statusTask) {
        case 1:
            classB = 'alert alert-success';
            note = `Задача №${idTask}${idPK?', id ПК '+idPK:''} принята${managerDO?', специалист ДО '+managerDO:''}`;
            break;
        case 2:
            classB = 'alert alert-warning';
            note = `Задача №${idTask}${idPK?', id ПК '+idPK:''} на рассмотрении${managerDO?' у специалиста ДО '+managerDO:''}`;
            break;
        case 3:
            classB = 'alert alert-danger';
            note = `Задача №${idTask}${idPK?', id ПК '+idPK:''} отклонена${managerDO?', специалист ДО '+managerDO:''}`;
            break;
        default:
            classB = 'alert alert-primary';
            note = `Новая задача${idTask?' №'+idTask:''}${idPK?', id ПК '+idPK:''}${managerDO?' специалист ДО '+managerDO:''}`;
    }
    return (
        <div className={classB} role="alert">
            {note}
        </div>
    )
}
export default StatusNote