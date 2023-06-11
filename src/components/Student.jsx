import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./students.css"

export default function Student({ para, handleLogout }) {
  const id = para;
  const [res, setRes] = useState(null);
  const [navigateToEditor, setNavigateToEditor] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/api/getqp", {
          id: id,
        });
        setRes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  useEffect(()=>{
    console.log(res)
  },[res])

  const handleButtonClick = (e) => {
    setNavigateToEditor(true);
    localStorage.setItem("currenttest",e.target.id)
  };

  useEffect(() => {
    if (navigateToEditor && res) {
      localStorage.setItem("resObj", JSON.stringify(res));
      localStorage.setItem("testid",JSON.stringify(id))
      navigate(`/editor/${id}`);
    }
  }, [navigate, navigateToEditor, id, res]);

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/studentlogin");
  };

  return (
    <div>
      {id} ashok

      <div>
        <button onClick={handleLogoutClick}>Logout</button>

        {res === null ? (
          <p>Loading...</p>
        ) : (
          <>
            <table>
              <tbody>
                {res.questions!=="" && res.questions.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.title}</td>
                    <td>
                      <input
                        type="button"
                        id={row.id}
                        value="start test"
                        onClick={handleButtonClick}
                      />
                    </td>
                  </tr>
                ))}               
              </tbody>
            </table>
            {res.questions==="" && <><h1>You have no test today</h1>{localStorage.setItem("resObj", null)}</>}
          </>
        )}
      </div>
    </div>
  );
}
