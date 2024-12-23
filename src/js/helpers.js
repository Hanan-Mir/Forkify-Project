import { TIMEOUT_SEC } from "./config";
const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };
export const getJson=async function(url){
    try{
        let response= await fetch(url);
        let data=await Promise.race([response.json(),timeout(TIMEOUT_SEC)]);
      if(!response.ok) throw new Error(`${response.status},${data.message}`);
      return data;
    }
    catch(err){
throw err;
    }
}
export const sendJson=async function(url,Data){
  try{
      let response= await fetch(url,{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(Data)
      });
      let data=await Promise.race([response.json(),timeout(TIMEOUT_SEC)]);
    if(!response.ok) throw new Error(`${response.status},${data.message}`);
    return data;
  }
  catch(err){
throw err;
  }
}