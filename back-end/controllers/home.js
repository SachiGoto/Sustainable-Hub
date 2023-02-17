
const cloudinary = require("../middleware/cloudinary");
const Lists = require("../models/List");


module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },

  list: async (req, res) => {
    try {
      
      const allLists = await Lists.find().sort({ createdAt: "desc" }).lean();
      res.status(200).json(allLists)

    } catch (err) {
      console.log(err);
    } 
  },

  createList: async(req,res)=>{
    try{
    
      const result = await cloudinary.uploader.upload(req.file.path);
      // console.log(result)
     const list =  await Lists.create({
          Title:req.body.Title,
          // Image:req.body.Image,
          Image:result.secure_url,
          cloudinaryId:result.public_id,
          Category:req.body.Category,
          BriefSummary:req.body.BriefSummary,
          Summary:req.body.Summary 
           

      });

      res.status(200).json(list)
      console.log('list has been added', list);




    }catch(err){
      console.log(err)
      res.status(500).json({ error: 'Failed to add list' });
    }
     
      


  }
  // list: async (req, res) => {
  //   try {
  //     const allLists = [
  //       {
  //       Title: "Reusables",
  //       BriefSummary: "Reusables is a container sharing platform for takeout food, coffee and more from your favorite stores.",
  //       Image:"https://elevatehub.ca/wp-content/uploads/2021/02/IMG_5898flip_300x.png",
  //       Category:"Companies"
  //     },
  //     {
  //       Title: "Plastic Bank",
  //       BriefSummary: "Plastic Bank Foundation (Canada) is committed to creating a greener world by advocating and lobbying to increase the use of non-virgin plastics.",
  //       Image:"https://www.opencityinc.com/wp-content/uploads/Opencity-Inc-The-Plastic-Bank-SocialPlastic.jpg",
  //       Category:"Companies"
       
  //     },
  //     {
  //       "Title": "Nada",
  //       BriefSummary:"Nada is a package-free grocery store on a mission to connect people to their food. No packaging and no funny ingredients you can't pronounce.",
  //       Image:"https://www.ctvnews.ca/polopoly_fs/1.4278668.1549036636!/httpImage/image.png_gen/derivatives/landscape_1020/image.png",
  //       Category:"Grocerries"
  //     },
  //     {
  //       Title: "The Soap Dispensary and Kitchen Staples",
  //       BriefSummary: "Cozy refill shop with liquid soaps, personal care products, household cleaners & DIY ingredients.",
  //       Image:"https://cdn.shopify.com/s/files/1/1180/9678/files/hero_slide_8_1000x1000.jpg?v=1614322597",
  //       Category:"Households"
  //     },
  //     {
  //       Title: "Evo Car Share: Car Sharing Vancouver",
  //       BriefSummary: "Evo is car share made for you. Become a Member today and enjoy the freedom of Evo. Reserve, unlock and hit the road all from the Evo App. ",
  //       Image:"https://www.vmcdn.ca/f/files/glaciermedia/import/lmp-all/1549540-evo-car-share-jpg-w-960.jfif",
  //       Category:"Commuting"
  //     },
  //     {
  //       Title: "Zero Waste Vancouver",
  //       BriefSummary: "This group is for any awesome human beings interested in zero waste livin'! We'd like to keep the discussions going on all topics zero waste, food waste,",
  //       Image:"https://iliveineastvan.files.wordpress.com/2018/04/zerowaste.jpg",
  //       Category:"Communities"
  //     }
  //     ]
  
  //     console.log("all list is " , allLists)
  //      res.status(200).json(allLists)
  //     // res.render("feed.ejs", { posts: posts });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
};
