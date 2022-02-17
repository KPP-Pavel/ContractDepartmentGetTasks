import Button from '@material-ui/core/Button';
import css from './style.module.scss'

export function SubmitButton({ formik }) {
    return (
        <div className={css.buttonWrapper}>
            <Button
                variant="contained"
                color="primary"
                type='sabmit'>
                Добавить
            </Button>
        </div>
    )
}