import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

const connector = new ElasticsearchAPIConnector({
  // Either specify the cloud id or host to connect to elasticsearch
  cloud: {
    id: "<elastic-cloud-id>" // cloud id found under your cloud deployment overview page
  },
  host: "http://localhost:9200", // host url for the Elasticsearch instance
  index: "<index-name>", // index name where the search documents are contained
  apiKey: "<api-key>", // Optional. apiKey used to authorize a connection to Elasticsearch instance.
  // This key will be visible to everyone so ensure its setup with restricted privileges.
  // See Authentication section for more details.
  connectionOptions: {
    // Optional connection options.
    headers: {
      "x-custom-header": "value" // Optional. Specify custom headers to send with the request
    }
  }
});