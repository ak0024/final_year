import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { keymap } from "@codemirror/view";
import { sublime } from "@uiw/codemirror-theme-sublime";
import { cppLanguage } from "@codemirror/lang-cpp";
import axios from "axios";
import { json } from "react-router";

const CodeEditor = ({ selectedLanguage, value, onChange, editable }) => {
  const handleIndentTab = (cm) => {
    const spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
    cm.replaceSelection(spaces);
  };

  const extensions = [keymap.of([handleIndentTab]), cppLanguage];
  const [code, setCode] = useState("");
  const [obj, setObj] = useState(null);

  const containerStyle = {
    display: "flex",
    margin: "10px",
    width
    :"100%",
  };

  const divisionStyle = {
    flex: "1",
    border: "1px solid black",
    padding: "10px",
    margin: "5px",
    overflowY: "scroll",
    height: "calc(100vh - 160px)",

  };

  const codemirrorStyle = {
    flex: "1",
    border: "1px solid black",
    padding: "10px",
    margin: "5px",
  };

  const editorHeight = "calc(100vh - 160px)";

  const sendCode = async () => {
    const questiond=JSON.parse(localStorage.getItem("resObj"))
    const rollno=JSON.parse(localStorage.getItem("studentId"))
    const data = { "qpid": localStorage.getItem("currenttest"),
                    "qpd":questiond.questions,
                    "testd":questiond.testdetails,
                    "rollno":rollno,
                    "code":code
   };
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/execute",
        data
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const resObj = localStorage.getItem("resObj");
    if (resObj!==null) {
      setObj(JSON.parse(resObj));
      console.log(obj)
    }
    
  }, []);

  return (
    
    <>
    
    {obj!==null && <button id ="execute_submit" style={{ margin: "auto" }} onClick={sendCode}>Submit</button>}
      <div className="container1" style={containerStyle}>
        
      {obj!==null?
      <>
        <div className="division" style={divisionStyle}>
          <h1>{obj?.questions[0].title}</h1>
          <div class="question-prompt">
 
  <div class="question-description">
    <h3>Qp description:</h3>
    <p>
    {obj?.questions[0].desc}
    </p>
    <h3>Input Format</h3>
    
    <h3>Sample Input</h3>
    <pre>
      3
      16
      13
      7
      1
      2
    </pre>
    <h3>Sample Output/Output format</h3>
    <p>The initial linked list is 16 - 13 - 7. Insert 1 at the position 2 which currently has 7 in it. The updated linked list is 16 - 13 - 1 - 7.</p>
  </div>
</div>

        </div>

        <CodeMirror
          style={codemirrorStyle}
          value={obj?.questions[0].value}
          extensions={extensions}
          theme={sublime}
          onChange={(value) => setCode(value)}
          height={editorHeight}
          editable={editable}
        /></>
        :<h1>You have no test today</h1>}
      </div>
      
      
    </>
  );
};

export default CodeEditor;
