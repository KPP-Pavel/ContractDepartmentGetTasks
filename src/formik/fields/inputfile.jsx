import React from 'react';
import {ErrorMessage, Field} from 'formik';
import TextError from './textError';

function InputFile(props) {
    const { label, name,reguiredFields, ...rest }=props
    return(
        <div className='form-group'>
            <h6>{label}{reguiredFields.includes(name)&&<span className='text-danger'>*</span>}</h6>
            <Field>
                {
                    (props)=>{
                        let {form}=props
                        
                        return <Field 
                            className={'form-control-file'} 
                            id={name} name={name+'form'}
                            onChange={(e) => {
                                //debugger
                                //console.log(e.currentTarget.files)
                                form.setFieldValue(name, [e.currentTarget.files]);
                              }}
                            {...rest}
                            type='file'
                             />
                    }
                }
            </Field>
            
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
}

export default InputFile