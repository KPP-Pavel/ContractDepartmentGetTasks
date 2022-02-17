import React from 'react';
import { ErrorMessage, Field } from 'formik';
import TextError from './textError';

function Select(props) {
    const { label, name, options, reguiredFields, ...rest } = props
    return (
        <div className='form-group'>
            <h6>{label}{reguiredFields.includes(name)&&<span className='text-danger'>*</span>}</h6>
            <Field>
                {
                    props => {
                        let err = (props.form.errors[name] && props.form.touched[name]) ? 'is-invalid' : '';
                        return (<Field as='select' className={err+' form-control'} id={name} name={name} {...rest} >
                            <option key='0'></option>
                            {options.map(item => {
                                return <option key={item.id} value={item.id}>{item.name}</option>
                            })}
                        </Field>)
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default Select