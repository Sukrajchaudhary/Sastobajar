// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise((resolve,reject) =>
    {
      try {
        resolve({data:amount})
      } catch (error) {
        reject({error})
      }
    }
  );
}
