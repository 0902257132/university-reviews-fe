import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { NavLink } from "react-router-dom";
import parse from "html-react-parser";

function CardTopic(props) {
  const {
    id,
    title,
    content,
    date,
    like,
    tags,
    user: { username },
  } = props;
  return (
    <div className="group-topic container">
      <div className="row">
        <a href="/" className="col-md-8 group-user ">
          <div className="ava-user">
            <AccountCircleIcon />
          </div>
          <div className="infor-user">
            <p className="title-user">{username}</p>
            <p className="date-topic">{date}</p>
          </div>
        </a>
        <div className="rating-topic col-md-4 ">
          <div className="count-topic">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="far fa-star"></i>
          </div>
          <p className="title-rating-topic">Độ uy tín của Topic</p>
        </div>
      </div>
      <div className="infor-topic">
        <h2 className="title-infor-topic">{title}</h2>
        <p className="content-infor-topic">{parse(`${content}`)}</p>
        <div className="row view-topic">
          <div className="col-md-2">
            <a href="." className="viewMore-topic">
              <NavLink
                to={(location) => {
                  return {
                    pathname: `/topics/${id}/comments`,
                    state: props,
                  };
                }}
              >
                Chi tiết
              </NavLink>
            </a>
          </div>
          <div className="col-md-10 wrap-topic-tag">
            <a href="." className="content-categories-topic">
              {tags}
            </a>
            <a href="." className="content-categories-topic">
              Cơ sở vật chất
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardTopic;
