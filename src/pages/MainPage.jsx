import { useEffect, useState } from 'react';
import { Sidebar } from '../components/sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MainPage() {
  let [cardlist, setCardlist] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get('/data/data.json').then((result) => {
      setCardlist(result.data);
    });
  }, []);

  return (
    <div className="main-container">
      <Sidebar />
      <div className="content">
        <div className="map">
          <img
            src="https://placehold.co/1000x600"
            alt="map"
          />
        </div>
        <div className="card-list">
          {cardlist.map(function (a, i) {
            return (
              <Card
                key={i}
                i={i}
                cardlist={cardlist[i]}
                navigate={navigate}></Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Card(props) {
  return (
    <div
      className="card"
      onClick={() => {
        props.navigate(`post/${props.i}`);
      }}>
      <img
        src={props.cardlist.image}
        className="card-img-top"
        alt="card"
      />
      <div className="card-body">
        <p className="card-text">{props.cardlist.title}</p>
        <p className="card-text">{props.cardlist.date}</p>
      </div>
    </div>
  );
}

export default MainPage;
