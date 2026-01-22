'use client'

import { useState, useRef } from 'react'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [cart, setCart] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')

  const products = [
    { name: "iPhone 12 Used", price: 120000, deal: true, img: "https://images.unsplash.com/photo-1603898037225-0e44a1c7b5d9" },
    { name: "Samsung A54 New", price: 98000, deal: true, img: "https://images.unsplash.com/photo-1610945265064-0e34e9a8f7a5" },
    { name: "Wireless Earbuds", price: 6500, deal: false, img: "https://images.unsplash.com/photo-1585386959984-a4155228f9c1" },
    { name: "Fast Charger", price: 2200, deal: false, img: "https://images.unsplash.com/photo-1625723044792-44de16ccb4c9" }
  ]

  const showSection = (id) => {
    setActiveSection(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const requireAuth = (id) => {
    if (!isLoggedIn) {
      showSection('auth')
    } else {
      showSection(id)
    }
  }

  const login = () => {
    setIsLoggedIn(true)
    setIsAdmin(role === 'admin')
    showSection(isAdmin ? 'admin' : 'shop')
  }

  const addToCart = (i) => {
    setCart([...cart, products[i]])
  }

  const renderCart = () => {
    const total = cart.reduce((sum, p) => sum + p.price, 0)
    return (
      <div id="cartItems">
        {cart.map((p, i) => (
          <div key={i} className="flex justify-between mb-2 text-gray-300">
            <span>{p.name}</span>
            <span>Rs. {p.price}</span>
          </div>
        ))}
        <p className="text-green-400 font-semibold mt-4">Total: Rs. <span id="total">{total}</span></p>
        <button className="btn mt-4">Checkout (Mock Payment)</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-3.5 bg-slate-950/90 backdrop-blur-sm border-b border-slate-700">
        <h1 className="text-green-500">Ishop</h1>
        <nav>
          <a onClick={() => showSection('home')} className="mx-2.5 text-gray-100 no-underline cursor-pointer transition-colors duration-300 hover:text-green-500">Home</a>
          <a onClick={() => requireAuth('shop')} className="mx-2.5 text-gray-100 no-underline cursor-pointer transition-colors duration-300 hover:text-green-500">Shop</a>
          <a onClick={() => requireAuth('cart')} className="mx-2.5 text-gray-100 no-underline cursor-pointer transition-colors duration-300 hover:text-green-500">Cart ({cart.length})</a>
          <a onClick={() => showSection('auth')} className="mx-2.5 text-gray-100 no-underline cursor-pointer transition-colors duration-300 hover:text-green-500">Login / Signup</a>
        </nav>
      </header>

      {/* HOME */}
      <section id="home" className={`px-8 py-20 text-center transition-all duration-700 ${activeSection === 'home' ? 'active' : 'inactive'}`}>
        <div className="hero">
          <h2 className="text-4xl mb-2.5">New & Used Smartphones</h2>
          <p className="text-gray-400 mb-6">Premium deals on phones & accessories</p>
          <button className="btn" onClick={() => showSection('auth')}>Login / Signup</button>
        </div>
      </section>

      {/* AUTH */}
      <section id="auth" className={`px-8 py-20 transition-all duration-700 ${activeSection === 'auth' ? 'active' : 'inactive'}`}>
        <h3 className="mb-6 text-2xl">Login / Signup</h3>
        <div className="auth-box">
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button className="btn" onClick={login}>Continue</button>
        </div>
      </section>

      {/* DEALS */}
      <section id="deals" className={`px-8 py-20 transition-all duration-700 ${activeSection === 'deals' ? 'active' : 'inactive'}`}>
        <h3 className="mb-6 text-2xl">🔥 Hot Deals</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5.5">
          {products.filter(p => p.deal).map((p, i) => (
            <div key={i} className="card deal">
              <div className="badge">Deal</div>
              <img src={p.img} alt={p.name} />
              <h4 className="text-lg font-semibold">{p.name}</h4>
              <p className="price">Rs. {p.price}</p>
              <button className="btn" onClick={() => addToCart(products.indexOf(p))}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className={`px-8 py-20 transition-all duration-700 ${activeSection === 'shop' ? 'active' : 'inactive'}`}>
        <h3 className="mb-6 text-2xl">Shop Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5.5">
          {products.map((p, i) => (
            <div key={i} className="card">
              {p.deal && <div className="badge">Deal</div>}
              <img src={p.img} alt={p.name} />
              <h4 className="text-lg font-semibold">{p.name}</h4>
              <p className="price">Rs. {p.price}</p>
              <button className="btn" onClick={() => addToCart(i)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* CART */}
      <section id="cart" className={`px-8 py-20 transition-all duration-700 ${activeSection === 'cart' ? 'active' : 'inactive'}`}>
        <h3 className="mb-6 text-2xl">Your Cart</h3>
        {renderCart()}
      </section>

      {/* ADMIN */}
      <section id="admin" className={`px-8 py-20 transition-all duration-700 ${activeSection === 'admin' ? 'active' : 'inactive'}`}>
        <h3 className="mb-6 text-2xl">Admin Panel</h3>
        <div className="auth-box">
          <h4 className="text-lg font-semibold mb-4">Product Management</h4>
          <input placeholder="Product name" />
          <input placeholder="Price" />
          <select>
            <option>New</option>
            <option>Used</option>
          </select>
          <button className="btn">Add Product</button>
          <button className="btn bg-red-500 text-white hover:bg-red-600">Delete Product</button>
          <button className="btn bg-blue-500 text-white hover:bg-blue-600">Edit Product</button>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`px-8 py-20 transition-all duration-700 ${activeSection === 'contact' ? 'active' : 'inactive'}`}>
        <h3 className="mb-6 text-2xl">Contact Us</h3>
        <div className="contact grid gap-3.75 max-w-md mx-auto text-gray-400">
          <div>📍 Address: Old Civil Line, City Name</div>
          <div>📞 Phone: 03XX-XXXXXXX</div>
          <div>📧 Email: example@ishop.com</div>
          <div>💬 WhatsApp: 03XX-XXXXXXX</div>
          <div>📸 Instagram: @ishop_store</div>
        </div>
      </section>

      <footer className="text-center py-6 text-gray-400 border-t border-slate-700">© 2026 Ishop – Complete Mobile Store</footer>
    </div>
  )
}
