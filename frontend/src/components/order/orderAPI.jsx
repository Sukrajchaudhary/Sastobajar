import { host } from "../../Common/Api";

export function makeOrder(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${host}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(order),
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
// fetch all orders
export function getAllUserOrders() {
  return new Promise(async (resolve,_) => {
    const response = await fetch(`${host}/getOrders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if(response.ok){
        const data= await response.json();
        resolve({data})
    }
  });
}
