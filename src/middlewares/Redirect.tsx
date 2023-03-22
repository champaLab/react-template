import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

type Props = {}

const Redirect = (props: Props) => {
  const [counter, setCounter] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((currentCounter) => --currentCounter)
    }, 1000)
    counter === 0 && navigate('/')
    return () => clearInterval(interval)
  }, [counter])
  return <Loading />
}

export default Redirect