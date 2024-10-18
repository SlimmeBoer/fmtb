export function setErrorData(errors, fields, setFields) {

    for (const error_prop in errors) {

        for (const field_prop in fields) {
            if (error_prop === field_prop && field_prop !== undefined) {
                fields[field_prop].errorstatus = true;
                fields[field_prop].helperText = errors[error_prop][0];
            }
        }
    }
    console.log(fields)
    setFields(fields);

}
export function resetErrorData(fields, setFields) {

    for (const field_prop in fields) {
        fields[field_prop].errorstatus = false;
        fields[field_prop].helperText = '';
    }
    setFields(fields);
}

