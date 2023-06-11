import React, { useState, useEffect } from "react";
import "./QustionsContainer.css";
import axios from "axios";

const QuestionsContainer = () => {
  const [questions, setQuestions] = useState([]);
  const [testid, settestid] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [testname, settestname] = useState("");
  const [starttime, setstarttime] = useState("");
  const [endtime, setendtime] = useState("");
  const [date, setdate] = useState("");
  const [startroll, setstartroll] = useState("");
  const [endroll, setenroll] = useState("");
  const [activate, setactivate] = useState([]);
  const [result, setresult] = useState([]);
  const [getres,setgetres]=useState("")
  const [tableHeader ,settableheader]=useState()
  const [tableRows,settablerows]=useState()
  useEffect(() => {
    axios
      .get("http://192.168.1.37:5000/api/questions")
      .then((response) => {
        setQuestions(response.data.questions);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });

    axios
      .get("http://192.168.1.37:5000/api/testresult")
      .then((response) => {
        setresult(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching test results:", error);
      });

    axios
      .get("http://192.168.1.37:5000/api/activetest")
      .then((response) => {
        setactivate(response.data.testqp);
      })
      .catch((error) => {
        console.error("Error fetching active tests:", error);
      });
  }, []);

  const handleSaveToJson = async () => {
    if (
      testid.length !== 0 &&
      selectedIds.length !== 0 &&
      testname.length !== 0 &&
      starttime.length !== 0 &&
      endtime.length !== 0 &&
      date.length !== 0 &&
      startroll.length !== 0 &&
      endroll.length !== 0
    ) {
      const newtest = {
        testid: testid,
        questions: selectedIds,
        testname: testname,
        starttime: starttime,
        endtime: endtime,
        date: date,
        startroll: startroll,
        endroll: endroll,
      };

      try {
        await axios.post("http://192.168.1.37:5000/api/addtestqp", newtest);
        axios
          .get("http://192.168.1.37:5000/api/activetest")
          .then((response) => {
            setactivate(response.data.testqp);
          })
          .catch((error) => {
            console.error("Error fetching active tests:", error);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please Fill Up All Fields");
    }
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;

    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  const handleDelete = async (testid) => {
    try {
      await axios.post("http://192.168.1.37:5000/api/deletetestqp", {
        id: testid,
      });
      axios
        .get("http://192.168.1.37:5000/api/activetest")
        .then((response) => {
          setactivate(response.data.testqp);
        })
        .catch((error) => {
          console.error("Error fetching active tests:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const getresult=(value)=>{
    
    const filteredData = result.filter(item => item.testid ===Number(value));
    if (filteredData.length === 0) {
      // No question paper found, return a text message
      settableheader(null);
      settablerows(<p>No One written this test.</p>);
      return;
    }

    console.log(filteredData);
    
    // Store the questions array
    const questionsArray = filteredData[0].questions;

    // Create table header
    const tableHeader1 = (
      <thead>
        <tr>
          <th>Roll</th>
          {questionsArray.map((question, index) => (
            <th key={index}>{question}</th>
          ))}
        </tr>
      </thead>
    );
  
    // Traverse the students array and populate table rows
    const studentsArray = filteredData[0].students;
    const tableRows1 = studentsArray.map((student, studentIndex) => {
      return (
        <tr key={studentIndex}>
          <td>{student.roll}</td>
          {questionsArray.map((question, questionIndex) => {
            const answer = student[question];
            return (
              <td key={questionIndex}>
                {answer ? answer : "Not Answered"}
              </td>
            );
          })}
        </tr>
      );
    });
    settableheader(tableHeader1)
    settablerows(tableRows1)
  }

  return (
    <div className="table-container">
      <h1>Questions</h1>

      <table className="questions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Questions</th>
            <th>Checkbox</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.title}</td>
              <td>
                <input
                  type="checkbox"
                  id={row.id}
                  onClick={handleCheckboxChange}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <p>Selected IDs: {selectedIds.join(", ")}</p>
        <div className="input-container">
          <div className="input-row">
            <div className="input-wrapper">
              <label htmlFor="testid">Test Id:</label>
              <input
                id="testid"
                type="number"
                onChange={(e) => settestid(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="testName">Test Name:</label>
              <input
                id="testName"
                type="text"
                onChange={(e) => settestname(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="starttime">Start time:</label>
              <input
                id="starttime"
                type="time"
                onChange={(e) => setstarttime(e.target.value)}
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-wrapper">
              <label htmlFor="endtime">End time:</label>
              <input
                id="endtime"
                type="time"
                onChange={(e) => setendtime(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="date">Select a date:</label>
              <input
                type="date"
                id="date"
                onChange={(e) => setdate(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="startroll">Start Roll no:</label>
              <input
                id="startroll"
                type="number"
                onChange={(e) => setstartroll(e.target.value)}
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-wrapper">
              <label htmlFor="endroll">End Roll no:</label>
              <input
                id="endroll"
                type="number"
                onChange={(e) => setenroll(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <button onClick={handleSaveToJson}>Activate test</button>
            </div>
          </div>
        </div>
      </div>

      <table className="activate-table">
        <thead>
          <tr>
            <th>Test ID</th>
            <th>Test Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Date</th>
            <th>Start Roll</th>
            <th>End Roll</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {activate.map((test) => (
            <React.Fragment key={test.testid}>
              <tr>
                <td ><a onClick={()=>getresult(test.testid)}>{test.testid}</a></td>
                <td><a onClick={()=>getresult(test.testid)}>{test.testname}</a></td>
                <td>{test.starttime}</td>
                <td>{test.endtime}</td>
                <td>{test.date}</td>
                <td>{test.startroll}</td>
                <td>{test.endroll}</td>
                <td>
                  <button onClick={() => handleDelete(test.testid)}>
                    Delete
                  </button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <input
                id="getres"
                type="test"
                onChange={(e) => setgetres(e.target.value)}
              />
      <button onClick={getresult}>Get Result</button>
      <table>
      {tableHeader}
      <tbody>
        {tableRows}
      </tbody>
    </table>
    </div>
  );
};

export default QuestionsContainer;
