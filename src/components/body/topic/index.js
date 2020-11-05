import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";

//import Component and local file.
import Categories from "./Categories";
import CardTopic from "./CardTopic";
import Banner from "./Banner";
import { topicQuery } from "query/topic";
import Loading from "common/Loading";
import "./topic.css";
//importing material-ui
import Pagination from "@material-ui/lab/Pagination";

function Index({ location }) {
  const { slug } = useParams();
  let history = useHistory();
  const { data, loading, error } = useQuery(topicQuery.GET_TOPICS, {
    variables: {
      id: slug,
    },
  });
  useEffect(() => {
    //Check current param with array params in data
    if (!location.state) history.push("/notfound");
  }, [data, loading, error]);

  const contentTopic = !loading && !error && !!data && data.allTopics;
  const nameUniversity = !!contentTopic && data.allTopics[0].university.name;
  return (
    <>
      <NavLink
        style={{ display: "none" }}
        to={() => {
          return {
            pathname: `${location.pathname}/comments`,
          };
        }}
      >
        comment
      </NavLink>
      <div className="topic">
        {!!nameUniversity && <Banner name={nameUniversity} />}

        <div className="container">
          <div className="main-topic">
            <div className="row">
              <div className="col-md-8 items-topics">
                {!!contentTopic ? (
                  contentTopic.map((item, index) => (
                    <CardTopic key={index} {...item} />
                  ))
                ) : (
                  <Loading />
                )}
              </div>
              {/* Bar topic right */}
              <div className="col-md-3 group-categories-topic">
                <Categories />
              </div>
              <div className="col-md-8 mb-5 ">
                <div style={{ width: "50%", margin: "auto" }}>
                  <Pagination
                    count={20}
                    color="primary"
                    shape="rounded"
                    variant="outlined"
                    size="medium"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Index;
