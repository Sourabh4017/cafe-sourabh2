// "use client";

// import { useEffect, useState } from "react";

// export default function CustomerMenuPage() {
//   const [menu, setMenu] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchMenu = async () => {
//     try {
//       const res = await fetch("/api/menu");
//       const data = await res.json();
//       setMenu(data);
//     } catch (err) {
//       console.error("Failed to load menu");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMenu();
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-10 text-center text-lg">
//         Loading menu...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Our Menu
//       </h1>

//       {menu.length === 0 && (
//         <p className="text-center text-gray-500">
//           No items available
//         </p>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {menu.map((item) => (
//           <div
//             key={item._id}
//             className="border rounded-lg shadow hover:shadow-lg transition bg-white"
//           >
//             {/* IMAGE */}
//             <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
//               {item.image ? (
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="h-full w-full object-cover"
//                   onError={(e) =>
//                     (e.currentTarget.style.display = "none")
//                   }
//                 />
//               ) : (
//                 <span className="text-gray-400">
//                   No Image
//                 </span>
//               )}
//             </div>

//             {/* DETAILS */}
//             <div className="p-4">
//               <h2 className="font-semibold text-lg">
//                 {item.name}
//               </h2>

//               <p className="text-green-600 font-bold mt-1">
//                 ₹{item.price}
//               </p>

//               <button
//                 disabled
//                 className="mt-4 w-full bg-black text-white py-2 rounded opacity-80 cursor-not-allowed"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

