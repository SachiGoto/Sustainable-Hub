



const Main = (props)=>{


    return (
    <>
    <div className='categoryContainer'>
    Category

    <ul  onClick={props.clickHandler}  className="category-ul">

    <li data-category="Households">Households</li>
    <li data-category="Grocerries">Grocerries/Food</li>
    <li data-category="Commutes">Communtes</li>
    <li data-category="Companies">Companies</li>
    <li data-category="Communities">Communities</li>

    </ul>

    <div className = "itemsList">

      {props.categoryData}
      <div className="item" >
        <div className="itemImage">
            <img src="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
        </div>
        <div className="itemContent">
        <h1>Title</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dignissim justo ut maximus. Nulla in ex bibendum, ultrices turpis quis, condimentum lacus. Cras sit amet velit tincidunt, accumsan lorem eu, interdum leo..</p>
        </div>
      </div>
      <div className="item" >
        <div className="itemImage">
            <img src="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
        </div>
        <div className="itemContent">
        <h1>Title</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dignissim justo ut maximus. Nulla in ex bibendum, ultrices turpis quis, condimentum lacus. Cras sit amet velit tincidunt, accumsan lorem eu, interdum leo..</p>
        </div>
      </div>
      <div className="item" >
        <div className="itemImage">
            <img src="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
        </div>
        <div className="itemContent">
           <h1>Title</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dignissim justo ut maximus. Nulla in ex bibendum, ultrices turpis quis, condimentum lacus. Cras sit amet velit tincidunt, accumsan lorem eu, interdum leo..</p>
        </div>
      </div>

    </div>
  
    
    
    </div>
    
    
    
    
    
    
    

    </>
    )

}

export default Main 