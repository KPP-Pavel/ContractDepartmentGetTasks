import * as yup from 'yup'

const validationSchemeClient = yup.object({
    daysAtWork: yup.number().min(1),
    client: yup.object().required()
})
const validationSchemeTasks = yup.array().min(1)
const validationSchemeFiles = yup.array().min(1)




export function validateClient(client, callBack) {
    validationSchemeClient.validate(client).then((data) => {
        callBack(true)
    }).catch((err) => {
        callBack(false)
    })
}

export async function validateTasks(client, callBack) {
    try {
        await validationSchemeTasks.validate(client)
        callBack(true)
    } catch (err) {
        callBack(false)
    }
}
export async function validateFiles(client, callBack) {
    try {
        await validationSchemeFiles.validate(client)
        callBack(true)
    } catch (err) {
        callBack(false)
    }
}