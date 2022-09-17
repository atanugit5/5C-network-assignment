import React from "react";
import { useState } from "react";
import axios from "axios";
import style from "../Styles/Home.module.css";

const Home = () => {
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);
  const [follwers, setFollwers] = useState([]);
  const [repo, setRepo] = useState({});

  const [dataStatus, setDataStatus] = useState(false);
  const [follwerStatus, setFollowerStatus] = useState(false);
  const [repoStatus, setRepoStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User:", user);

    axios
      .get(`https://api.github.com/users/${user}/repos`)
      .then((res) => {
        console.log("res:", res);
        setDataStatus(true);
        setFollowerStatus(false);
        setRepoStatus(false);
        setData(res.data);
      })
      .then((err) => console.log("Error:", err));
  };

  const handleFollowers = () => {
    axios.get(data[0]?.owner?.followers_url).then((res) => {
      console.log("folowersRes:", res);
      setFollwers(res.data);
      setDataStatus(false);
      setFollowerStatus(true);
      setRepoStatus(false);
    });
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
      {dataStatus && (
        <div className={style.reposDiv}>
          <div className={style.userDetails}>
            <img src={data[0]?.owner.avatar_url} alt="" />
            <div>
              <h1>{data[0]?.owner.login}</h1>
              <button onClick={handleFollowers}>Followers</button>
            </div>
          </div>
          <div className={style.repositories}>
            {data.map((el) => (
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
          {follwers.map((el) => (
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
