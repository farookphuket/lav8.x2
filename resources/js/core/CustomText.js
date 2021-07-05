
class CustomText{
    
    constructor(str,len){
        this.str = str;
        this.len = len;
    }
    smartTitle(str,len=9){
        return (str.length >= len)?str.substring(0,len)+"...":str
    }

    thaiSlug(str){
        
     let slu  = str.replace(/\s+/g,"-") /* replace space with - */
      .replace(/[^\u0E00-\u0E7F\w\-]+/g,"") /* replace Thai letter */
      .replace(/\-\-+/g,"-") /* replace -- to - */
      .replace(/^-+/,"") /* I don''t know */
      .replace(/_/g,"") /* replace _ with null */
      .toLowerCase() /* convert to lowoer case */
      return slu
    }

 }


export default CustomText;
