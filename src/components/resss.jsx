
import React from "react"
export default function Ress({item,result}) {
    return(<div>
{item && result
          .filter((item) => item.testid === test.testid)
          .map((res) =>
            res.student.map((stu) => (
              <tr key={stu.roll}>
                <td>{stu.roll}</td>
                {res.questions.map((anss) => (
                  <React.Fragment key={anss}>
                    {stu.anss ? (
                      <>
                        <td>{anss}</td>
                        <td>{stu.anss}</td>
                      </>
                    ) : (
                      <td>This qp is not attempted</td>
                    )}
                  </React.Fragment>
                ))}
              </tr>
            )))}
    </div>)
    
}