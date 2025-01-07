import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Dots, Public } from "../../svg";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { keepReport } from "../function/report";
import { listReports } from "../../Redux/Actions/ReportActions";
import { removeReport } from "../function/report";
import {
  deliverOrder,
  getOrderDetails,
} from "../../Redux/Actions/ReportActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";
import { getReport } from "../../Redux/Actions/ReportActions";
const OrderDetailmain = (props) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { id } = props;
  const dispatch = useDispatch();

  const reportDetails = useSelector((state) => state.reportDetails);
  const { loading, report } = reportDetails;
  const functionkeepReport = async (idReport) => {
    await keepReport(idReport, userInfo.token);
    dispatch(listReports());
    dispatch(getReport(id));
  };
  const functionremoveReport = async (
    idReport,
    postRef,
    commentRef,
    userReportedRef,
    groupReportedRef
  ) => {
    await removeReport(
      idReport,
      postRef,
      commentRef,
      userReportedRef,
      groupReportedRef,
      userInfo.token
    );
    dispatch(listReports());
    dispatch(getReport(id));
  };
  useEffect(() => {
    dispatch(getReport(id));
  }, [dispatch, id]);
  console.log(report);
  return (
    <section className="content-main">
      <div className="content-header">
        <Link to="/reports" className="btn btn-dark text-white">
          Back To Reports
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <span>
                  <i className="far fa-calendar-alt mx-2"></i>
                  <b className="text-white">
                    {moment(report?.createdAt).format("llll")}
                  </b>
                </span>
                <br />
                <small className="text-white mx-3 ">
                  Report ID: {report?._id}
                </small>
              </div>
              {/* <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                <div style={{ maxWidth: "200px" }}>
                  <p>
                    {" "}
                    {report?.st !== null ? (
                      <span className="badge btn-success">{report?.st}</span>
                    ) : (
                      <span className="badge btn-dark">Not action</span>
                    )}
                  </p>
                </div>
              </div> */}
            </div>
          </header>
          <div className="card-body">
            {/* Order info */}
            {/* <OrderDetailInfo order={report} /> */}

            <div className="row">
              <div className="col-lg-8">
                <div
                  className="table-responsive"
                  style={{ minHeight: "600px" }}
                >
                  {report?.userReportedRef ? (
                    <>
                      <div style={{display:"flex"}}>
                        <p>
                          <Link
                            to={`/profile/${report.userRef._id}`}
                            className="hover6"
                          >
                            {report.userRef.first_name}{" "}
                            {report.userRef.last_name}{" "}
                          </Link>

                          <span style={{ fontWeight: "300" }}>
                            {" "}
                            reported this group for
                          </span>

                          <span style={{ fontWeight: "400" }}>
                            {" "}
                            "{report?.type}".
                          </span>
                        </p>
                      </div>
                      <div className="profile_cover">
                        {report?.userReportedRef?.cover && (
                          <img
                            src={report?.userReportedRef?.cover}
                            className="cover"
                            alt=""
                          />
                        )}
                      </div>
                      <div className="profile_img_wrap">
                        <div className="profile_w_left">
                          <div className="profile_w_img">
                            <div
                              className="profile_w_bg"
                              style={{
                                backgroundSize: "cover",
                                backgroundImage: `url(${report?.userReportedRef?.picture})`,
                              }}
                            ></div>
                          </div>
                          <div className="profile_w_col">
                            <div className="profile_name">
                              {report?.userReportedRef?.first_name}{" "}
                              {report?.userReportedRef?.last_name}
                              <div className="othername">
                                {report?.userReportedRef?.details?.othername &&
                                  `(${report?.userReportedRef?.details?.othername})`}
                              </div>
                            </div>
                            <div className="profile_friend_count">
                              {report?.userReportedRef?.friends && (
                                <div className="profile_card_count">
                                  {report?.userReportedRef?.friends.length === 0
                                    ? ""
                                    : report?.userReportedRef?.friends
                                        .length === 1
                                    ? "1 Friend"
                                    : `${report?.userReportedRef?.friends.length} Friends`}
                                </div>
                              )}
                            </div>
                            <div className="profile_friend_imgs">
                              {report?.userReportedRef?.friends &&
                                report?.userReportedRef?.friends
                                  .slice(0, 6)
                                  .map((friend, i) => (
                                    <Link to={`/profile/${friend._id}`} key={i}>
                                      <img
                                        src={friend.picture}
                                        alt=""
                                        style={{
                                          transform: `translateX(${-i * 7}px)`,
                                          zIndex: `${i}`,
                                        }}
                                      />
                                    </Link>
                                  ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : report?.groupReportedRef ? (
                    <>
                      {" "}
                      <div>
                        <p>
                          <Link
                            to={`/profile/${report.userRef._id}`}
                            className="hover6"
                          >
                            {report.userRef.first_name}{" "}
                            {report.userRef.last_name}{" "}
                          </Link>

                          <span style={{ fontWeight: "300" }}>
                            {" "}
                            reported this group for
                          </span>

                          <span style={{ fontWeight: "400" }}>
                            {" "}
                            "{report?.type}".
                          </span>
                        </p>
                      </div>
                      <div className="pagegroup_cover">
                        {report?.groupReportedRef?.cover && (
                          <img
                            src={report?.groupReportedRef?.cover}
                            className="cover"
                            alt=""
                          />
                        )}
                      </div>
                      <div className="pagegroupe_w_col">
                        <div className="pagegroupe_name">
                          {report?.groupReportedRef?.group_name}
                        </div>
                        <div className="pagegroupe_friend_imgs">
                          {!report?.groupReportedRef?.public || (
                            <>
                              {" "}
                              {report?.groupReportedRef?.members &&
                                report?.groupReportedRef?.members
                                  .slice(0, 20)
                                  .map((user, i) => (
                                    <Link
                                      to={`/profile/${user.user._id}`}
                                      key={i}
                                    >
                                      <img
                                        src={user.user.picture}
                                        alt=""
                                        style={{
                                          transform: `translateX(${-i * 7}px)`,
                                          zIndex: `${i}`,
                                        }}
                                      />
                                    </Link>
                                  ))}
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="profile_card" style={{ width: "700px" }}>
                        <div  >
                          <p>
                            <Link
                              to={`/profile/${report.userRef._id}`}
                              className="hover6"
                            >
                              {report.userRef.first_name}{" "}
                              {report.userRef.last_name}{" "}
                            </Link>
                            {report.postRef && !report.commentRef && (
                              <>
                                {" "}
                                <span style={{ fontWeight: "300" }}>
                                  {" "}
                                  reported this post for
                                </span>
                              </>
                            )}
                            {report.commentRef && (
                              <>
                                {" "}
                                <span style={{ fontWeight: "300" }}>
                                  {" "}
                                  reported this comment on
                                </span>
                                <div className="hover6">
                                  {" "}
                                  {report.userRef.first_name}'s Post
                                </div>
                                <span style={{ fontWeight: "300" }}> for</span>
                              </>
                            )}
                            <span style={{ fontWeight: "400" }}>
                              {" "}
                              "{report.type}".
                            </span>
                          </p>
                        </div>
                        <div className="mmenu_splitter"></div>
                        {report.postRef && !report.commentRef && (
                          <>
                            <div className="posts">
                              <div className="post">
                                <div
                                  className="post_header"
                                  id={`post-${report.postRef._id}`}
                                >
                                  <div className="post_header_left">
                                    <Link
                                      to={`/profile/${report.postRef.user._id}`}
                                    >
                                      <img
                                        src={report.postRef.user.picture}
                                        alt=""
                                      />
                                    </Link>

                                    <div className="header_col">
                                      <div className="post_profile_name">
                                        <>
                                          <Link
                                            to={`/profile/${report.postRef.user._id}`}
                                            className="hover6"
                                          >
                                            {report.postRef.user.first_name}{" "}
                                            {report.postRef.user.last_name}
                                          </Link>
                                        </>

                                        <div className="updated_p">
                                          {report.postRef.type ==
                                            "profilePicture" &&
                                            `updated ${
                                              report.postRef.user.gender ===
                                              "male"
                                                ? "his"
                                                : "her"
                                            } profile picture`}
                                          {report.postRef.type ==
                                            "coverPicture" &&
                                            `updated ${
                                              report.postRef.user.gender ===
                                              "male"
                                                ? "his"
                                                : "her"
                                            } cover picture`}
                                          {report.postRef.type ==
                                            "coverPictureGroup" &&
                                            `updated the group cover photo.`}
                                        </div>
                                      </div>
                                      <div className="post_profile_privacy_date">
                                        <Moment fromNow interval={30}>
                                          {report?.postRef.createdAt}
                                        </Moment>
                                        . <Public color="#828387" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="post_header_right hover1">
                                    <Dots color="#828387" />
                                  </div>
                                </div>
                                {report.postRef.background ? (
                                  <div
                                    className="post_bg"
                                    style={{
                                      backgroundImage: `url(${report.postRef.background})`,
                                    }}
                                  >
                                    <div className="post_bg_text">
                                      {report.postRef.text}
                                    </div>
                                  </div>
                                ) : report.postRef.type === null ||
                                  report.postRef.type === "group" ? (
                                  <>
                                    <div className="post_text">
                                      {report.postRef.text}
                                    </div>
                                    {report.postRef.images &&
                                      report.postRef.images.length && (
                                        <div
                                          className={
                                            report.postRef.images.length === 1
                                              ? "grid_1"
                                              : report.postRef.images.length ===
                                                2
                                              ? "grid_2"
                                              : report.postRef.images.length ===
                                                3
                                              ? "grid_3"
                                              : report.postRef.images.length ===
                                                4
                                              ? "grid_4"
                                              : report.postRef.images.length >=
                                                  5 && "grid_5"
                                          }
                                        >
                                          {report.postRef.images
                                            .slice(0, 5)
                                            .map((image, i) => (
                                              <img
                                                src={image.url}
                                                key={i}
                                                alt=""
                                              />

                                              // className={`img-${i}`}
                                            ))}
                                          {report.postRef.images.length > 5 && (
                                            <div className="more-pics-shadow">
                                              +
                                              {report.postRef.images.length - 5}
                                            </div>
                                          )}
                                        </div>
                                      )}
                                  </>
                                ) : report.postRef.type === "profilePicture" ? (
                                  <div className="post_profile_wrap">
                                    <div className="post_updated_bg">
                                      <img
                                        src={report.postRef.user.cover}
                                        alt=""
                                      />
                                    </div>
                                    <img
                                      src={report.postRef.images[0].url}
                                      alt=""
                                      className="post_updated_picture"
                                    />
                                  </div>
                                ) : (
                                  <div
                                    className="post_cover_wrap"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <img
                                      src={report.postRef.images[0].url}
                                      alt=""
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                        {report.commentRef && (
                          <>
                            <div
                              className="comment"
                              style={{
                                marginBottom: "10px",
                                marginTop: "10px",
                              }}
                            >
                              <Link
                                to={`/profile/${report.commentRef.commentBy._id}`}
                              >
                                <img
                                  src={report.commentRef.commentBy.picture}
                                  alt=""
                                  className="comment_img"
                                />
                              </Link>
                              <div className="comment_col">
                                <div className="comment_react_wrap">
                                  <div className="comment_wrap">
                                    <Link
                                      to={`/profile/${report.commentRef.commentBy._id}`}
                                    >
                                      <div className="comment_name hover6">
                                        <b>
                                          {
                                            report.commentRef.commentBy
                                              .first_name
                                          }{" "}
                                          {
                                            report.commentRef.commentBy
                                              .last_name
                                          }
                                        </b>
                                      </div>
                                    </Link>
                                    <div className="comment_text">
                                      {report.commentRef.commentRef && (
                                        <Link
                                          to={`/profile/${report.commentRef.commentRef.commentBy._id}`}
                                          className="hover6"
                                        >
                                          <b>
                                            {
                                              report.commentRef.commentRef
                                                .commentBy.first_name
                                            }{" "}
                                            {
                                              report.commentRef.commentRef
                                                .commentBy.last_name
                                            }
                                          </b>
                                        </Link>
                                      )}{" "}
                                      {report.commentRef.comment}
                                    </div>
                                  </div>

                                  {/* {!report.commentRef.image && (
                      <div className="reacts_count_comment">
                        <div className="reacts_count_imgs">
                          {reacts &&
                            reacts
                              .sort((a, b) => {
                                return b.count - a.count;
                              })
                              .slice(0, 3)
                              .map(
                                (react, i) =>
                                  react.count > 0 && (
                                    <img
                                      style={{
                                        position: "relative",
                                        right: `${i * 2}px`,
                                      }}
                                      src={`../../../reacts/${react.react}.svg`}
                                      alt=""
                                      key={i}
                                      onClick={() =>
                                        setVisibleReactComment(
                                          comment._id,
                                          user.token
                                        )
                                      }
                                    />
                                  )
                              )}
                        </div>
                        <div className="reacts_count_num">
                          {total > 1 && total}
                        </div>
                      </div>
                    )} */}
                                </div>

                                {report.commentRef.image && (
                                  <>
                                    <div className="comment_react_wrap">
                                      <div className="img_wrap">
                                        <img
                                          src={report.commentRef.image}
                                          alt=""
                                          className="comment_image"
                                        />
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </>
                        )}

                        {/* <div className="mmenu_splitter"></div>
                        <div className="menu_button_report">
                          <div
                            className="gray_btn"
                            style={{ width: "330px" }}
                            // onClick={() => functionkeepReport(report._id)}
                          >
                            <span>Keep</span>
                          </div>

                          <div
                            className="gray_btn"
                            style={{ width: "330px" }}
                            // onClick={() =>
                            //   report.commentRef
                            //     ? functionremoveReport(
                            //         report._id,
                            //         null,
                            //         report.commentRef._id
                            //       )
                            //     : functionremoveReport(
                            //         report._id,
                            //         report.postRef._id,
                            //         null
                            //       )
                            // }
                          >
                            <span>Remove</span>
                          </div>
                        </div> */}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="col-lg-5" style={{ display: "contents" }}>
                {report?.st ? (
                  <>
                    {report?.st === "keep" ? (
                      <>
                        {" "}
                        {report?.userReportedRef ? (
                          <>
                            <div
                              className="box shadow-sm bg-light"
                              style={{
                                height: "fit-content",
                                marginTop: "40px",
                                width: "400px",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {" "}
                              <p
                                style={{
                                  color: "#198754",
                                  fontWeight: "500",
                                  fontSize: "20px",
                                }}
                              >
                                THIS PERSONAL PAGE NO PROBLEMS
                              </p>
                            </div>
                          </>
                        ) : report?.groupReportedRef ? (
                          <>
                            <div
                              className="box shadow-sm bg-light"
                              style={{
                                height: "fit-content",
                                marginTop: "40px",
                                width: "400px",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {" "}
                              <p
                                style={{
                                  color: "#198754",
                                  fontWeight: "500",
                                  fontSize: "20px",
                                }}
                              >
                                THIS GROUP PAGE HAS NO PROBLEMS
                              </p>
                            </div>{" "}
                          </>
                        ) : report?.commentRef ? (
                          <>
                            <div
                              className="box shadow-sm bg-light"
                              style={{
                                height: "fit-content",
                                marginTop: "40px",
                                width: "400px",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {" "}
                              <p
                                style={{
                                  color: "#198754",
                                  fontWeight: "500",
                                  fontSize: "20px",
                                }}
                              >
                                THIS COMMENT HAS NO PROBLEMS
                              </p>
                            </div>{" "}
                          </>
                        ) : (
                          <>
                            <div
                              className="box shadow-sm bg-light"
                              style={{
                                height: "fit-content",
                                marginTop: "40px",
                                width: "400px",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {" "}
                              <p
                                style={{
                                  color: "#198754",
                                  fontWeight: "500",
                                  fontSize: "20px",
                                }}
                              >
                                THIS POST HAS NO PROBLEMS
                              </p>
                            </div>{" "}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {" "}
                        {report?.userReportedRef ? (
                          <>
                            <div
                              className="box shadow-sm bg-light"
                              style={{
                                height: "fit-content",
                                marginTop: "40px",
                                width: "400px",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {" "}
                              <p
                                style={{
                                  color: "#C9303F",
                                  fontWeight: "500",
                                  fontSize: "20px",
                                }}
                              >
                                THIS PERSONAL PAGE IS BANNED
                              </p>
                            </div>
                          </>
                        ) : report?.groupReportedRef ? (
                          <>
                            <div
                              className="box shadow-sm bg-light"
                              style={{
                                height: "fit-content",
                                marginTop: "40px",
                                width: "400px",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {" "}
                              <p
                                style={{
                                  color: "#C9303F",
                                  fontWeight: "500",
                                  fontSize: "20px",
                                }}
                              >
                                THIS GROUP PAGE IS BANNED
                              </p>
                            </div>{" "}
                          </>
                        ) : report?.commentRef ? (
                          <>
                            <div
                              className="box shadow-sm bg-light"
                              style={{
                                height: "fit-content",
                                marginTop: "40px",
                                width: "400px",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {" "}
                              <p
                                style={{
                                  color: "#C9303F",
                                  fontWeight: "500",
                                  fontSize: "20px",
                                }}
                              >
                                THIS COMMENT HAS BEEN DELETED
                              </p>
                            </div>{" "}
                          </>
                        ) : (
                          <>
                            <div
                              className="box shadow-sm bg-light"
                              style={{
                                height: "fit-content",
                                marginTop: "40px",
                                width: "400px",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {" "}
                              <p
                                style={{
                                  color: "#C9303F",
                                  fontWeight: "500",
                                  fontSize: "20px",
                                }}
                              >
                                THIS POST HAS BEEN DELETED
                              </p>
                            </div>{" "}
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {" "}
                    <div
                      className="box shadow-sm bg-light"
                      style={{ height: "fit-content", marginTop: "40px" }}
                    >
                      {/* {loadingDelivered && <Loading />} */}
                      <button
                        onClick={() => functionkeepReport(report?._id)}
                        className="btn btn-success col-12"
                      >
                        NO PROBLEM
                      </button>
                    </div>
                    <div
                      className="box shadow-sm bg-light"
                      style={{
                        marginLeft: "20px",
                        height: "fit-content",
                        marginTop: "40px",
                      }}
                    >
                      {report?.userReportedRef ? (
                        <>
                          {/* {loadingDelivered && <Loading />} */}
                          <button
                            // onClick={deliverHandler}
                            className="btn btn-danger col-12"
                            onClick={() =>
                              functionremoveReport(
                                report?._id,
                                report?.postRef?._id,
                                report?.commentRef?._id,
                                report?.userReportedRef?._id,
                                report?.groupReportedRef?._id
                              )
                            }
                          >
                            BAN THE ACCOUNT
                          </button>
                        </>
                      ) : report?.groupReportedRef ? (
                        <>
                          {" "}
                          {/* {loadingDelivered && <Loading />} */}
                          <button
                            // onClick={deliverHandler}
                            className="btn btn-danger col-12"
                            onClick={() =>
                              functionremoveReport(
                                report?._id,
                                report?.postRef?._id,
                                report?.commentRef?._id,
                                report?.userReportedRef?._id,
                                report?.groupReportedRef?._id
                              )
                            }
                          >
                            BAN THE GROUP
                          </button>
                        </>
                      ) : (
                        <>
                          {" "}
                          {/* {loadingDelivered && <Loading />} */}
                          <button
                          onClick={() =>
                            functionremoveReport(
                              report?._id,
                              report?.postRef?._id,
                              report?.commentRef?._id,
                              report?.userReportedRef?._id,
                              report?.groupReportedRef?._id
                            )
                          }
                            className="btn btn-danger col-12"
                          >
                            DELETE
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderDetailmain;
