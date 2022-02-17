import css from './style.module.scss'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
import { useMemo } from 'react';
import debounce from "debounce";

export function MySelect({ value, onChange, items }) {
    const [closeMenu, setCloseMenu] = useState(false)
    const [find, setFind] = useState('')
    const needClose = useMemo(() => { return { value: false } }, [])

    const findHandler = debounce((val) => console.log(val), 500);

    return <FormControl fullWidth>
        <InputLabel id="clientLabel">Заказчик</InputLabel>
        <Select
            onFocus={(e) => {
                !needClose.value ? setCloseMenu(true) : needClose.value = false
            }}
            onClick={() => setCloseMenu(true)}
            labelId="clientLabel"
            id="client"
            name='client'
            value={value}
            onChange={(e) => {
                if (e.target.value == 'inputSearch') return
                onChange(e)
            }}
            onClose={(e) => {
                if (e.target.tagName != 'INPUT') {
                    setCloseMenu(false)
                    needClose.value = true
                    e.stopPropagation()
                }
            }}
            open={closeMenu}
        >
            <MenuItem value='inputSearch'            >
                <TextField
                    className={css.findInput}
                    fullWidth
                    onChange={(e) => findHandler(e.target.value)}
                    onKeyPress={(e) => e.stopPropagation()}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </MenuItem>
            {items.map(item =>
                <MenuItem key={item.id} value={item.id}>{item.value}</MenuItem>
            )}
        </Select>
        <FormHelperText>Some important helper text</FormHelperText>
    </FormControl >
}