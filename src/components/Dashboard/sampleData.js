export default function generateExampleData(numberOfResults = 3) {
  let compare_results = [];

  for (let i = 0; i < numberOfResults; i++) {
    const docCompId = i;
    const highNumber = Math.floor(Math.random() * 8000);
    const lowNumber = Math.floor(Math.random() * 2000);
    const resultY = Math.random() > 0.2 ? "yes" : "no";
    const analysisScore = Math.floor(Math.random() * 1000) / 100;
    
    compare_results.push({
      doc_compare_id: `${docCompId}_1`,
      high_level_spec_id: `iso_${highNumber}_195`,
      low_level_spec_id: `SRS${lowNumber}`,
      //epoch time in seconds (unix)
      analysis_timestamp: 1699286271,
      analysis_result: resultY,
      analysis_score: analysisScore,
      result_reason: "result reason N/A",
      result_feedback: "user feedback for IntelliU",
    });
  }
  
  const resultJSON = {
    high_level_spec_name: "60601-1.doc",
    low_level_spec_name: "software_requirements.doc",
    compare_results: compare_results,
  };
  const resultList = resultJSON.compare_results;
  return resultJSON
}
