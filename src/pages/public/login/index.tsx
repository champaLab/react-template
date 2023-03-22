import { Box, Button, Checkbox, CircularProgress, FormControlLabel, TextField, Typography, } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../store'
import { useLoginMutation } from '../../../store/services/userApi'
import { storeLogin } from '../../../store/features/auth'
import Toast from '../../../components/Toast'
import { Logout, SupervisedUserCircleOutlined } from '@mui/icons-material'
import { TUser } from '../../../types'


const initial = {
  username: "",
  password: "",
}

const Login = () => {
  const [show, setShow] = useState(false)
  const [user, setUser] = useState<TUser>(initial)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state: RootState) => ({ ...state }));
  const [click, setClick] = useState(false);
  const [onLogin] = useLoginMutation();

  function handleChange(e: any) {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (e.key === "Enter") {
      handleSendLogin(user)
    }
  };

  async function handleSubmit(e: any) {
    e.preventDefault()
    handleSendLogin(user)

    if (e.key === "Enter") {
      handleSendLogin(user)
    }
  };

  async function handleSendLogin(user: TUser) {

    setClick(true);
    const { data }: any = await onLogin(user);
    setClick(false);
    if (data && data.status === "success") {
      dispatch(storeLogin({ ...data.user, token: data.token }));
      setUser(initial)
    } else {
      Toast(data)
    }
  }


  useEffect(() => {
    if (auth && auth.isLogin && auth.role == "Admin") {
      navigate("/app")
    } else if (auth && auth.isLogin) {
      navigate("/app");
    }
  }, [auth, navigate]);


  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: 10,
          borderRadius: 4,
          width: "350px",
        }}>
        <Box sx={{
          p: 3,
          position: "relative",
        }} component="form" onSubmit={handleSubmit}>
          <Box sx={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)" }}>
            <SupervisedUserCircleOutlined sx={{ fontSize: 100, color: '#029a2d', }} />
          </Box>
          <Typography align='center' variant='h5' color="#029a2d" mb={2} mt={11}>3 ZAB</Typography>
          <Box>
            <TextField
              fullWidth
              value={user.username}
              label="ຊື່ຜູ້ໃຊ້ງານ"
              name='username'
              margin='dense'
              onChange={handleChange}
            />
          </Box>

          <Box>
            <TextField
              fullWidth
              value={user.password}
              label="ລະຫັດຜ່ານ"
              name='password'
              margin='dense'
              type={show ? "text" : "password"}
              onChange={handleChange}
            />
          </Box>
          <FormControlLabel onChange={() => setShow(!show)} control={<Checkbox />} label="ສະແດງລະຫັດຜ່ານ" />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box />
            <Button startIcon={<Logout />} disabled={click} type='submit' variant="contained" sx={{ mt: 1 }} fullWidth size="large">
              {click ? <CircularProgress /> : 'ເຂົ້າສູ່ລະບົບ'}
            </Button>
          </Box>

        </Box>
      </Box >

    </Box>
  )
}

export default Login