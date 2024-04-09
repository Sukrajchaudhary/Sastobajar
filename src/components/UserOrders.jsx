import React from "react";

const UserOrders = () => {
  return (
    <>
    <div className="mx-auto h-full mt-10 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
      <h3 className="text-2xl font-bold tracking-tighter text-black-900">Order_id</h3>
      <h3 className="text-2xl font-bold tracking-tighter text-red-900">Peending</h3>
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            <li className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src=""
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href="#">hello</a>
                    </h3>
                    <p className="ml-4">$123</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Samusung</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Iste, consequuntur reiciendis, nihil quasi nesciunt quas
                    nulla ullam ducimus deserunt enim quisquam temporibus
                    distinctio voluptates est rem quis aspernatur, voluptatum
                    eos.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>TotalAmount</p>
          <p>45</p>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total Items in Carts</p>
          <p>3 Items</p>
        </div>
      </div>
    </div>
    <div className="mx-auto h-full mt-10 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
      <h3 className="text-2xl font-bold tracking-tighter text-black-900"></h3>
      <h3 className="text-2xl font-bold tracking-tighter text-red-900"></h3>
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            <li className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src=""
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href="#">hello</a>
                    </h3>
                    <p className="ml-4">$123</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Samusung</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Iste, consequuntur reiciendis, nihil quasi nesciunt quas
                    nulla ullam ducimus deserunt enim quisquam temporibus
                    distinctio voluptates est rem quis aspernatur, voluptatum
                    eos.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>TotalAmount</p>
          <p>45</p>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total Items in Carts</p>
          <p>3 Items</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserOrders;
