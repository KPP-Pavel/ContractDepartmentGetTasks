import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


export function MyAutocomplete({ items, value, onChange, label, helperText, error, ...rest }) {
    const defaultProps = {
        options: items,
        getOptionLabel: (option) => option.title ? option.title : '',
    };

    return <Autocomplete
        {...defaultProps}
        {...rest}
        size="small"
        id="debug"
        value={value}
        onChange={(e, v, r) => onChange(v ? v : '')}
        renderInput={(params) => <TextField {...params} label={label} margin="normal" helperText={helperText} error={error} />}
    />
}


