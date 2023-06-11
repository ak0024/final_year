import "./Home.css";
import {Link} from "react-router-dom"
function Home () {

    return (
        <div className="head">
            <div className="box"  >
                <h1 ><Link to="/login">
                   Teacher
                </Link></h1>                
            </div>
            
            <div className="box">
                <h1><Link to="/studentlogin">
                   Student
                </Link></h1>
            </div>
        </div>
    )
    
}
export default Home;