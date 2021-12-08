import React, { useState, useEffect } from "react";
import service from "../../service/service";
const People = ({auth}) => {
  const [people, setPeople] = useState();
  const [isLogginIn, setIsLoggin] = useState(false);
  const findAllProfile = (id) => {
    service.findAllProfile().then((people) => setPeople(people));
  };
 
  useEffect(() => {
    async function userInfo() {
      await auth.onAuthStateChanged((user) => {
        findAllProfile();
        if (user) {
          setIsLoggin(true);
        }
      });
    }
    userInfo();
  }, []);

  return (
    <div>
      {console.log(people)}
      <h1>People</h1>
    </div>
  );
};

export default People;
