function HomeCard(props) {
  return (
    <div className='card-container'>
      {' '}
      {/* 부모 div에 클래스 추가 */}
      <div className='card'>
        <img src={props.image} className='card-img-top' alt='Card image' />
        <div className='card-body'>
          <h3 className='card-title'>{props.title}</h3>
          <h5 className='card-title'>{props.id}</h5>
          <p className='card-text'>{props.date}</p>
          <p className='card-text'>Likes: {props.like}</p>
          <p className='card-text'>Latitude: {props.latitude}</p>
          <p className='card-text'>Longitude: {props.longitude}</p>
        </div>
      </div>
    </div>
  );
}

export { HomeCard };
