import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from "react-router-dom";
import { MdTableBar } from "react-icons/md";
import { FaThumbtack } from "react-icons/fa6";
import { LuTimer } from "react-icons/lu";
import { Context } from "../store/appContext";
import "../../styles/KitchenList.css";

export const KitchenList = () => {
  const { store,actions } = useContext(Context)
  const { restaurantId } = useParams();
  const [completedItems, setCompletedItems] = useState([]);
   useEffect(() => {
   
    if (restaurantId) {
      actions.getOrder(restaurantId);
    }
  }, [restaurantId]);
  const toggleItemCompleted = (orderId, itemId) => {
    const updatedCompletedItems = [...completedItems];
    const itemIndex = completedItems.findIndex((item) => item.orderId === orderId && item.itemId === itemId);

    if (itemIndex === -1) {
      updatedCompletedItems.push({ orderId, itemId });
    } else {
      updatedCompletedItems.splice(itemIndex, 1);
    }

    setCompletedItems(updatedCompletedItems);
  };

  const toggleOrderCompleted = (orderId) => {
    const order = store.orders.find((order) => order.id === orderId);
    if (!order) return;

    const isOrderCompleted = order.order_items.every((item) =>
      completedItems.some((completedItem) => completedItem.orderId === orderId && completedItem.itemId === item.id)
    );

    const updatedCompletedItems = isOrderCompleted
      ? completedItems.filter((item) => item.orderId !== orderId)
      : [...completedItems, ...order.order_items.map((item) => ({ orderId, itemId: item.id }))];

    setCompletedItems(updatedCompletedItems);
  };
  const sortedOrders = store?.orders.slice().sort((a, b) => {
    const isOrderACompleted = a.order_items.every((item) =>
      completedItems.some((completedItem) => completedItem.orderId === a.id && completedItem.itemId === item.id)
    );
    const isOrderBCompleted = b.order_items.every((item) =>
      completedItems.some((completedItem) => completedItem.orderId === b.id && completedItem.itemId === item.id)
    );
    return isOrderACompleted - isOrderBCompleted;
  });
      return (

  //   <div className="kitchen-list">
  //   {store?.orders.map((order) => (
  //     <div key={order.id} className="order-container">
  //       <h5><FaThumbtack />{order.id}</h5>
  //       <h5><MdTableBar />{order.table_id}</h5>
  //       <ul className="order-items-list">
  //         {order.order_items.map((item) => {
  //           const isItemCompleted = completedItems.some(
  //             (completedItem) => completedItem.orderId === order.id && completedItem.itemId === item.id
  //           );

  //           return (
  //             <li key={item.id} className={`order-item ${isItemCompleted ? 'completed' : ''}`}>
  //               <input
  //                 type="checkbox"
  //                 id={`item-${item.id}`}
  //                 checked={isItemCompleted}
  //                 onChange={() => toggleItemCompleted(order.id, item.id)}
  //               />
  //               <label htmlFor={`item-${item.id}`}>
  //                 {item.name} x {item.quantity}
  //               </label>
  //             </li>
  //           );
  //         })}
  //         <li className="complete-all">
  //               <input
  //                 type="checkbox"
  //                 id={`order-${order.id}-complete-all`}
  //                 checked={isOrderCompleted}
  //                 onChange={() => toggleOrderCompleted(order.id)}
  //               />
  //               <label htmlFor={`order-${order.id}-complete-all`}>
  //                 Complete All
  //               </label>
  //             </li>
  //       </ul>
  //     </div>
  //   ))}
  // </div>
  <div className="kitchen-list">
      {sortedOrders.map((order) => {
        const isOrderCompleted = order.order_items.every((item) =>
          completedItems.some((completedItem) => completedItem.orderId === order.id && completedItem.itemId === item.id)
        );

        return (
          <div key={order.id} className="order-container">
            <h5><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"/></svg>
              {order.id}</h5>
            <h5><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M173-600h614l-34-120H208l-35 120Zm307-60Zm192 140H289l-11 80h404l-10-80ZM160-160l49-360h-89q-20 0-31.5-16T82-571l57-200q4-13 14-21t24-8h606q14 0 24 8t14 21l57 200q5 19-6.5 35T840-520h-88l48 360h-80l-27-200H267l-27 200h-80Z"/></svg>
              {order.table_id}</h5>
            <ul className="order-items-list">
              {order.order_items.map((item) => {
                const isItemCompleted = completedItems.some(
                  (completedItem) => completedItem.orderId === order.id && completedItem.itemId === item.id
                );

                return (
                  <li key={item.id} className={`order-item ${isItemCompleted ? 'completed' : ''}`}>
                    <input
                      type="checkbox"
                      id={`item-${item.id}`}
                      checked={isItemCompleted}
                      onChange={() => toggleItemCompleted(order.id, item.id)}
                    />
                    <label htmlFor={`item-${item.id}`}>
                      {item.name} x {item.quantity}
                    </label>
                  </li>
                );
              })}
             
                  
                
            </ul>
            <div className='order-controls'>
             <button className={`completed ${isOrderCompleted ? 'completed-green' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                      <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                    </svg>
                  </button>
             </div>
          </div>
        );
      })}
    </div>
      );
    };
