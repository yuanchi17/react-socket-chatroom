import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'

const Login = () => {
  const dispatch = useDispatch()
  const { socket } = useSelector((state) => state)
  const [page, setPage] = useState('name')
  const [user, setUser] = useState({
    img: '',
    intro: '',
    name: '',
  })
  const imgs = ['yCC8VdH', 'Xee8Yda', 'ZelpWqC', 'ysk042a']

  const btnName = () => {
    console.log(user)
    if (!user.name || !user.img) return
    console.log('done')
    setPage('intro')
  }

  const btnLogin = () => {
    if (!user) return
    dispatch({ type: 'USER_LOGIN', payload: { ...user, id: socket.id } })
  }

  return (
    <div>
      <h2 className="mb-3">即時聊天室</h2>
      {imgs.map(img => {
        if (user.img === img) {
          return (<button className="btn btn-img m-2 p-0 select-img" key={img} onClick={() => setUser({ ...user, img })}>
            <img className="w-100 rounded" src={`https://i.imgur.com/${img}.png`}></img>
          </button>)
        }
        return (<button className="btn btn-img m-2 p-0" key={img} onClick={() => setUser({ ...user, img })}>
          <img className="w-100 rounded" src={`https://i.imgur.com/${img}.png`}></img>
        </button>)
      })}
      <form
        className="input-area my-2"
        onSubmit={(e) => {
          e.preventDefault()
          btnName()
        }}
      >
        <div className="input-group flex-nowrap">
          <input
            autoFocus
            className="form-control m-1"
            placeholder="請輸入暱稱"
            type="text"
            value={user.name}
            maxLength="20"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          ></input>
        </div>
      </form>
      {page === 'name'
        ? (<></>)
        : (<form
          className="input-area"
          onSubmit={(e) => {
            e.preventDefault()
            btnLogin()
          }}>
          <div className="input-group flex-nowrap">
            <input
              autoFocus
              className="form-control m-1"
              placeholder={`Hi ${user.name}，介紹一下自己吧 :D`}
              type="text"
              value={user.intro}
              onChange={(e) => setUser({ ...user, intro: e.target.value })}
            ></input>
          </div>
        </form>)}
    </div>
  )
}

export default Login
