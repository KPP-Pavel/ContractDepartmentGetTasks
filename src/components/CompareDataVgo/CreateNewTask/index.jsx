import css from './style.module.scss'
import { useEffect, useState } from 'react';
import { useStoreMobX } from '../store/useStore';
import { observer } from "mobx-react"
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import * as CONSTANTS from '../store/constants'
import { runInAction, autorun } from 'mobx';
import { SwitcherForm } from './Pages'
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useHistory } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export const CompareDataVGOCreate = observer(() => {
    const { storeVGO } = useStoreMobX()
    const history = useHistory()
    useEffect(() => {
        storeVGO.getDataStart()
        autorun(() => storeVGO.setValidClient())
        autorun(() => storeVGO.setValidTasks())
        autorun(() => storeVGO.setValidFiles())
    }, [])
    /////////////////////////

    const handleChange = (event, newValue) => {
        runInAction(() =>
            storeVGO.menuState = newValue
        )
    };

    return <>
        <Backdrop open={storeVGO.isLoad} style={{zIndex:1}}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <div className={css.wrapperForm}>
            <div className={css.wrapperHeader}>
                <h3>Работа с замечаниями по протоколу ВГО</h3>
                <div>
                    <Button
                        variant="contained"
                        onClick={() => history.push('/react/VGO/' + storeVGO.client.client.gid)}
                    >Список задач</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!storeVGO.isValid}
                        onClick={() => storeVGO.sendData()}
                    >Направить в работу</Button>
                </div>
            </div>
            <SwitcherForm menuState={storeVGO.menuState} />

        </div>
        <div className={css.wrapperRightMenu}>
            <Paper square>
                <Tabs
                    value={storeVGO.menuState}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                >
                    {CONSTANTS.MENUSTATE.map(item =>
                        <Tab
                            key={item.id}
                            label={
                                <div style={{ display: 'flex' }}>
                                    <GetCheck idPage={item.id} />
                                    {item.title}
                                </div>}
                        />
                    )}
                </Tabs>
            </Paper>
            <h4>Новые замечания:</h4>
            <div className={css.wrapperContentRightMenu}>
                {storeVGO.menuState == 0 &&
                    <Paper elevation={3} square className={css.cardTask} >
                        <p>
                            <span className={css.subTitle}>Дней на отработку:</span> {storeVGO.client.daysAtWork}
                        </p>
                        <p><span>GID:</span> {storeVGO.client.client.gid}</p>
                        <p><span>Заказчик:</span> {storeVGO.client.client.title}</p>
                        <CloseIcon
                            onClick={() => runInAction(() => {
                                storeVGO.client.daysAtWork = 2
                                storeVGO.client.client = ''
                            })}
                            className={css.closeIcon} />
                    </Paper>
                }
                {storeVGO.menuState == 1 && storeVGO.newTasks.map((item, index) =>
                    <Paper key={index} elevation={3} square className={css.cardTask} >
                        <p>
                            <span className={css.subTitle}>Текст замечания:</span> {item.textTask}
                        </p>
                        <p><span>Менеджер:</span> {item.manager}</p>
                        <p><span>Копия</span> {item.copyManager}</p>
                        <CloseIcon
                            onClick={() => storeVGO.deleteNewTask(index)}
                            className={css.closeIcon} />
                    </Paper>
                )}
                {storeVGO.menuState == 2 && Boolean(storeVGO.fileList.length) &&
                    <Paper elevation={3}>
                        <MenuList>
                            {storeVGO.fileList.map((item, index) =>
                                <MyMenuItem
                                    key={`${index}+${item.name}`}
                                    file={item}
                                    removeFile={() => storeVGO.removeFileListByIndex(index)}
                                />)}
                        </MenuList>
                    </Paper>
                }
            </div>
        </div>
    </>
})

const GetCheck = observer(({ idPage }) => {
    const { storeVGO } = useStoreMobX()
    switch (idPage) {
        case 0:
            return storeVGO.isValidClient && <CheckCircleIcon style={{ fill: 'green' }} />
        case 1:
            return storeVGO.isValidTasks && <CheckCircleIcon style={{ fill: 'green' }} />
        case 2:
            return storeVGO.isValidFiles && <CheckCircleIcon style={{ fill: 'green' }} />
    }

})

function MyMenuItem({ file, removeFile }) {
    const [url, setUrl] = useState(null)
    useEffect(() =>
        setUrl(prev => {
            URL.revokeObjectURL(prev)
            return URL.createObjectURL(file)
        })
        , [file])

    let extantionFile = file.name.split('.')
    extantionFile = extantionFile[extantionFile.length - 1]

    const typeIcon = extantionFile == 'msg' ? 'mail' : 'clip'

    return (
        <MenuItem component='a'
            href={url}
            download
        >
            <ListItemIcon className={css.closeIconFile}>
                <CloseIcon fontSize="small"
                    onClick={(e) => {
                        e.preventDefault()
                        removeFile()
                    }}
                />
            </ListItemIcon>
            <ListItemIcon>
                {typeIcon == 'mail' ?
                    <DraftsIcon fontSize="small" /> :
                    <AttachFileIcon fontSize="small" />}

            </ListItemIcon>
            <Typography variant="inherit">{file.name}</Typography>
        </MenuItem>
    )
}