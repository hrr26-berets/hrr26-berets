var PopularItems = (props) => (
  <div className="popular-items">
    {props.products.map(product =>
      <Item onClick={props.onClick} product={product}/>
      )}
  </div>
  )


//render one box for each item
//we want three now but could handle more or less
//onClick passed from parent component allows user to follow url link to walmart product page
//When styling make sure products are arranged horizontally.


export default PopularItems;