//**************************************************** */

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CustomerMenuPage() {
//   const [menu, setMenu] = useState([]);
//   const [cart, setCart] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     fetch("/api/menu")
//       .then(res => res.json())
//       .then(setMenu);
//   }, []);

//   const addToCart = (item) => {
//     setCart(prev => [...prev, item]);
//   };

//   const goToCart = () => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//     router.push("/cart");
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Our Menu</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {menu.map(item => (
//           <div key={item._id} className="border p-4 rounded">
//             <h2 className="text-xl font-semibold">{item.name}</h2>
//             <p className="font-bold">₹{item.price}</p>

//             <button
//               onClick={() => addToCart(item)}
//               className="mt-3 bg-black text-white px-4 py-2 rounded"
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>

//       {cart.length > 0 && (
//         <button
//           onClick={goToCart}
//           className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-full"
//         >
//           View Cart ({cart.length})
//         </button>
//       )}
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";

// export default function CustomerMenuPage() {
//   const [menu, setMenu] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [tableNo, setTableNo] = useState("");
//   const [loading, setLoading] = useState(true);

//   /* ==========================
//      LOAD MENU
//   ========================== */
//   const loadMenu = async () => {
//     try {
//       const res = await fetch("/api/menu");
//       const data = await res.json();
//       setMenu(data);
//     } catch (err) {
//       alert("Failed to load menu");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadMenu();
//   }, []);

//   /* ==========================
//      ADD TO CART
//   ========================== */
//   const addToCart = (item) => {
//     setCart((prev) => [...prev, item]);
//     setTotal((prev) => prev + Number(item.price));
//   };

//   /* ==========================
//      PLACE ORDER
//   ========================== */
//   const placeOrder = async () => {
//     if (!tableNo.trim()) {
//       alert("Table number is required");
//       return;
//     }

//     if (cart.length === 0) {
//       alert("Please add at least one item");
//       return;
//     }

//     try {
//       const res = await fetch("/api/order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           tableNo,
//           items: cart,
//           total,
//         }),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         alert("Order failed: " + err.error);
//         return;
//       }

//       alert("Order placed successfully!");
//       setCart([]);
//       setTotal(0);
//       setTableNo("");
//     } catch (err) {
//       alert("Server error");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Café Menu</h1>

//       {/* TABLE NUMBER */}
//       <div className="mb-4">
//         <label className="font-semibold">Table No:</label>
//         <input
//           className="border p-2 ml-2"
//           placeholder="Enter table number"
//           value={tableNo}
//           onChange={(e) => setTableNo(e.target.value)}
//         />
//       </div>

//       <hr className="mb-4" />

//       {/* MENU LIST */}
//       {loading && <p>Loading menu...</p>}

//       {menu.map((item) => (
//         <div
//           key={item._id}
//           className="bg-white p-3 mb-3 rounded flex justify-between items-center shadow"
//         >
//           <div>
//             <strong>{item.name}</strong>
//             <br />
//             Price: ₹{item.price}
//           </div>

//           <button
//             onClick={() => addToCart(item)}
//             className="bg-black text-white px-4 py-1 rounded"
//           >
//             Add
//           </button>
//         </div>
//       ))}

//       {/* SUMMARY */}
//       <div className="bg-white p-4 mt-6 rounded shadow">
//         <h3 className="text-lg font-semibold">
//           Total: ₹{total}
//         </h3>

//         <button
//           onClick={placeOrder}
//           className="mt-3 bg-green-600 text-white px-6 py-2 rounded"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }


//fully functional code below *******************************************8
//-------------------------------------------

// "use client";

// import { useEffect, useState } from "react";

// export default function CustomerMenuPage() {
//   const [menu, setMenu] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [tableNo, setTableNo] = useState("");

//   /* ==========================
//      LOAD MENU
//   ========================== */
//   useEffect(() => {
//     fetch("/api/menu")
//       .then(res => res.json())
//       .then(setMenu)
//       .catch(() => alert("Failed to load menu"));
//   }, []);

//   /* ==========================
//      ADD TO CART
//   ========================== */
//   const addToCart = (item) => {
//     setCart(prev => {
//       const found = prev.find(i => i._id === item._id);
//       if (found) {
//         return prev.map(i =>
//           i._id === item._id ? { ...i, qty: i.qty + 1 } : i
//         );
//       }
//       return [...prev, { ...item, qty: 1 }];
//     });
//   };

//   /* ==========================
//      REMOVE ITEM
//   ========================== */
//   const removeFromCart = (id) => {
//     setCart(prev => prev.filter(i => i._id !== id));
//   };

//   /* ==========================
//      UPDATE QUANTITY
//   ========================== */
//   const updateQty = (id, delta) => {
//     setCart(prev =>
//       prev
//         .map(i =>
//           i._id === id ? { ...i, qty: i.qty + delta } : i
//         )
//         .filter(i => i.qty > 0)
//     );
//   };

//   /* ==========================
//      TOTAL
//   ========================== */
//   const total = cart.reduce(
//     (sum, i) => sum + i.price * i.qty,
//     0
//   );

//   /* ==========================
//      PLACE ORDER
//   ========================== */
//   const placeOrder = async () => {
//     if (!tableNo.trim()) return alert("Table number required");
//     if (cart.length === 0) return alert("Cart is empty");

//     const res = await fetch("/api/order", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         tableNo,
//         items: cart,
//         total,
//       }),
//     });

//     if (!res.ok) return alert("Order failed");

//     alert("Order placed");
//     setCart([]);
//     setTableNo("");
//   };

//   /* ==========================
//      UI
//   ========================== */
//   return (
//     <div className="container">
//       <h1>Café Menu</h1>

//       <input
//         placeholder="Table No"
//         value={tableNo}
//         onChange={e => setTableNo(e.target.value)}
//       />

//       <div className="menu-grid">
//         {menu.map(item => (
//           <div key={item._id} className="card">
//             <img
//               src={item.image || "/placeholder.png"}
//               alt={item.name}
//             />
//             <h3>{item.name}</h3>
//             <p>₹{item.price}</p>
//             <button onClick={() => addToCart(item)}>
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>

//       <h2>Cart</h2>

//       {cart.map(item => (
//         <div key={item._id} className="cart-row">
//           <span>{item.name}</span>
//           <div>
//             <button onClick={() => updateQty(item._id, -1)}>-</button>
//             <span>{item.qty}</span>
//             <button onClick={() => updateQty(item._id, 1)}>+</button>
//             <button onClick={() => removeFromCart(item._id)}>❌</button>
//           </div>
//         </div>
//       ))}

//       <h3>Total: ₹{total}</h3>
//       <button onClick={placeOrder} className="order-btn">
//         Place Order
//       </button>

//       <style jsx>{`
//         .container {
//           padding: 20px;
//           max-width: 900px;
//           margin: auto;
//         }
//         input {
//           padding: 8px;
//           margin-bottom: 20px;
//           width: 150px;
//         }
//         .menu-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 16px;
//         }
//         .card {
//           background: #fff;
//           padding: 12px;
//           border-radius: 10px;
//           text-align: center;
//           box-shadow: 0 4px 10px rgba(0,0,0,0.1);
//         }
//         .card img {
//           width: 100%;
//           height: 140px;
//           object-fit: cover;
//           border-radius: 8px;
//         }
//         .cart-row {
//           display: flex;
//           justify-content: space-between;
//           background: #fff;
//           padding: 10px;
//           margin: 8px 0;
//           border-radius: 6px;
//         }
//         button {
//           margin: 0 4px;
//           padding: 6px 10px;
//           cursor: pointer;
//         }
//         .order-btn {
//           background: #000;
//           color: #fff;
//           padding: 10px 16px;
//           margin-top: 10px;
//         }
//       `}</style>
//     </div>
//   );
// }

//******************************************************* */
//******************Fully Working Page*************************** */

// "use client";

// import { useEffect, useState } from "react";

// export default function CustomerMenuPage() {
//   const [menu, setMenu] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [tableNo, setTableNo] = useState("");

//   /* ================= LOAD MENU ================= */
//   useEffect(() => {
//     fetch("/api/menu")
//       .then(res => res.json())
//       .then(setMenu)
//       .catch(() => alert("Failed to load menu"));
//   }, []);

//   /* ================= CART LOGIC ================= */
//   const addToCart = (item) => {
//     setCart(prev => {
//       const found = prev.find(i => i._id === item._id);
//       if (found) {
//         return prev.map(i =>
//           i._id === item._id ? { ...i, qty: i.qty + 1 } : i
//         );
//       }
//       return [...prev, { ...item, qty: 1 }];
//     });
//   };

//   const updateQty = (id, delta) => {
//     setCart(prev =>
//       prev
//         .map(i =>
//           i._id === id ? { ...i, qty: i.qty + delta } : i
//         )
//         .filter(i => i.qty > 0)
//     );
//   };

//   const removeFromCart = (id) => {
//     setCart(prev => prev.filter(i => i._id !== id));
//   };

//   const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

//   /* ================= PLACE ORDER ================= */
//   const placeOrder = async () => {
//     if (!tableNo.trim()) return alert("Table number required");
//     if (cart.length === 0) return alert("Cart is empty");

//     const res = await fetch("/api/order", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ tableNo, items: cart, total }),
//     });

//     if (!res.ok) return alert("Order failed");

//     alert("Order placed successfully!");
//     setCart([]);
//     setTableNo("");
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="page">
//       {/* HEADER */}
//       <header className="header">
//         <h1>🍵 Café Sourabh</h1>
//         <p>Japanese Style Menu</p>
//       </header>

//       {/* TABLE INPUT */}
//       <div className="table-input">
//         <input
//           placeholder="Table No"
//           value={tableNo}
//           onChange={e => setTableNo(e.target.value)}
//         />
//       </div>

//       {/* MAIN */}
//       <div className="layout">
//         {/* MENU */}
//         <div className="menu-grid">
//           {menu.map(item => (
//             <div key={item._id} className="card">
//               <img
//                 src={item.image || "/placeholder.png"}
//                 alt={item.name}
//               />
//               <h3>{item.name}</h3>
//               <p className="price">₹{item.price}</p>
//               <button onClick={() => addToCart(item)}>
//                 Add
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* CART */}
//         <aside className="cart">
//           <h2>🛒 Cart</h2>

//           {cart.length === 0 && (
//             <p className="empty">No items added</p>
//           )}

//           {cart.map(item => (
//             <div key={item._id} className="cart-row">
//               <span>{item.name}</span>

//               <div className="qty">
//                 <button onClick={() => updateQty(item._id, -1)}>-</button>
//                 <span>{item.qty}</span>
//                 <button onClick={() => updateQty(item._id, 1)}>+</button>
//               </div>

//               <span>₹{item.price * item.qty}</span>

//               <button
//                 className="remove"
//                 onClick={() => removeFromCart(item._id)}
//               >
//                 ✕
//               </button>
//             </div>
//           ))}

//           <div className="total">
//             Total: ₹{total}
//           </div>

//           <button
//             className="order-btn"
//             onClick={placeOrder}
//           >
//             Place Order
//           </button>
//         </aside>
//       </div>

//       {/* STYLES */}
//       <style jsx>{`
//         .page {
//           background: #f6f4ef;
//           min-height: 100vh;
//           font-family: "Segoe UI", sans-serif;
//         }

//         .header {
//           background: #1f1f1f;
//           color: #fff;
//           padding: 20px;
//           text-align: center;
//         }

//         .table-input {
//           text-align: center;
//           margin: 20px 0;
//         }

//         .table-input input {
//           padding: 10px;
//           width: 160px;
//           border-radius: 6px;
//           border: 1px solid #ccc;
//         }

//         .layout {
//           display: grid;
//           grid-template-columns: 3fr 1.2fr;
//           gap: 20px;
//           padding: 20px;
//           max-width: 1200px;
//           margin: auto;
//         }

//         .menu-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 20px;
//         }

//         .card {
//           background: #fff;
//           border-radius: 14px;
//           padding: 14px;
//           text-align: center;
//           box-shadow: 0 8px 20px rgba(0,0,0,0.08);
//         }

//         .card img {
//           width: 100%;
//           height: 140px;
//           object-fit: cover;
//           border-radius: 10px;
//         }

//         .price {
//           color: #c0392b;
//           font-weight: bold;
//         }

//         .card button {
//           margin-top: 10px;
//           padding: 8px 14px;
//           background: #2c2c2c;
//           color: #fff;
//           border-radius: 6px;
//         }

//         .cart {
//           background: #fff;
//           border-radius: 14px;
//           padding: 16px;
//           box-shadow: 0 8px 20px rgba(0,0,0,0.1);
//           position: sticky;
//           top: 20px;
//           height: fit-content;
//         }

//         .cart-row {
//           display: grid;
//           grid-template-columns: 1fr auto auto auto;
//           align-items: center;
//           gap: 6px;
//           margin-bottom: 10px;
//         }

//         .qty button {
//           padding: 4px 8px;
//         }

//         .remove {
//           color: red;
//           font-weight: bold;
//         }

//         .total {
//           font-size: 18px;
//           font-weight: bold;
//           margin: 15px 0;
//         }

//         .order-btn {
//           width: 100%;
//           padding: 12px;
//           background: #000;
//           color: #fff;
//           border-radius: 8px;
//           font-size: 16px;
//         }

//         @media (max-width: 768px) {
//           .layout {
//             grid-template-columns: 1fr;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

export default function CustomerMenuPage() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [tableNo, setTableNo] = useState("");

  /* ================= LOAD MENU ================= */
  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then(setMenu)
      .catch(() => alert("Failed to load menu"));
  }, []);

  /* ================= GROUP BY CATEGORY ================= */
  const groupedMenu = menu.reduce((acc, item) => {
    const cat = item.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  /* ================= CART LOGIC ================= */
  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((i) => i._id === item._id);
      if (found) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i._id === id ? { ...i, qty: i.qty + delta } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  /* ================= PLACE ORDER ================= */
  const placeOrder = async () => {
    if (!tableNo.trim()) return alert("Table number required");
    if (cart.length === 0) return alert("Cart is empty");

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tableNo, items: cart, total }),
    });

    if (!res.ok) return alert("Order failed");

    alert("Order placed successfully!");
    setCart([]);
    setTableNo("");
  };

  /* ================= UI ================= */
  return (
    <div className="page">
      {/* HEADER */}
      <header className="header">
        <h1>🍵 Café Sourabh</h1>
        <p>Japanese Style Menu</p>
      </header>

      {/* TABLE INPUT */}
      <div className="table-input">
        <input
          placeholder="Table No"
          value={tableNo}
          onChange={(e) => setTableNo(e.target.value)}
        />
      </div>

      <div className="layout">
        {/* MENU */}
        <div>
          {Object.keys(groupedMenu).map((category) => (
            <section key={category} className="category-section">
              <h2 className="category-title">
                {category}
              </h2>

              <div className="menu-grid">
                {groupedMenu[category].map((item) => (
                  <div key={item._id} className="card">
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                    />
                    <h3>🍴 {item.name}</h3>
                    <p className="price">₹{item.price}</p>
                    <button onClick={() => addToCart(item)}>
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CART */}
        <aside className="cart">
          <h2>🛒 Cart</h2>

          {cart.length === 0 && (
            <p className="empty">No items added</p>
          )}

          {cart.map((item) => (
            <div key={item._id} className="cart-row">
              <span>{item.name}</span>

              <div className="qty">
                <button onClick={() => updateQty(item._id, -1)}>
                  -
                </button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item._id, 1)}>
                  +
                </button>
              </div>

              <span>₹{item.price * item.qty}</span>

              <button
                className="remove"
                onClick={() => removeFromCart(item._id)}
              >
                ✕
              </button>
            </div>
          ))}

          <div className="total">
            Total: ₹{total}
          </div>

          <button className="order-btn" onClick={placeOrder}>
            Place Order
          </button>
        </aside>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .page {
          background: #f6f4ef;
          min-height: 100vh;
          font-family: "Segoe UI", sans-serif;
        }

        .header {
          background: #1f1f1f;
          color: #fff;
          padding: 20px;
          text-align: center;
        }

        .table-input {
          text-align: center;
          margin: 20px 0;
        }

        .table-input input {
          padding: 10px;
          width: 160px;
          border-radius: 6px;
          border: 1px solid #ccc;
        }

        .layout {
          display: grid;
          grid-template-columns: 3fr 1.2fr;
          gap: 20px;
          padding: 20px;
          max-width: 1200px;
          margin: auto;
        }

        .category-section {
          margin-bottom: 40px;
        }

        .category-title {
          font-size: 26px;
          margin-bottom: 16px;
          border-left: 6px solid #c0392b;
          padding-left: 12px;
          color: #2c2c2c;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .card {
          background: #fff;
          border-radius: 14px;
          padding: 14px;
          text-align: center;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }

        .card img {
          width: 100%;
          height: 140px;
          object-fit: cover;
          border-radius: 10px;
        }

        .price {
          color: #c0392b;
          font-weight: bold;
        }

        .card button {
          margin-top: 10px;
          padding: 8px 14px;
          background: #2c2c2c;
          color: #fff;
          border-radius: 6px;
        }

        .cart {
          background: #fff;
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          position: sticky;
          top: 20px;
          height: fit-content;
        }

        .cart-row {
          display: grid;
          grid-template-columns: 1fr auto auto auto;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
        }

        .qty button {
          padding: 4px 8px;
        }

        .remove {
          color: red;
          font-weight: bold;
        }

        .total {
          font-size: 18px;
          font-weight: bold;
          margin: 15px 0;
        }

        .order-btn {
          width: 100%;
          padding: 12px;
          background: #000;
          color: #fff;
          border-radius: 8px;
          font-size: 16px;
        }

        @media (max-width: 768px) {
          .layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
