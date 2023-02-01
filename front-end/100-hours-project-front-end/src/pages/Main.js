



const Main = (props)=>{


    
     const categoryData = props.categoryData.map((item) => {
      return(
       <div className="item"  key={item.id}>
         <div className="itemImage">
         <img src={item.Image} />
         </div>
         <div className="itemContent">
         <h1 className="itemTitle">{item.Title}</h1>
         <p className="itemBriefSummary">{item.BriefSummary}</p>
         </div>
        
         </div>
      )
   })



    return (
    <>
    <div className='categoryContainer'>
    Category


    <ul  onClick={props.clickHandler}  className="category-ul">

    <li data-category="Households">Households</li>
    <li data-category="Grocerries">Grocerries/Food</li>
    <li data-category="Commuting">Commuting</li>
    <li data-category="Companies">Companies</li>
    <li data-category="Communities">Communities</li>

    </ul>
    </div>

    <div className = "itemsList">

    {categoryData}

   

    </div>

    
    
      
    
    
    
    
    
    

    </>
    )

}

export default Main 