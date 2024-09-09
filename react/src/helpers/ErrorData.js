export function setErrorData(errors, fields) {

    for (const error_prop in errors) {

        for (const field_prop in fields) {

            if (error_prop === field_prop) {
                fields[field_prop]({state: true, message: errors[error_prop][0]})
            }
        }
    }

}
