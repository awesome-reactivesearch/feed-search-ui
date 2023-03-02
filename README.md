# Feed search UI

An app to search for you favorite movies while also customizing the feed with your favorite topics.

## Creating a pipeline

We would first need to create a pipeline using [Reactivesearch's dashboard](https://www.reactivesearch.io/). The basic template looks like something like below. You can configure your own index.

```json
{
  "enabled": true,
  "description": "Boost by topics",
  "routes": [
    {
      "path": "/query-rules-boost",
      "method": "POST",
      "classify": {
        "category": "reactivesearch"
      }
    }
  ],
  "envs": {
    "index": ["[your-favorite-index]"]
  },
  "stages": [
    {
      "id": "auth",
      "use": "authorization"
    },
    {
      "id": "query",
      "use": "reactivesearchQuery",
      "continueOnError": false
    },
    {
      "id": "es_query",
      "use": "elasticsearchQuery",
      "continueOnError": false
    }
  ]
}
```

To promote some of the categories selected by the users dynamically we need to configure some additional stages.

```json
{
  "stages": [
    {
      "id": "boost-category",
      "use": "boost",
      "continueOnError": false,
      "inputs": {
        "dataField": "genres_data",
        "value": ["Comedy"],
        "boostType": "score",
        "boostMaxDocs": 3
      }
    }
  ]
}
```

But we need to pass the category from the frontend. For that we have to configure a script which would get data from the pipeline.

```js
function handleRequest() {
  // We can access the request below
  const requestBody = JSON.parse(context.request.body);

  return {
    additionalParams: {
      param: requestBody.customData,
    },
  };
}
```

We can then add it inside the stage as below.

```json
{
  "stages": [
    {
      "id": "addPromoteParams",
      "scriptRef": "promoteParams.js"
    }
  ]
}
```

We can then use the configured parameter in our stage as below.

```json
{
  "stages": [
    {
      "id": "boostOne",
      "use": "boost",
      "continueOnError": false,
      "inputs": {
        "dataField": "genres_data",
        "value": ["{{additionalParams.param}}"],
        "boostType": "score",
        "boostMaxDocs": 3
      }
    }
  ]
}
```

## Build Locally

Clone this repo and do the following steps.

```sh
yarn
yarn start
```
