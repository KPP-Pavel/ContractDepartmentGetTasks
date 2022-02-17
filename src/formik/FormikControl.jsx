import React from 'react';
import Input from './fields/input';
import Inputfile from './fields/inputfile';
import Textarea from './fields/textarea';
import Select from './fields/select';
import Radio from './fields/radio';
import CheckBox from './fields/checkBox';
import {reguiredFields} from '../components/addTaskDO/addTaskDoStart' 

function FormikControl(props) {
    //console.log(reguiredFields)
    const { control , ...rest}=props
    switch(control){
        case 'input':
            return <Input {...rest} reguiredFields={reguiredFields} />
        case 'InputFile':
            return <Inputfile {...rest} reguiredFields={reguiredFields}/>
        case 'textarea':
            return <Textarea {...rest} reguiredFields={reguiredFields}/>
        case 'select':
            return <Select {...rest} reguiredFields={reguiredFields}/>
        case 'radio':
            return <Radio {...rest} reguiredFields={reguiredFields}/>
        case 'checkbox':
            return <CheckBox {...rest} reguiredFields={reguiredFields}/>
        case 'date':
        default: return null
    }
}
export default FormikControl