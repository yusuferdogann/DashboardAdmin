
export default function Validation({values}) {

    const errors = {}

    if(values.kaynak=== ""){
        errors.kaynak="email.is required"
    }

    if(values.birim=== ""){
        errors.birim="email.is required"
    }


    return errors;
}

