import FormikControl from '../../../formik/FormikControl'
import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import { getContracts } from "../../../redux/reducers/reducer_taskDO";

function SelectContract(props) {
    let { num_doc_parent, setFieldValue, TypeService, MainCP } = props

    let selectContract = (e) => {
        e.preventDefault()
        var data = {
            id: e.target.getAttribute('data-id'),
            number: e.target.innerText.trim()
        }
        setFieldValue('num_doc_parent', data)
    }
    
    let dispatch = useDispatch();
    let contracts = useSelector(state => state.TaskDOForm.contracts)
    
    React.useEffect(() =>
        dispatch(getContracts(MainCP, TypeService))
        , [TypeService, MainCP])


    let rows = contracts.map(item =>
        <tr key={item.id}>
            <th scope="row">
                <a href='#' data-id={item.id} onClick={selectContract}>{item.numberContract}</a>
            </th>
            <td>{item.dateContract}</td>
            <td>{item.subject}</td>
        </tr>)
    return (
        <div>
            <div className="form-group">
                <FormikControl
                    control='input'
                    type='text'
                    readOnly='readOnly'
                    name='num_doc_parent'
                    label='Договор выбран:'
                    value={num_doc_parent ? num_doc_parent.number : ''}
                    data-idparent={num_doc_parent ? num_doc_parent.id : ''}
                />
            </div>
            <div>
                <label><h6>Выбор договора (для ДС):</h6></label>
                <table className="table table-sm table-responsive">
                    <thead>
                        <tr>
                            <th scope="col" className='align-top text-center w-25'>№ Договора</th>
                            <th scope="col" className='align-top text-center w-25'>Дата договора</th>
                            <th scope="col" className='align-top text-center w-50'>Предмет договора</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SelectContract