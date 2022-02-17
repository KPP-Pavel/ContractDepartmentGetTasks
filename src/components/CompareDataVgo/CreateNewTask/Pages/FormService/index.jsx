import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { MyAutocomplete } from '../../../Shared/Components/Autocomplete'
import { observer } from "mobx-react"
import { useStoreMobX } from '../../../store/useStore';
import { useEffect, useMemo } from 'react';
import { SubmitButton } from '../../Components/SubmitButton';
import { runInAction } from 'mobx';
import * as yup from 'yup'
import { debounce } from "debounce"

export const FormService = observer(() => {
    const { storeVGO } = useStoreMobX()
    const setFieldError = useMemo(() => debounce((fieldName) => formik.setFieldError('TextTask', ''), 200))
    useEffect(() => () =>
        runInAction(() => {
            storeVGO.manager.mailManager = []
            storeVGO.manager.copyMailManager = []
        })
        , [])
    useEffect(
        () => {
            if (storeVGO.manager.mailManager.length) {
                formik.setFieldValue('manager', storeVGO.manager.mailManager.join(';'), false)
                formik.setFieldError('manager', '')
            }
        }
        , [storeVGO.manager.mailManager])

    useEffect(
        () => {
            if (storeVGO.manager.copyMailManager.length) {
                formik.setFieldValue('copyManager', storeVGO.manager.copyMailManager.join(';'), false)
            }
        }
        , [storeVGO.manager.copyMailManager])

    const formik = useFormik({
        initialValues: {
            MVP: '',
            serviceCode: '',
            TextTask: '',
            manager: '',
            copyManager: ''
        },
        validationSchema: yup.object({
            MVP: yup.object().required('Обязательное поле.'),
            serviceCode: yup.object().required('Обязательное поле.'),
            TextTask: yup.string().required('Обязательное поле.'),
            manager: yup.string().required('Обязательное поле.'),
        }),
        onSubmit: values => {
            const MVP = values.MVP

            storeVGO.addNewTask({
                textTask: values.TextTask,
                manager: values.manager,
                copyManager: values.copyManager
            })
            formik.resetForm()
            runInAction(() =>
                storeVGO.manager = {
                    mailManager: [],
                    copyMailManager: []
                })

            formik.setFieldValue('MVP', MVP, false)
        },
    })
    const setTextTask = (MVP, service) => {
        const result = MVP.title && service.title ?
            `${MVP.title}: ${service.title}` :
            ''
        storeVGO.getManager(MVP.id, service.id)
        formik.setFieldValue('TextTask', result, false)
        if (result) setFieldError('TextTask')
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <MyAutocomplete
                items={storeVGO.listMPV}
                value={formik.values.MVP}
                onChange={(v) => {
                    formik.setFieldValue('MVP', v, true)
                    storeVGO.getListServices(v.id)
                    setTextTask(v, formik.values.serviceCode)
                }}
                label="МВП"
                helperText={(formik.touched.MVP && formik.errors.MVP) || "МВП гринатом"}
                error={Boolean(formik.touched.MVP) && Boolean(formik.errors.MVP)}
            />
            <MyAutocomplete
                items={storeVGO.listServices}
                value={formik.values.serviceCode}
                onChange={(v) => {
                    formik.setFieldValue('serviceCode', v, true)
                    setTextTask(formik.values.MVP, v)
                }}
                label="Услуга"
                helperText={(formik.touched.serviceCode && formik.errors.serviceCode) || "Код услуги"}
                error={Boolean(formik.touched.serviceCode) && Boolean(formik.errors.serviceCode)}
            />
            <TextField
                fullWidth
                id="TextTask"
                name="TextTask"
                label="Текст замечания"
                value={formik.values.TextTask}
                onChange={formik.handleChange}
                multiline
                helperText={(formik.touched.TextTask && formik.errors.TextTask) || "Заполняется автоматически, но можно править руками."}
                error={Boolean(formik.touched.TextTask) && Boolean(formik.errors.TextTask)}
            />
            <TextField
                fullWidth
                id="manager"
                name="manager"
                label="Менеджеры подразделений"
                value={formik.values.manager}
                onChange={formik.handleChange}
                multiline
                helperText={(formik.touched.manager && formik.errors.manager) || "Непосредственные исполнители"}
                error={Boolean(formik.touched.manager) && Boolean(formik.errors.manager)}
            />
            <TextField
                fullWidth
                id="copyManager"
                name="copyManager"
                label="Получатель копии"
                value={formik.values.copyManager}
                onChange={formik.handleChange}
                multiline
                helperText={(formik.touched.copyManager && formik.errors.copyManager) || 'Получит копию задачи'}
                error={Boolean(formik.touched.copyManager) && Boolean(formik.errors.copyManager)}
            />
            <SubmitButton formik={formik} />
        </form>
    )
})