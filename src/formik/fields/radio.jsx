import React from 'react';
import { ErrorMessage, Field } from 'formik';
import TextError from './textError';

function Radio(props) {
    const { label, name, options,reguiredFields,onChange, ...rest } = props

    return (
        <div className='form-group'>
            <h6>{label}{reguiredFields.includes(name)&&<span className='text-danger'>*</span>}</h6>
            <Field className='form-check-input' name={name} {...rest} >
                {
                    ({ field, ...rest }) => {
                        if(onChange)field.onChange=onChange
                        //console.log(rest.meta)
                        return options.map(item => {
                            return (
                                <React.Fragment key={item.id}>
                                    <div className="form-check">
                                        <label>
                                            <input
                                                type="radio"
                                                {...field}
                                                value={item.id}
                                                checked={field.value === item.id}
                                            />
                                            {item.name}</label>
                                    </div>
                                </ React.Fragment>
                            )
                        })
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default Radio