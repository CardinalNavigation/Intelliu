import React from "react";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <p>Info Page</p>
      <table>
        <thead>
          <tr>
            <th>Compare id</th>
            <th>High Level Spec id</th>
            <th>Low Level Spec id</th>
            <th>Time</th>
            <th>result y/n</th>
            <th>Score</th>
            <th>Reason</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {resultList.map((spec) => {
            <tr>
              <td>{spec.doc_compare_id}</td>
              <td>{spec.high_level_spec_id}</td>
              <td>{spec.low_level_spec_id}</td>
              <td>{spec.analysis_timestamp}</td>
              <td>{spec.analysis_result}</td>
              <td>{spec.analysis_score}</td>
              <td>{spec.result_reason}</td>
              <td>{spec.result_feedback}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default InfoPage;

const resultJSON = {
  high_level_spec_name: "60601-1.doc",
  low_level_spec_name: "software_requirements.doc",
  compare_results: [
    {
      doc_compare_id: "1_1",
      high_level_spec_id: "iso_80131_195",
      low_level_spec_id: "SRS3513",
      //epoch time in seconds (unix)
      analysis_timestamp: 1699286271,
      analysis_result: "yes",
      analysis_score: 3.51,
      result_reason: "result reason N/A",
      result_feedback: "user feedback for IntelliU",
    },
    {
      doc_compare_id: "2_1",
      high_level_spec_id: "iso_280131_195",
      low_level_spec_id: "SRS3513",
      //epoch time in seconds (unix)
      analysis_timestamp: 1699286271,
      analysis_result: "yes",
      analysis_score: 6.51,
      result_reason: "result reason N/A",
      result_feedback: "user feedback for IntelliU",
    },
    {
      doc_compare_id: "3_1",
      high_level_spec_id: "iso_380131_195",
      low_level_spec_id: "SRS3513",
      //epoch time in seconds (unix)
      analysis_timestamp: 1699286271,
      analysis_result: "yes",
      analysis_score: 9.51,
      result_reason: "result reason N/A",
      result_feedback: "user feedback for IntelliU",
    },
  ],
};

const resultList = resultJSON.compare_results;
