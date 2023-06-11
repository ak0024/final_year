import img from "../assets/error.svg";
import styles from "./error.css";
function NoMatch() {
    return(
        <div className="no-match">
            <img style={styles} src={img} alt="error" />
        </div>
    )
    
}
export default NoMatch;