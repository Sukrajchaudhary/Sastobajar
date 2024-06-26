import { host } from "../../Common/Api";
export function getAllUsersProducts(Filter, Sort, pagination, SearchObj) {
  let querystring = "";
  for (let key in Filter) {
    const categoryValue = Filter[key];
    if (Array.isArray(categoryValue) && categoryValue.length > 0) {
      categoryValue.forEach((value) => {
        querystring += `${key}=${value}&`;
      });
    }
  }
  for (let key in Sort) {
    querystring += `${key}=${Sort[key]}&`;
  }
  for (let key in pagination) {
    querystring += `${key}=${pagination[key]}&`;
  }
  for (let key in SearchObj) {
    querystring = `${key}=${SearchObj[key]}&`;
  }
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${host}/GetallProducts?` + querystring, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const totalItems = await response.headers.get("X-Total-Count");
        const data = await response.json();
        resolve({ data: { products: data, totalItems: +totalItems } });
      } else {
        const error = await response.json();
        reject({ error });
      }
    } catch (error) {
      reject(error.message);
    }
  });
}

export function getProduct(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${host}/selectProduct/` + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();

        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      reject(error.message);
    }
  });
}
// get all category

export function getAllCategory() {
  return new Promise(async (resolve, rejects) => {
    try {
      const response = await fetch(`${host}/category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      }
    } catch (error) {
      rejects(error.message);
    }
  });
}

// Create Product
export function AddProduct(formData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/api/create-product", {
        method: "POST",
        credentials: "include",
        body: formData,
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

// userProduct
export function getUserProduct(){
  return new Promise(async(resolve,reject)=>{
    const response= await fetch(`${host}/getUserProduct`,{
      method:'GET',
      credentials:"include",
      headers:{
        'Content-Types':'application/json'
      }
    });
    if(response.ok){
      const data=await response.json();
      resolve({data})
    }
    else{
    const error =await response.json();
    resolve({error})
    }
  })
}