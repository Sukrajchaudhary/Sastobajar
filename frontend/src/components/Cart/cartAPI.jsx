import { host } from "../../Common/Api";
export function createCart(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${host}/AddttoCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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

export function getuserCartItems() {
  return new Promise(async (reslove, reject) => {
    const response = await fetch(`${host}/getuserCart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      reslove({ data });
    }
  });
}

// delete cart items
export function deleteCartItem(id) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${host}/deleteItem/` + id, {
      method: "DELETE",
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

// update cart items
export function updateCart(update) {
  return new Promise(async (resolve, _) => {
    const response = await fetch(`${host}/updatecart/` + update._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      resolve({ data });
    }
  });
}

// Reset cart
export function ResetCart() {
  return new Promise(async (resolve, _) => {
    const { data } = await getuserCartItems();
    for (let item of data) {
      await deleteCartItem(item._id);
    }
    resolve({ success: "success" });
  });
}
