import css from './style.module.scss'
import { Content } from './Components/Content';
import { Files } from './Components/Files';
import { ListTask } from './Components/LiskTask';
import { useParams} from 'react-router-dom'
import { useEffect } from 'react'
import { useStoreMobX } from '../store/useStore'

export function ListTasks() {
    const { gid, idTask } = useParams()
    const { storeVGO } = useStoreMobX()
    useEffect(
        () => {
            storeVGO.getSelectedTask(gid, idTask ? idTask : 0)
            storeVGO.getFilesTask(gid, idTask ? idTask : 0)
            storeVGO.getAllTasksClient(gid)
        }
        , [gid, idTask])

    return <div className={css.wrapperListTask}>
        <div className={css.leftPanel}>
            <div className={css.wrapperShare}>
                <h4>Прикрепленные файлы</h4>
                <Files />
            </div>
        </div>
        <div className={css.content}>
            <div className={css.wrapperShare}>
                <Content />
            </div>
        </div>
        <div className={css.raghtPanel}>
            <div className={css.wrapperShare}>
                <h4>Список задач</h4>
                <ListTask />
            </div>
        </div>
    </div>
}