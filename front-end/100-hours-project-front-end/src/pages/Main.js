



const Main = (props)=>{

   const allData = props.categoryData.map((item)=>{
      return(
         <div className="item"  key={item._id}>
           <div className="itemImage">
           {/* <img src={item.Image} /> */}
           </div>
           <div className="itemContent">
           <h1 className="itemTitle">{item.Title}</h1>
           <p className="itemBriefSummary">{item.BriefSummary}</p>
           </div>
          
           </div>
        )

   })
    
   //   const categoryData = props.categoryData.map((item) => {
   //    return(
   //     <div className="item"  key={item.id}>
   //       <div className="itemImage">
   //       <img src={item.Image} />
   //       </div>
   //       <div className="itemContent">
   //       <h1 className="itemTitle">{item.Title}</h1>
   //       <p className="itemBriefSummary">{item.BriefSummary}</p>
   //       </div>
        
   //       </div>
   //    )
   // })

//   let data = categoryData?categoryData: allData

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

   
{/* {data} */}
{allData}
   

    </div>

    
    
      
    
    
    
    
    
    

    </>
    )

}

export default Main 