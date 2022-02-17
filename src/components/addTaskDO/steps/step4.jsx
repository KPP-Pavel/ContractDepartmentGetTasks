import React from 'react';
import FormikControl from '../../../formik/FormikControl'
import { compose } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import { getListTemplateDoc } from "../../../redux/reducers/reducer_taskDO";
import { withRouter } from 'react-router-dom';

let trueFalseOptions = [{ id: '1', name: 'Да' }, { id: '0', name: 'Нет' }]

function Step4(props) {

    let statusUser=useSelector(state=>state.TaskDOForm.statusUser)
    let listTemplateDoc = useSelector(state => state.TaskDOForm.listTemplateDoc)
    
    let dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getListTemplateDoc())
    }, [])
    let adminRights=statusUser!='ManagerPP'?true:false;

    return (
        <>
            <h5>Шаг.4 Прочее</h5>
            <hr />
            <FormikControl
                control='textarea'
                name='signerClient'
                label='Подписант со стороны контрагента'
                rows='3'
                placeholder='Укажите ФИО и должность подписанта, если есть принципиальные пожелания'
            />
            <FormikControl
                control='textarea'
                name='ContactManagerGA'
                label='Контакты со стороны исполнителя'
                rows='3'
                placeholder='Сотрудник Гринатом, которому можно задать уточняющие вопросы'
            />
            <FormikControl
                control='textarea'
                name='ContactsCp'
                label='Контакты со стороны заказчика'
                rows='3'
                placeholder='Указать для особых случаев'
            />
            <FormikControl
                control='textarea'
                name='systemsClient'
                label='К каким системам заказчика необходим доступ при оказании услуг'
                rows='3'
                placeholder='Обязательно для услуг: ИТ, развитие ИС, разовые ИТ услуги и услуги внедрения'
            />
            <FormikControl
                control='textarea'
                name='CommentCD'
                label='Комментарий ДО'
                rows='3'
                placeholder='Вносит администратор ДО'
                readOnly={adminRights?'':'readOnly'}
            />
            <FormikControl
                control='select'
                label='Шаблон договора'
                name='templateDoc'
                options={listTemplateDoc}
                readOnly={adminRights?'':'readOnly'}
            />

            <FormikControl
                control='radio'
                label='В договоре есть разовые услуги?'
                name='boxServiceBool'
                options={trueFalseOptions}
            />
            <FormikControl
                control='radio'
                label='Будут ли привлекаться соисполнители в рамках оказания услуг?'
                name='coExecutorBool'
                options={trueFalseOptions}
            />
            <FormikControl
                control='radio'
                label='Будут ли исполнители постоянно работать на территории заказчика?'
                name='worcClientAreaBool'
                options={trueFalseOptions}
            />
            <FormikControl
                control='radio'
                label='Исполнителю будет передаваться помещение для оказания услуг?'
                name='TransferAreaBool'
                options={trueFalseOptions}
            />
            <FormikControl
                control='radio'
                label='Исполнителю будет передаваться оборудование для оказания услуг?'
                name='TransferToolsBool'
                options={trueFalseOptions}
            />
        </>
    )
}


let mapStateToProps = (state) => {
    //debugger;
    return {
    }
}

export default compose(
    connect(mapStateToProps,
        {}),
    withRouter
)(Step4);