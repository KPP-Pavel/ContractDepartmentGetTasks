import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import css from './style.module.scss'

export function InputFile({ idInput, onChange, value, name }) {
    return <div className={css.inputFileWrapper}>
        <FormControl fullWidth>
            <label htmlFor={idInput} className={css.labelFile}>
                <AttachFileIcon />Перетащите сюда файл...
            </label>
            <Input
                id={idInput}
                type='file'
                className={css.inputFile}
                onChange={onChange}
                value={value}
                name={name}
            />
        </FormControl>
    </div>
}