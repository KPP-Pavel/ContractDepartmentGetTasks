import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { MyAutocomplete } from '../../../Shared/Components/Autocomplete'
import { observer } from "mobx-react"
import { useStoreMobX } from '../../../store/useStore';
import { SubmitButton } from '../../Components/SubmitButton';
import { runInAction } from 'mobx';
import * as yup from 'yup'


export const FormClient = observer(() => {
    const { storeVGO } = useStoreMobX()
    const formik = useFormik({
        validationSchema: yup.object({
            daysAtWork: yup.number().required('Обязательное поле.'),
            client: yup.object().required('Обязательное поле.')
        }),
        initialValues: {
            daysAtWork: storeVGO.client.daysAtWork,
            client: storeVGO.client.client,
        },
        onSubmit: values => {
            runInAction(() => {
                storeVGO.client.client = values.client
                storeVGO.client.daysAtWork = values.daysAtWork
                storeVGO.menuState = 1
            })
        },
    })
    return (
        <form
            style={{ marginTop: '22.97px' }}
            onSubmit={formik.handleSubmit}  >
            <TextField
                fullWidth
                id="daysAtWork"
                name="daysAtWork"
                label="Рабочих дней на отработку замечания"
                value={formik.values.daysAtWork}
                onChange={formik.handleChange}
                helperText={(formik.touched.daysAtWork && formik.errors.daysAtWork) || "Будет расчитана дата завершения задачи."}
                error={formik.touched.daysAtWork && formik.errors.daysAtWork}
            />
            <MyAutocomplete
                items={storeVGO.listClients}
                value={formik.values.client}
                onChange={(v) => formik.setFieldValue('client', v)}
                label="Заказчик"
                helperText={(formik.touched.client && formik.errors.client) || "Необходимо выбрать заказчика."}
                error={formik.touched.client && formik.errors.client}
            />
            <SubmitButton formik={formik} />
        </form >
    )
})