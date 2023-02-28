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
  const [options, setOptions] = useState(["Harry Potter"]);
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
      <div className="p-3">
        <div className="row">
          <div className={styles.userPreference}>User Preference:</div>
          <div className="col">
            <TagSelector options={options} setOptions={setOptions} />
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="row mt-4 p-3">Resetting topics...</div>
      ) : (
        <ReactiveBase
          endpoint={{
            url: "https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io/query-rules-boost",
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
              dataField={["original_title", "original_title.search"]}
              componentId="BookSensor"
              highlight
              URLParams
              enablePopularSuggestions
              popularSuggestionsConfig={{
                size: 3,
                minChars: 2,
              }}
              enableRecentSuggestions
              recentSuggestionsConfig={{
                size: 3,
                minChars: 4,
              }}
              size={5}
              enablePredictiveSuggestions
              onData={(props) => {
                // eslint-disable-next-line
                console.log(props);
              }}
              showClear
              onValueSelected={(value, cause) => {
                // eslint-disable-next-line
                console.log(value, cause);
              }}
              renderNoSuggestion="No suggestions found."
            />

            <SelectedFilters />
            <ReactiveList
              componentId="SearchResult"
              dataField="original_title"
              size={10}
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
                        <ResultCard.Image src={item.image} />
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
                              <div>
                                by{" "}
                                <span className="authors-list">
                                  {item.authors}
                                </span>
                              </div>
                              <div className="ratings-list flex align-center">
                                <span className="stars">
                                  {
                                    /* eslint-disable */
                                    Array(item.average_rating_rounded)
                                      .fill("x")
                                      .map((_, index) => (
                                        <i
                                          className="fas fa-star"
                                          key={index}
                                        />
                                      ))
                                    /* eslint-enable */
                                  }
                                </span>
                                <span className="avg-rating">
                                  ({item.average_rating} avg)
                                </span>
                              </div>
                            </div>
                            <span className="pub-year">
                              Pub {item.original_publication_year}
                            </span>
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
      )}
    </>
  );
}

export default App;
