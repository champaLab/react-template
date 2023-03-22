import React, { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loading from './components/Loading'
import Default from './layouts/Default'
import { storeRefresh } from './store/features/auth'
import { useMeMutation } from './store/services/userApi'


const App = () => {
  const [onFresh] = useMeMutation()
  const token = localStorage.getItem(import.meta.env.VITE_APP_LOCAL_STORAGE)
  const dispatch = useDispatch()

  async function handleFresh() {
    // @ts-ignore
    const { data } = await onFresh({})
    if (data.status == "success") {
      dispatch(storeRefresh({ ...data.user }))
    }
  }

  useEffect(() => {
    token && handleFresh()
  }, [])
  return (
    <BrowserRouter basename='/'>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='*' element={<Default />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App