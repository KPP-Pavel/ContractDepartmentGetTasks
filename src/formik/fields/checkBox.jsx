import React from 'react';
import { ErrorMessage, Field } from 'formik';
import TextError from './textError';

function CheckBox(props) {
    //console.log(props)
    const { label, name, options,reguiredFields, ...rest } = props
    return (
        <div className='form-group'>
            <h6>{label}{reguiredFields.includes(name)&&<span className='text-danger'>*</span>}</h6>

            <Field className='form-check-input' name={name} {...rest} >
                {
                    ({ field, ...rest }) => {

                        //console.log(rest.meta)
                        return options.map(item => {
                            return (
                                <React.Fragment key={item.key}>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id={item.key}
                                            {...field}
                                            value={item.key}
                                            checked={field.value.includes(item.key)}
                                        />
                                        <label htmlFor={item.key}>{item.value}</label>
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

export default CheckBox