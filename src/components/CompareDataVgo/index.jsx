import css from './style.module.scss'
import { observer } from "mobx-react"
import { CompareDataVGOCreate } from "./CreateNewTask/index"
import { useParams } from "react-router-dom"
import { ListTasks } from "./ListTasks"

export const CompareDataVGOSwitch = observer(() => {
    const { gid } = useParams()
    return <div className={css.wrapperRoot}>
        {gid ?
            <ListTasks />
            : <CompareDataVGOCreate />}
    </div>
})