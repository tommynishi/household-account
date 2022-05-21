import { useNavigate } from 'react-router-dom';
export const useAuth = () => {
  
  const navigate = useNavigate();

  const login = (userId: string) => {
    if(userId === "ank1988"){
      navigate("/household");
    } else {
      alert({title: "ユーザが見つかりません", status: "error"})
    }
  }
  return {login};
}