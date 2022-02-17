import css from './style.module.scss'
import Paper from '@material-ui/core/Paper';
import { observer } from 'mobx-react';
import { useStoreMobX } from '../../../store/useStore';
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'


export const ListTask = observer(() => {
    const { storeVGO } = useStoreMobX()
    const { gid, idTask } = useParams()
    const history = useHistory()
    return <>
        {storeVGO.allTasksClient.map(item =>
            <Paper
                key={item.id} elevation={3}
                className={`${css.taskItem} ${idTask == item.id ? css.active : ''}`}
                onClick={() => history.push(`/react/VGO/${gid}/${item.id}`)}
            >
                <h6>Дата: {item.date}</h6>
                {item.tasks.map(itemTask =>
                    <p key={itemTask.id}><strong>Текст замечания:</strong> {itemTask.task}</p>
                )}
            </Paper>
        )}

    </>
})