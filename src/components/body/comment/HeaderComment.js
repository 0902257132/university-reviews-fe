import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useMutation } from "@apollo/client";
//importing local file
import { topicMutation } from "query/topic";
import { topicQuery } from "query/topic";
import DialogUpdate from "./DialogUpdate";
import { myParseDate } from "components/helper/parse";
import { userProfileQueries } from "query/user-profile";
//importing material UI
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import IconButton from "@material-ui/core/IconButton";

function HeaderComment() {
  const history = useHistory();
  const { slug } = useParams();
  const idAuthor = useSelector((state) => state.login.data.id);
  //call api get one topic
  const { data, loading, error } = useQuery(topicQuery.GET_TOPIC, {
    variables: {
      id: slug,
    },
  });
  const contentHeaderComment = !loading && !error && !!data && data.Topic;
  // call api for remove topic
  const [deleteTopic, { data: response }] = useMutation(
    topicMutation.DELTETE_TOPIC
  );
  const handleDelete = () => {
    deleteTopic({
      variables: {
        id: slug,
      },
      refetchQueries: [
        {
          query: topicQuery.GET_ALL_TOPICS,
          variables: {
            id: localStorage["slugUniversity"],
          },
        },
        {
          query: userProfileQueries.GET_PERONAL_TOPIC,
          variables: {
            id: idAuthor,
          },
        },
      ],
    });
  };
  // handle editor topic
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  // Authorization

  const checkAuthor = () => {
    let result = idAuthor === contentHeaderComment.user.id ? "block" : "none";
    return { display: result };
  };

  const [statusLike, setStatusLike] = useState({
    dislike: false,
    like: false,
  });
  const handleDislike = () => {
    setStatusLike({
      ...statusLike,
      dislike: !statusLike.dislike,
      like: statusLike.dislike && false,
    });
  };
  const handleLike = () => {
    setStatusLike({
      ...statusLike,
      like: !statusLike.like,
      dislike: statusLike.like && false,
    });
  };
  useEffect(() => {
    if (!!response)
      history.push(`/topics/${response.deleteTopic.university.id}`);
  }, [data, loading, error, response]);

  return (
    <div>
      {!!contentHeaderComment ? (
        <div>
          <div className="banner-comment">
            {/* header of topic */}
            <div className="container">
              <h2 className="title-banner-comment">
                {contentHeaderComment.title}
              </h2>
              <div className="sub-header-comment row">
                <div className="col-md-3">
                  <a href="." className=" group-user-comment">
                    <div className="float-left">
                      <AccountCircleIcon />
                    </div>

                    <div className="infor-user-comment">
                      <p className="title-user-comment">
                        {contentHeaderComment.user.username}
                      </p>
                      <p className="date-topic-comment">
                        {myParseDate(contentHeaderComment.date)}
                      </p>
                    </div>
                  </a>
                </div>
                <div
                  className="col-md-8 group-btn-header-comment"
                  // style={{
                  //   display:
                  //     contentHeaderComment.user.id !==
                  //       "5f9a40681a488a2238f7dd53" && "none",
                  // }}
                  style={checkAuthor()}
                >
                  {/* start dialog */}
                  <DialogUpdate
                    open={openDialog}
                    onClose={handleClose}
                    data={contentHeaderComment}
                  />
                  {/* end dialog */}
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={handleClickOpen}
                  >
                    Chỉnh sửa
                  </Button>
                  <br />
                  <Button
                    size="small"
                    color="secondary"
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={handleDelete}
                  >
                    Xóa
                  </Button>
                </div>

                <div className="col-md-1 group-like-comment">
                  <IconButton onClick={handleDislike}>
                    <ThumbDownAltOutlinedIcon
                      style={{ color: statusLike.dislike ? "red" : "white" }}
                    />
                  </IconButton>
                  <IconButton onClick={handleLike}>
                    <ThumbUpOutlinedIcon
                      style={{ color: statusLike.like ? "red" : "white" }}
                    />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
          {/* content of topic */}
          <div className="container news-comment ">
            <p className="content-comment">
              {parse(`${contentHeaderComment.content}`)}
            </p>
            <Chip
              label={contentHeaderComment.tags}
              icon={<DoneIcon />}
              clickable
              size="small"
              variant="outlined"
              className=""
            />
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}

export default HeaderComment;
