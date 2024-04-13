// create users
import { host } from "../../Common/Api";
export function createUsers(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${host}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject({ error });
      }
    } catch (error) {
      reject(error.message);
    }
  });
}
// loginuser

export function LoginUser(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${host}/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject({ error });
      }
    } catch (error) {
      reject(error.message);
    }
  });
}

// checkUser

export function checkuser() {
  return new Promise(async (resolve, _) => {
    const response = await fetch(`${host}/checkuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      resolve({ data });
    }
  });
}

// LogoutUser
export function LogOutUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${host}/logout`, {
        method: "POST",
        headers: {
          "Content-Typs": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject({ error });
      }
    } catch (error) {
      reject({ error });
    }
  });
}
// updateAddress
export function UpdateAddress(data){
  return new Promise(async(resolve,reject)=>{
  try {
    const response= await fetch(`${host}/updateAddress`,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      credentials:'include',
      body:JSON.stringify(data)
    });
    if(response.ok){
      const data= await response.json();
      resolve({data})
    }
    else{
      const error= await response.json();
      reject({error})
    }
  } catch (error) {
    reject(error.message)
  }
  })
}