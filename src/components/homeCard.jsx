function Card(props) {
  return (
    <div
      className='card'
      onClick={() => {
        props.navigate(`post/${props.id}`);
      }}>
      <img src={props.image} className='card-img-top' alt='card' />
      <div className='card-body'>
        <p className='card-text'>{props.title}</p>
        <p className='card-text'>{props.date}</p>
      </div>
    </div>
  );
}

export { Card };
