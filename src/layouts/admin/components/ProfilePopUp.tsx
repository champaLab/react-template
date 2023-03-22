import React, { useState } from "react";
import WarningIcon from "@mui/icons-material/Warning";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Modal,
  InputAdornment,
  Grid,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  AccountCircle,
  Logout,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUpdateMyProfileMutation } from "../../../store/services/userApi";
import { RootState } from "../../../store";
import { storeLogout } from "../../../store/features/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "600px",
  bgcolor: "background.paper",
  border: "0",
  boxShadow: 24,
  p: 4,
};
const popUpStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "400px",
  bgcolor: "background.paper",
  border: "0",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};
const userState = {
  id: 0,
  username: "",
  password: "",
  c_password: "",
  updated_at: new Date().toJSON(),
};


export type IUser = {
  id: number
  username: string | null
  password: string | null
  c_password: string | null
  updated_at: string
}
export default function ProfilePopup() {
  const { auth } = useSelector((state: RootState) => ({ ...state }));
  const [updateUser] = useUpdateMyProfileMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<IUser>(userState);
  const [check, setCheck] = useState(false);
  const [changePwd, setChangePwd] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpen = async () => {
    setUser({
      ...user,
      id: auth.id,
      username: auth?.username,
      password: "",
      c_password: "",
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleClosePopup = () => setOpenPopup(false);

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value.trim() });
  };

  const handleChangePwd = () => {
    setChangePwd(!changePwd);
    setUser({
      ...user,
      password: "",
      c_password: "",
    });
  };

  const handleOpenPopup = (e: any) => {
    e.preventDefault();
    handleClose();
    setUser({ ...user, [e.target.name]: e.target.value });
    setOpenPopup(true);
  };

  const logout = () => {
    dispatch(storeLogout());
    navigate("/");
  };

  const handleYes = () => {
    setOpenPopup(false);
    handleClose();
    handleUpdate();
    setChangePwd(changePwd);
    logout();
  };

  const handleUpdate = async () => {
    if (!changePwd) {
      if (user.password !== user.c_password) {
        return toast.error("Password and Confirm Password is not match", {
          position: "bottom-center",
        });
      } else if (user.password && user.password?.length < 8) {
        return toast.error("Password is require at least 8 characters", {
          position: "bottom-center",
        });
      } else {
        await updateUser(user);
        handleClose();
      }
    } else {
      await updateUser(user);
      handleClose();
    }
  };

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccountCircle />
          <Typography
            component="span"
            textAlign="center"
            onClick={handleOpen}
          >
            ຂໍ້ມູນບັນຊີ
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
          onClick={() => logout()}
        >
          <Logout />
          <Typography component="span" textAlign="center">
            ອອກຈາກລະບົບ
          </Typography>
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <form onSubmit={handleOpenPopup}>
          <Box sx={style}>
            <Typography sx={{ mb: "1rem" }} variant="h4">
              ຂໍ້ມູນບັນຊີ
            </Typography>
            <Box>
              <TextField
                sx={{ mb: 1 }}
                fullWidth
                variant="standard"
                error={!user.username}
                id="username"
                label="ຊື່ຜູ້ໃຊ້ງານ"
                name="username"
                value={user.username}
                onChange={handleChange}

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              {!user.username ? (
                <Box component="span"
                  sx={{
                    color: "#df5000",
                    fontSize: "14px",
                    fontWeight: 100,
                    mb: 2,
                  }}
                >
                  ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ
                </Box>
              ) : null}

              <Grid container columnSpacing={2}>
                {!changePwd ? (
                  <>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        fullWidth
                        variant="standard"
                        type={check ? "text" : "password"}
                        error={
                          !changePwd && !user.password ? true : false
                        }
                        id="password"
                        label="ລະຫັດຜ່ານ"
                        name="password"
                        onChange={handleChange}
                        disabled={changePwd ? true : false}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setCheck(!check)}
                              >
                                {check ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {!changePwd && !user.password ? (
                        <Box component="span"
                          sx={{
                            color: "#df5000",
                            fontSize: "5px",
                            fontWeight: 100,
                            mb: 2,
                          }}
                        >
                          ກະລຸນາປ້ອນລະຫັດຜ່ານ
                        </Box>
                      ) : (
                        <></>
                      )}
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        fullWidth
                        variant="standard"
                        type={check ? "text" : "password"}
                        error={
                          !changePwd && user.c_password && user.c_password.length < 1
                            ? true
                            : false
                        }
                        id="c_password"
                        label="ຢັນຢັນ ລະຫັດຜ່ານ"
                        name="c_password"
                        onChange={handleChange}
                        disabled={changePwd ? true : false}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setCheck(!check)}
                              >
                                {check ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {!changePwd && user.password && user.password.length < 1 ? (
                        <Box component='span'
                          sx={{
                            color: "#df5000",
                            fontSize: "5px",
                            fontWeight: 100,
                            mb: 2,
                          }}
                        >
                          ກະລຸນາ ຢັນຢັນ ລະຫັດຜ່ານ
                        </Box>
                      ) : (
                        <></>
                      )}
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
                <Grid item xs={12} sm={12} mt={2}>
                  <FormGroup onChange={handleChangePwd}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="ປ່ຽນລະຫັດຜ່ານ"
                      sx={{ color: "#777777" }}
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "100%", mt: 2 }}
              disabled={!user.username}
            >
              Update Profile
            </Button>
          </Box>
        </form>
      </Modal>
      <Modal
        open={openPopup}
        onClose={handleClosePopup}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={popUpStyle}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            <WarningIcon color="warning" fontSize="large" />
          </Typography>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Warning
          </Typography>
          <span>
            If you change your profile. The Application will logged out
          </span>
          <Stack
            sx={{ mt: 2, justifyContent: "center" }}
            spacing={2}
            direction="row"
          >
            <Button variant="outlined" onClick={handleClosePopup}>
              No
            </Button>
            <Button variant="contained" onClick={handleYes}>
              Yes
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
