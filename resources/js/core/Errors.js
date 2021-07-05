
class Errors{
    constructor(){
        this.errors = {};
    }

    has(field){
        return this.errors.hasOwnProperty(field);
    }

    any(){
        return Object.keys(this.errors).length >= 1
    }

    get(field){
        if(this.errors[field]){
            return this.errors[field][0];
        }
    }

    record(field){
        this.errors = field;
    }

    clear(field){
        if(field) {
            delete this.errors[field];
            return;
        }

        this.errors = {};
    }
}

export default Errors;
