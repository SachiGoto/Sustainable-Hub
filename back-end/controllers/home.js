module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },

  list: async (req, res) => {
    try {
      const allLists = [
        {
        Title: "Reusables",
        BriefSummary: "Reusables is a container sharing platform for takeout food, coffee and more from your favorite stores.",
        Category:"Companies"
      },
      {
        "Title": "Nada",
        BriefSummary:"Nada is a package-free grocery store on a mission to connect people to their food. No packaging and no funny ingredients you can't pronounce.",
        Category:"Grocerries"
      },
      {
        Title: "The Soap Dispensary and Kitchen Staples",
        BriefSummary: "Cozy refill shop with liquid soaps, personal care products, household cleaners & DIY ingredients.",
        Category:"Households"
      },
      {
        Title: "Evo Car Share: Car Sharing Vancouver",
        BriefSummary: "Evo is car share made for you. Become a Member today and enjoy the freedom of Evo. Reserve, unlock and hit the road all from the Evo App. ",
        Category:"Communtes"
      },
      {
        Title: "Zero Waste Vancouver",
        BriefSummary: "This group is for any awesome human beings interested in zero waste livin'! We'd like to keep the discussions going on all topics zero waste, food waste,",
        Category:"Communities"
      }
      ]
  
      console.log("all list is " , allLists)
       res.status(200).json(allLists)
      // res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
};
