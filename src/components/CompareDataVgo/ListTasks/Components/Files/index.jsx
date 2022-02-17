import css from './style.module.scss'
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { observer } from 'mobx-react';
import { useStoreMobX } from '../../../store/useStore';

export const Files = observer(() => {
    const { storeVGO } = useStoreMobX()

    return <>
        <Paper elevation={3}>
            <MenuList>
                {storeVGO.selectedFiles.map(item => {
                    let extantionFile = item.name.split('.')
                    extantionFile = extantionFile[extantionFile.length - 1]

                    return <MenuItem key={item.id} component='a'
                        href={item.url}
                        download
                    >
                        <ListItemIcon>
                            {extantionFile == 'msg' ?
                                <DraftsIcon fontSize="small" /> :
                                <AttachFileIcon fontSize="small" />}

                        </ListItemIcon>
                        <Typography variant="inherit">{item.name}</Typography>
                    </MenuItem>
                })}
            </MenuList>
        </Paper>
    </>
})