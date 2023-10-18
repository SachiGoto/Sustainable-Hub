function woof(str){
    
    // return str.length + "woof";
    // console.log("the woof ran", str)
    if(typeof str !== "string"){
        // return str;
        throw Error("MUST be a string");
   

    }else{
        return str.length + "woof";
    }

// const result =  str.length + " woof";
// console.log(result);
}

module.exports = woof;