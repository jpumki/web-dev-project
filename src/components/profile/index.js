import React, { useEffect, useState } from "react";
import "./profile.css";
import service from "../../service/service";
import { useParams } from "react-router-dom";
import popcorn from "../../assets/noPosterSmall.png";
const Profile = ({ auth }) => {
  const [profile, setProfile] = useState();
  const [initProfile, setInitProfile] = useState(false);
  const [initUser, setInitUser] = useState(false);
  const [user, setUser] = useState();
  const [follow, setFollow] = useState(false);
  const [followerIndex, setFollowerIndex] = useState();
  const [followingIndex, setFollowingIndex] = useState();
  const { id } = useParams();

  const findProfileById = (id, uid) => {
    service.findProfileById(id).then((profile) => {
      if (profile === null) {
        window.location.href = "/";
      } else {
        setProfile(profile);
        debugger;
        if (profile.followers.length > 0) {
          for (var i = 0; i < profile.followers.length; i++) {
            if (profile.followers[i].id == uid) {
              setFollow(true);
              setFollowerIndex(i);
            }
          }
        }
        setInitProfile(true);
      }
    });
  };

  const findUserById = (uid) => {
    service.findProfileById(uid).then((user) => {
      if (user === null) {
        window.location.href = "/";
      } else {
        setUser(user);
        if (user.followings.length > 0) {
          for (var i = 0; i < user.followings.length; i++) {
            if (user.followings[i].id == id) {
              setFollow(true);
              setFollowingIndex(i);
            }
          }
        }
        setInitUser(true);
      }
    });
  };

  const onClickFollow = () => {
    const newProfile = profile;
    const newFollower = {
      id: user._id,
      name: user.name,
    };
    newProfile.followers.push(newFollower);
    service.handleFollower(newProfile);

    const newUser = user;
    const newFollowing = {
      id: profile._id,
      name: profile.name,
    };
    newUser.followings.push(newFollowing);
    service.handleFollowing(newUser);

    setFollow(true);
  };

  const onClickUnFollow = () => {
    const newProfile = profile;
    newProfile.followers.splice(followerIndex, 1);
    service.handleFollower(newProfile);

    const newUser = user;
    newUser.followings.splice(followingIndex, 1);
    service.handleFollowing(newUser);

    setFollow(false);
  };

  useEffect(() => {
    async function userInfo() {
      await auth.onAuthStateChanged((user) => {
        if (!user) {
          window.location.href = "/";
        } else {
          findUserById(user.uid);
          findProfileById(id, user.uid);
        }
      });
    }
    userInfo();
  }, []);

  return (
    <div style={{ margin: "60px" }}>
      {initProfile && initUser && (
        <>
          {console.log(profile)}
          <div>
            <div className="d-flex align-items-baseline">
              <img
                style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                src={
                  "https://th.bing.com/th/id/R.1abee17234dca9feaf9d0064bf491f6e?rik=Gs1TTKs9hDMyHg&pid=ImgRaw&r=0"
                }
              />
              <spacer /> <spacer />
              <span style={{ fontSize: "20px" }}>{profile.name}</span>
              <img
                style={{ width: "35px", height: "30px", marginLeft: "30px" }}
                src={
                  "https://myhoneypotsjuicy.com/wp-content/uploads/2018/05/video-icon.png"
                }
              />
              <spacer /> <spacer /> Member since {profile.date.substring(0, 4)}
              <div>
                {user._id !== id && (
                  <>
                    {follow ? (
                      <button
                        className="btn btn-danger mb-3 mx-2 d-flex justify-content-center align-items-center"
                        onClick={() => {
                          onClickUnFollow();
                        }}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger mb-3 mx-2 d-flex justify-content-center align-items-center"
                        onClick={() => {
                          onClickFollow();
                        }}
                      >
                        Follow
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div id="container">
            <input id="tab-1" type="radio" name="tab-group" checked="checked" />
            <label htmlFor="tab-1">Followers</label>

            <input id="tab-2" type="radio" name="tab-group" />
            <label htmlFor="tab-2">Followings</label>

            <input id="tab-3" type="radio" name="tab-group" />
            <label htmlFor="tab-3">Favorites</label>

            <div id="content">
              <div id="content-1">
                {profile.followers.length > 0 && (
                  <ul>
                    {profile.followers.map((elem) => {
                      return (
                        <li className="mx-2 w-100 cursor-pointer">
                          <a href={`/profile/${elem.id}`}>
                            <p className="container">
                              <p className="card" style={{ float: "left" }}>
                                <img
                                  style={{
                                    height: "70px",
                                    width: "70px",
                                    borderRadius: "50%",
                                    margin: "auto auto 15px",
                                    display: "block",
                                  }}
                                  src="https://i.pinimg.com/originals/e2/c7/ba/e2c7ba0ef1467ac03b077275e14a9247.jpg"
                                />
                                <p>{elem.name}</p>
                                <p style={{ color: "gray" }}>Profile</p>
                              </p>
                            </p>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div id="content-2">
                {profile.followings.length > 0 && (
                  <ul>
                    {profile.followings.map((elem) => {
                      return (
                        <li className="mx-2 w-100 cursor-pointer">
                          <a href={`/profile/${elem.id}`}>
                            <p className="container">
                              <p className="card" style={{ float: "left" }}>
                                <img
                                  style={{
                                    height: "70px",
                                    width: "70px",
                                    borderRadius: "50%",
                                    margin: "auto auto 15px",
                                    display: "block",
                                  }}
                                  src="https://i.pinimg.com/originals/e2/c7/ba/e2c7ba0ef1467ac03b077275e14a9247.jpg"
                                />
                                <p>{elem.name}</p>
                                <p style={{ color: "gray" }}>Profile</p>
                              </p>
                            </p>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div id="content-3">
                {profile.movieList.length > 0 && (
                  <ul>
                    {profile.movieList.map((elem) => {
                      return (
                        <li className="mx-2 w-100 cursor-pointer">
                          <a
                            href={
                              elem.type === 0
                                ? `/movie/${elem.id}`
                                : `/show/${elem.id}`
                            }
                          >
                            <p className="container">
                              <img
                                style={{
                                  width: "100px",
                                  height: "150px",
                                  borderRadius: "10px",
                                }}
                                src={
                                  elem.img
                                    ? `https://image.tmdb.org/t/p/w300${elem.img}`
                                    : popcorn
                                }
                              />
                              <p>{elem.name}</p>
                              <p style={{ color: "gray" }}>
                                {elem.year.substring(0, 4)}
                              </p>
                            </p>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <AccountDetail profile={profile} />
          <hr />
          <PlanDetail />
          <hr />
          <Settings />
        </>
      )}
    </div>
  );
};

const AccountDetail = ({ profile }) => {
  return (
    <div style={{ marginTop: "40px" }}>
      <h3 className="pb-3" style={{ fontSize: "20px" }}>
        Account
      </h3>
      <hr className="mb-3" />
      <div>
        <div className="d-flex">
          <div className="col-xl-3">
            <div clssName="justify-contents-center align-items-center">
              <div>Membership & Billing</div>
              <button
                className="btnClass"
                style={{
                  width: "120px",
                  marginTop: "20px",
                  color: "black",
                  backgroundColor: "gray",
                }}
              >
                Cancel Membership
              </button>
            </div>
          </div>
          <div className="col-xl-9">
            <div className="profile-account-row">
              <span>{profile.email}</span>
              <a style={{ color: "blue" }}>Change account email</a>
            </div>
            <div className="profile-account-row">
              <span style={{ color: "gray" }}>password : ******</span>
              <a style={{ color: "blue" }}>Change password</a>
            </div>
            <div className="profile-account-row">
              <span style={{ color: "gray" }}>Phone : (646) 234 - 4234</span>
              <a style={{ color: "blue" }}>Change phone number</a>
            </div>
            <hr className="mb-3" />
            <div className="profile-account-row">
              <span>junhoparkspaypal@gmail.com</span>
              <a style={{ color: "blue" }}>Manage payment info</a>
            </div>
            <div className="profile-account-row">
              <span style={{ color: "gray" }}>
                Your next billing date is December 20, 2021
              </span>
              <a style={{ color: "blue" }}>Billing details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlanDetail = () => {
  return (
    <div className="d-flex">
      <div className="col-xl-3">Plan Detail</div>
      <div className="d-flex justify-content-between col-xl-9">
        <span>Premium</span>
        <a style={{ color: "blue" }}>Change Plan</a>
      </div>
    </div>
  );
};

const Settings = () => {
  const setting = [
    "Recent device streaming activity",
    "Sign out of all devices",
    "Download your personal information",
  ];
  return (
    <div className="d-flex">
      <div className="col-xl-3">Settings</div>
      <div className="col-xl-9">
        {setting.map((elem) => {
          return (
            <div>
              <a style={{ color: "blue" }}>{elem}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Profile;
