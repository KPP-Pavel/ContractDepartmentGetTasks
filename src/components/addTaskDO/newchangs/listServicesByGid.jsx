import { useDispatch, useSelector } from "react-redux"
import React from 'react';
import { getListservicesByGid } from "../../../redux/reducers/reducer_taskDO";

function ListServicesByGid(props) {
    //console.log(props);
    let { gid, TypeService } = props
    let listServicesByGid = useSelector(state => state.TaskDOForm.listServicesByGid)
    let dispatch = useDispatch()
    React.useEffect(() => dispatch(getListservicesByGid(gid, TypeService)), [gid, TypeService])

    const styleContentDiv = {
        overflow: 'auto',
        maxHeight: '300px'
    }

    let rows = listServicesByGid.map(item => {
        let ref = `http://webdo.gk.rosatom.local/index.php?idPage=workbook&ID=${item.idDocument}&PID=${item.parentId}`
        return (<tr key={item.id}>
            <th scope="row"><a href={ref}>{item.idDocument}</a></th>
            <td>{item.codeService}</td>
            <td>{item.numDoc}</td>
            <td>{item.statusDoc}</td>
            <td>{item.dateBegeen}</td>
            <td>{item.dateEnd}</td>
        </tr>)
    })
    return (
        <div>
            <h5>Список услуг по контрагенту</h5>
            <hr />
            <div style={styleContentDiv}>
                <table className="table table-sm table-responsive">
                    <thead>
                        <tr>
                            <th scope="col" className='align-top text-center'>ID документа</th>
                            <th scope="col" className='align-top text-center'>Код услуги</th>
                            <th scope="col" className='align-top text-center'>№ договор</th>
                            <th scope="col" className='align-top text-center'>Статус договора</th>
                            <th scope="col" className='align-top text-center'>Дата начала действия</th>
                            <th scope="col" className='align-top text-center'>Дата окончания действия</th>
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

export default ListServicesByGid