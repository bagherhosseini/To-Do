import { useState, useEffect } from "react";
import '../styles/style.scss';
import ChackCookie from '../components/chackCookie';
import GetTodo from '../components/getTodo';
import DeleteTodo from "../components/deletData";
import { useNavigate, useLocation } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();
    const [res, setRes] = useState([]);
    const [error, setError] = useState('false');

    ChackCookie();

    useEffect(() => {
        async function todo(){
            try{
                const response = await GetTodo();
                const data = await response.json();
                setRes(data);
                setError(response.ok);
                return;
            }catch (error) {
                setError(false);
                setRes(error.message);
                console.log(error);
                if(res = "Authentication error: jwt expired"){
                    navigate("/");
                }
                return;
            }
        };

        todo();
    }, [navigate, res, error]);

    
  const handleInputChange = async (event) => { 
    const id = event.target.value;
    try{
        const response = await DeleteTodo(id);
        const data = await response.json();
        console.log(data);
        return;
    }catch (error) {
        console.log(error);
        return;
    }
    
  }

    return(
        error ? 
            <div>
                {res.map((item, index) => (
                    <label key={index} htmlFor="todoCheckbox">
                        <span>{item.title}</span>
                        <input type="checkbox" id="todoCheckbox" value={item.todoid} onChange={handleInputChange}/>
                    </label>
                    
                ))}
            </div>
        : 
        <div>{res}</div>
    );
}