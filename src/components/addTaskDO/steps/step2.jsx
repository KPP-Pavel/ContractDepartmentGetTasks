import React from 'react';
import FormikControl from '../../../formik/FormikControl'
import { compose } from "redux";
import { connect } from "react-redux";
import { getClients } from "../../../redux/reducers/reducer_taskDO";
import { withRouter } from 'react-router-dom';
import { AddClientButtonContainer } from '../newchangs/addClient'
import SelectContract from "../newchangs/selectContract";

function Step2(props) {
    let { arrClients, setFieldValue, MainCP,
        TypeDoc, num_doc_parent, TypeService, newMainCP, ...rest } = props

    React.useEffect(props.getClients
        , [])
    React.useEffect(
        ()=>{
            if(newMainCP[0]){
               setFieldValue('MainCP',newMainCP) 
            }
        }
        , [newMainCP])

    let [filterClientGID, setfilterClientGID] = React.useState('')
    let [filterClientName, setfilterClientName] = React.useState('')

    //console.log(filterClientName)

    return (
        <>
            <h5>Шаг.2 Контрагент</h5>
            <hr />
            <label><h6>Выберите одного контрагента</h6></label>
            <small className="form-text text-muted">Фильтр запускается клавишей Enter</small>
            <div className='row'>
                <div className='col-6'>
                    <FormikControl
                        control='input'
                        type='number'
                        name='filterClientGID'
                        placeholder='Поиск по GID'
                        onChange={e => {
                            setfilterClientName('')
                            setfilterClientGID(e.target.value)
                        }}
                        value={filterClientGID}
                        onKeyPress={(e) => {
                            if (e.key == 'Enter') {
                                e.preventDefault();
                                props.getClients(e.target.value)
                            }
                        }}
                    />
                </div>
                <div className='col-6'>
                    <FormikControl
                        control='input'
                        type='text'
                        name='filterClientName'
                        placeholder='Поиск по наименованию'
                        onChange={(e) => {
                            setfilterClientGID('')
                            setfilterClientName(e.target.value)
                        }}
                        value={filterClientName}
                        onKeyPress={(e) => {
                            if (e.key == 'Enter') {
                                e.preventDefault();
                                props.getClients(null, e.target.value)
                            }
                        }}
                    />
                </div>
            </div>
            <FormikControl
                control='select'
                label='Поиск контрагента'
                name='MainCPSelect'
                size='10'
                options={arrClients}
                onChange={(e) => {
                    setFieldValue('MainCP', [{
                        id: e.target.value,
                        name: document
                                .querySelector(`#MainCPSelect option[value="${e.target.value}"]`)
                                .textContent
                                .trim()
                    }])
                    /* setValues(
                        'MainCP', [{
                            id: e.target.value,
                            name: "KPP" + e.target.value
                        }]) */
                }}
            />
            <FormikControl
                control='input'
                type='text'
                readOnly='readOnly'
                name='MainCP'
                label='КА выбран'
                value={MainCP[0] ? MainCP[0].name : ''}
                data-idclient={MainCP[0] ? MainCP[0].id : ''}
            />
            <AddClientButtonContainer />
            {TypeDoc == 2 && <SelectContract
                setFieldValue={setFieldValue}
                num_doc_parent={num_doc_parent}
                TypeService={TypeService}
                MainCP={MainCP[0] ? MainCP[0].id : ''}
            />}
        </>
    )
}

let mapStateToProps = (state) => {
    //debugger;
    return {
        arrClients: state.TaskDOForm.clientsList
    }
}

export default compose(
    connect(mapStateToProps,
        { getClients }),
    withRouter
)(Step2);
