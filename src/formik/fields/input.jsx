import React from 'react';
import {ErrorMessage, Field} from 'formik';
import TextError from './textError';

function Input(props) {
    const { label, name, reguiredFields, ...rest }=props

    let myClass=rest.type=="file"?"form-control-file ":"form-control ";
    return(
        <div className='form-group'>
            <h6>{label}{reguiredFields.includes(name)&&<span className='text-danger'>*</span>}</h6>
            <Field>
                {
                    (props)=>{
                        //console.log(reguiredFields)
                        let err=(props.form.errors[name]&&props.form.touched[name])?'is-invalid':'';
                        return <Field className={myClass+err} id={name} name={name} {...rest} />
                    }
                }
            </Field>
            
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
}

export default Input