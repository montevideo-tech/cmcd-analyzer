import React from "react";
import { ReactiveBase, CategorySearch } from '@appbaseio/reactivesearch';

function App() {
  return (
    <ReactiveBase url="http://localhost:9200" app="cmcd-1" credentials="elastic:changeme">
      Hello from ReactiveSearch 👋
      <div style={{ display: "flex", "flexDirection": "row" }}>
      <CategorySearch
        componentId="searchbox"
        dataField="model"
        categoryField="brand.keyword"
        placeholder="Search for cars"
      />
      </div>
    </ReactiveBase>
  );
}

export default App;