import Errors from './Errors';

class Form{

    constructor(data){
        this.originalData = data;

        for(let field in data){
            this[field] = data[field];
        }

        this.errors = new Errors();
    }

    data(){
       let data =  Object.assign({},this);
        delete data.originalData;
        delete data.errors;

        return data;
        
    }

    submit(requestType,url){
        return new Promise((resolve,reject)=>{
            axios[requestType](url,this.data())
                .then(res=>{
                    this.onSuccess(res.data);
                    resolve(res.data);
                })
                .catch(err=>{
                    this.onFail(err.response.data.errors);
                    reject(err.response.data.errors)
                })
        });
    }

    onSuccess(data){
        //alert(data.msg)
        this.reset()
        //return data
    }

    onFail(error){

        this.errors.record(error)
    }

    reset(){
        for(let field in this.originalData){
            this[field] = '';
        }

        this.errors.clear()
    }
}

export default Form;
