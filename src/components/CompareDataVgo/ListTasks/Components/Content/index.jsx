import css from './style.module.scss'
import { MyAutocomplete } from '../../../Shared/Components/Autocomplete'
import { observer } from "mobx-react"
import { useEffect } from 'react'
import { useStoreMobX } from '../../../store/useStore'
import Paper from '@material-ui/core/Paper';
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'
import Button from '@material-ui/core/Button';

export const Content = observer(() => {
    const history = useHistory()
    const { gid } = useParams()
    const { storeVGO } = useStoreMobX()
    const valueAutocomplete = useMemo(() =>
        storeVGO.listClients.findIndex(item => item.gid == gid)
        , [gid, storeVGO.listClients]
    )

    useEffect(
        () => {
            storeVGO.getlistClient()
        }
        , [])
    useEffect(
        () => {
            storeVGO.getUrlSp(gid)
        }
        , [gid])

    return <>
        <div className={css.titleWrapper}>
            <h4>Описание</h4>
            <Button
                variant="contained"
                color="primary"
                onClick={() =>
                    document.location = storeVGO.urlSp
                }
            >Share Point</Button>
        </div>

        <Paper elevation={3} className={css.paper}>
            <MyAutocomplete
                key={valueAutocomplete}
                items={storeVGO.listClients}
                onChange={(v) => history.push('/react/VGO/' + v.gid)}
                defaultValue={storeVGO.listClients[valueAutocomplete]}
                label="Заказчик"
            />
        </Paper>
        <div className={css.tasksContainer}>
            {storeVGO.selectedTask.map(item =>
                <Paper key={item.id} elevation={3} className={css.paper}>
                    <h6>Дата: {item.date}</h6>
                    <p><strong>Текст замечания:</strong> {item.task}</p>
                    <p><strong>Исполнитель:</strong> {item.sendTo}</p>
                    <p><strong>Получил копию:</strong> {item.sendCopy}</p>
                </Paper>
            )}
        </div>

    </>
})