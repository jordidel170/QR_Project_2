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
            <h5><FaThumbtack />{order.id}</h5>
            <h5><MdTableBar />{order.table_id}</h5>
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
