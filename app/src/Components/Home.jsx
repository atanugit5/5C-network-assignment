import React from "react";
import { useState } from "react";
import axios from "axios";
import style from "../Styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { followerFunc, userFunc } from "../Redux/action";

const Home = () => {
  const [user, setUser] = useState("");
  // const [data, setData] = useState([]);
  // const [follwers, setFollwers] = useState([]);
  const [repo, setRepo] = useState({});
  const [status, setStatus] = useState(false);


  const dispatch=useDispatch();
  const data=useSelector((state)=>state.gitUser.repos);
  const loading=useSelector((state)=>state.gitUser.loading);
  const error=useSelector((state)=>state.gitUser.error);
  const followers=useSelector((state)=>state.gitUser.followers);
  //status change:-->
  const [dataStatus, setDataStatus] = useState(false);
  const [follwerStatus, setFollowerStatus] = useState(false);
  const [repoStatus, setRepoStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User:", user);

    dispatch(userFunc(user));
    dispatch(followerFunc(user));
    // axios
    //   .get(`https://api.github.com/users/${user}/repos`)
    //   .then((res) => {
    //     console.log("res:", res);
    //     setData(res.data);
    //   })
    //   .then((err) => console.log("Error:", err));
    setDataStatus(true);
    setFollowerStatus(false);
    setRepoStatus(false);
    setStatus(true)
  };

  const handleFollowers = () => {
    // axios.get(data[0]?.owner?.followers_url).then((res) => {
    //   console.log("folowersRes:", res);
    //   setFollwers(res.data);
    // });
    setDataStatus(false);
    setFollowerStatus(true);
    setRepoStatus(false);
  };
  const handleRepo = () => {
    setDataStatus(true);
    setFollowerStatus(false);
    setRepoStatus(false);
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className={style.form}>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input type="submit" />
        </form>
      </div>

      {/* repositories list section */}
      {status &&<div className={style.userDetails}>
            <img src={data[0]?.owner.avatar_url} alt="" />
            <div>
              <h1>{data[0]?.owner.login}</h1>
              {(dataStatus||repoStatus)&&<button onClick={handleFollowers}>Go to Followers</button>}
              {follwerStatus&&<button onClick={handleRepo}>Go to Repositories</button>}
            </div>
          </div>}
      {dataStatus && (
        <div className={style.reposDiv}>
          {loading && <h1 style={{color:"green"}}>Loading.....</h1>}
          {error && <h1 style={{color:"red"}}>Error occurred</h1>}
          
          <div className={style.repositories}>
            {data?.map((el) => (
              <div
                key={el.id}
                onClick={() => {
                  console.log("el:", el);
                  setRepo(el);
                  setRepoStatus(true);
                  setFollowerStatus(false);
                  setDataStatus(false);
                }}
              >
                <img src={el.owner.avatar_url} alt="" />
                <div>
                  <h3>{el.name}</h3>
                  <p>{el.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* followers section */}
      {follwerStatus && (
        <div className={style.followers}>
          {followers?.map((el) => (
            <div key={el.id}>
              <a href={el.html_url} target="_blank">
                <img src={el.avatar_url} alt="" />
                <div>
                  <h3>{el.login}</h3>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* individual repo section */}
      {repoStatus && (
        <div className={style.repoIndiv}>
          <img src={repo.owner.avatar_url} alt="" />
          <div>
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
