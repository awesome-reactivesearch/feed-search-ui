import "./App.css";
import {
  ReactiveBase,
  ReactiveList,
  ResultCard,
  SearchBox,
  SelectedFilters,
} from "@appbaseio/reactivesearch";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import TagSelector from "./TagSelector";

import styles from "./App.module.css";

function App() {
  const [options, setOptions] = useState(["Comedy"]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (options) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [options]);

  return (
    <>
      <Navbar />
      <ReactiveBase
        endpoint={{
          url: "https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io/query-rules-boost-static",
          method: "POST",
        }}
        reactivesearchAPIConfig={{
          recordAnalytics: false,
          userId: "jon",
        }}
        transformRequest={(req) => {
          const body = JSON.parse(req.body);
          body.customData = options;
          const newReq = { ...req, body: JSON.stringify(body) };
          return newReq;
        }}
      >
        <div className="row mt-4 p-3">
          <SearchBox
            dataField={["original_title"]}
            componentId="BookSensor"
            highlight
            URLParams
            size={5}
            enablePredictiveSuggestions
            showClear
            renderNoSuggestion={() => "No suggestions found."}
          />

          <SelectedFilters />
          <ReactiveList
            componentId="SearchResult"
            dataField="original_title"
            size={12}
            className="result-list-container"
            pagination
            react={{
              and: "BookSensor",
            }}
            render={({ data }) =>
              data && data.length ? (
                <ReactiveList.ResultCardsWrapper>
                  {data.map((item) => (
                    <ResultCard id={item._id} key={item._id}>
                      <ResultCard.Image
                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                      />
                      <ResultCard.Title>
                        <div
                          className="book-title"
                          dangerouslySetInnerHTML={{
                            __html: item.original_title,
                          }}
                        />
                      </ResultCard.Title>

                      <ResultCard.Description>
                        <div className="flex column justify-space-between">
                          <div>
                            <div>{item.genres && item.genres.join(", ")}</div>
                            <div className="ratings-list flex align-center">
                              <span className="stars">
                                <i className="fas fa-star" />
                                {item.vote_average}
                              </span>
                              <span className="avg-rating">
                                ({item.average_rating} avg)
                              </span>
                            </div>
                          </div>
                          <span className="pub-year">{item.release_year}</span>
                        </div>
                      </ResultCard.Description>
                    </ResultCard>
                  ))}
                </ReactiveList.ResultCardsWrapper>
              ) : (
                "Loading Results..."
              )
            }
          />
        </div>
      </ReactiveBase>
    </>
  );
}

export default App;
