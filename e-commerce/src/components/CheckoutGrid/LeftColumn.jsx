import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../store/CartContext'

const LeftColumn = () => {
  const { msg } = useContext(CartContext)
  const handleClick = (operation, item) => {
    switch (operation) {
      case '+': {
        if (item.quantity === undefined || item.quantity < item.countInStock) {
          const updatedCart = [...cart]
          const itemIndex = updatedCart.findIndex(
            (cartItem) => cartItem._id === item._id,
          )
          const updatedItem = { ...updatedCart[itemIndex] }
          updatedItem.quantity = (updatedItem.quantity || 0) + 1
          updatedCart[itemIndex] = updatedItem
          setCart(updatedCart)
        }
        break
      }

      case '-': {
        if (item.quantity === undefined || item.quantity > 1) {
          const updatedCart = [...cart]
          const itemIndex = updatedCart.findIndex(
            (cartItem) => cartItem._id === item._id,
          )
          const updatedItem = { ...updatedCart[itemIndex] }
          updatedItem.quantity = (updatedItem.quantity || 0) - 1
          updatedCart[itemIndex] = updatedItem
          setCart(updatedCart)
        }
        break
      }

      default:
        break
    }
  }

  const handleRemove = (item) => {
    const newCart = cart.filter((cartItem) => cartItem._id !== item._id)
    console.log('newCart', newCart)
    setCart(newCart)
  }

  useEffect(() => {
    //NOTE - add property quantity to EVERY item of the cart, only when there are items inside
    if (cart.length > 0) {
      const updatedCart = cart.map((item) => {
        if (item.quantity === undefined) {
          return { ...item, quantity: 1 }
        } else {
          return item
        }
      })
      setCart(updatedCart)
    }
  }, [])

  const { cart, setCart } = useContext(CartContext)
  return (
    <article
      className={`${
        msg ? 'blur-xl' : 'blur-none'
      } flex flex-col gap-7 overflow-auto p-2 pr-6`}
    >
      {!cart.length > 0 ? (
        <div className={`${msg ? 'blur-xl' : 'blur-none'}`}>
          <h2>There are no products on your cart</h2>
          <Link
            to='/'
            className='bg-gradient-to-br w-fit from-orange-400/70 to-amber-600/90 rounded px-3 py-1 flex gap-1 items-baseline outline outline-2 outline-orange-900/40'
          >
            <i className='fa-solid fa-virus text-gray-200 text-xl'></i>
            <span className='text-gray-200'>shop now</span>
          </Link>
        </div>
      ) : (
        cart.map((item) => {
          return (
            <div
              className='bg-gradient-to-b from-slate-900 h-1/4 flex rounded-lg border-[1px] outline outline-4 outline-amber-100/50 mt-6'
              key={item._id}
            >
              <div className='w-1/4 h-full to-slate-800 rounded-lg'>
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-full h-full object-scale-down rounded-lg -translate-y-[30px]'
                />
              </div>
              <div className='w-3/4 relative'>
                <div className='flex justify-around w-full items-baseline px-2'>
                  <div className='w-2/3'>
                    <h2 className='text-gray-100 font-bold uppercase font-poppins tracking-widest text-2xl'>
                      {item.name}
                    </h2>
                  </div>
                  <div className='w-1/4'>
                    <span className='text-white font-medium'>
                      ${item.price}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <button onClick={() => handleClick('-', item)}>
                      <i className='text-xl fa-solid fa-minus text-white'></i>
                    </button>
                    <span className='bg-slate-100 font-bold px-2 py-1 rounded'>
                      {item.quantity}
                    </span>
                    <button onClick={() => handleClick('+', item)}>
                      <i className='text-xl fa-solid fa-plus text-white'></i>
                    </button>
                  </div>
                </div>
                <div>
                  <span className='text-xl font-bold text-gray-100'>
                    Stock: {item.countInStock}
                  </span>
                </div>
                <button
                  onClick={() => handleRemove(item)}
                  className=' absolute right-6 bottom-0 md:bottom-5 lg:bottom-[5%] duration-200 hover:scale-125 p-0'
                >
                  <i className='fa-solid fa-trash text-gray-200 text-2xl '></i>
                </button>
              </div>
            </div>
          )
        })
      )}
    </article>
  )
}

export default LeftColumn
