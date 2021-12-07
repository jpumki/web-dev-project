import "./profile.css";
const Profile = ({auth}) => {
  return (
    <div>
      <div>
        <div>
          <img />
        </div>
        <span>junhopark</span>
        <img />
        <span>member since 2021</span>
      </div>
      <div>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active">Followers</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">Following</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">Favorites</a>
          </li>
        </ul>
      </div>
      <AccountDetail />
      <hr />
      <PlanDetail />
      <hr />
      <Settings />
    </div>
  );
};

const AccountDetail = () => {
  return (
    <div>
      <h3 className="pb-3">Account</h3>
      <hr className="mb-3" />
      <div>
        <div className="d-flex">
          <div className="col-xl-3">
            <div clssName="justify-contents-center align-items-center">
              <div>Membership & Billing</div>
              <button className="btn">Cancel Membership</button>
            </div>
          </div>
          <div className="col-xl-9">
            <div className="profile-account-row">
              <span>park.junho@gmail.com</span>
              <a>Change account email</a>
            </div>{" "}
            <div className="profile-account-row">
              <span>password : ******</span>
              <a>Change password</a>
            </div>
            <div className="profile-account-row">
              <span>Phone : (646) 234 - 4234</span>
              <a>Change phone number</a>
            </div>
            <hr className="mb-3" />
            <div className="profile-account-row">
              <span>junhoparkspaypal@gmail.com</span>
              <a>Manage payment info</a>
            </div>
            <div className="profile-account-row">
              <span>Your next billing date is December 20, 2021</span>
              <a>Billing details</a>
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
        <a>Change Plan</a>
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
              <a>{elem}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Profile;
