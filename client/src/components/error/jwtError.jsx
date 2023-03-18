import { useNavigate } from "react-router-dom";

export default function JwtError(data){
    const navigate = useNavigate();
    if(data === "Authentication error: jwt expired"){
        navigate("/");
        return;
    }
}