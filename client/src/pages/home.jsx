import { useState, useEffect } from "react";
import '../styles/style.scss';
import ChackCookie from '../components/chackCookie';
import AddTodo from "../components/addTodo";
import GetTodo from '../components/getTodo';
import DeleteTodo from "../components/deletData";
import EditTodo from "../components/editTodo";
import { useNavigate } from "react-router-dom";

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
                return;
            }
        };

        todo();
    }, [navigate, res, error]);

    
    const handleCheckboxChange = async (event) => { 
        const id = event.target.value;
        try{
            const response = await DeleteTodo(id);
            const data = await response.json();
            return;
        }catch (error) {
            console.log(error);
            return;
        }
    }

    const onChangeInput = async (event, todoid) => { 
        try {
          const newValue = event.target.value;
          console.log(newValue);
          const response = await EditTodo(newValue, todoid); // Pass newValue and todoid to EditTodo
          const data = await response.json();
          console.log("Data updated:", data); // Log the updated data to the console
        } catch (error) {
          console.log(error);
        }
    }

    if(res === "Authentication error: jwt expired"){
        navigate("/");
    }

    return(
        error ? 
            <div>
                <AddTodo></AddTodo>

                {res.map((item, index) => (
                    <label key={index} htmlFor="todoCheckbox">
                        <input
                        name="title"
                        defaultValue={item.title}
                        type="text"
                        onChange={(event) => onChangeInput(event, item.todoid)}
                        placeholder="Type title"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        />
                        <input type="checkbox" id="todoCheckbox" value={item.todoid} onChange={handleCheckboxChange}/>
                    </label>
                    
                ))}
            </div>
        : 
        <div>{res}</div>
    );
}