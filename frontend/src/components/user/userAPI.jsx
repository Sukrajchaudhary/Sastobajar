import {host} from "../../Common/Api"
export function ResetPasswordLink(to){
    return new Promise(async(resolve,reject)=>{
        const response= await fetch(`${host}/ResetPasswordLink`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(to)
        });
        if(response.ok){
            const data= await response.json();
            resolve({data});
        }
        else{
            const error= await response.json();
            reject({error})
        }
    })
}