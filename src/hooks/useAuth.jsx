import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../Store/authSlice";

function useAuth() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const logout = () => dispatch(logoutAction());

  return { user, logout };
}

export default useAuth;
