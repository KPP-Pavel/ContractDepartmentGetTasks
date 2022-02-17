import React from 'react';
import { ErrorMessage, Field } from 'formik';
import TextError from './textError';

function Textarea(props) {
    const { label, name, reguiredFields, ...rest } = props
    return (
        <div className='form-group'>
            <h6>{label}{reguiredFields.includes(name)&&<span className='text-danger'>*</span>}</h6>
            <Field>
                {
                    props => {
                        let err = (props.form.errors[name] && props.form.touched[name]) ? 'is-invalid' : '';
                        return <Field as='textarea' className={err+' form-control'} id={name} name={name} {...rest} />
                    }
                }
            </Field>

            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default Textarea