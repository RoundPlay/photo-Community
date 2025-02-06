import { useParams } from 'react-router-dom';
import data from './../data.js';
import { useState } from 'react';
import wheart from './../assets/heart.png';
import bheart from './../assets/heart1.png';

function Post() {
  let [cardlist, setCardlist] = useState(data);
  let { id } = useParams();
  let [heart, setHeart] = useState(0);
  let [likecount, setLikecount] = useState(0);
  let find = cardlist.find(function (x) {
    return x.id == id;
  });

  const Like = () => {
    if (likecount == 0) {
      setHeart(1);
      let copy = [...cardlist];
      copy[id].like++;
      setCardlist(copy);
      setLikecount(1);
    } else {
      setHeart(0);
      setLikecount(0);
      let copy = [...cardlist];
      copy[id].like--;
      setCardlist(copy);
    }
  };

  return (
    <div className="container d-flex vh-100">
      <div className="justify-content-center align-items-center">
        <div className="bg-light rounded shadow">
          <img src={find.image}></img>
          <div className="ms-auto">
            <img
              style={{ width: '25px', padding: '2px', marginBottom: '2px' }}
              src={heart == 0 ? wheart : bheart}
              onClick={() => {
                Like();
              }}
            />
            <span>{find.like}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
