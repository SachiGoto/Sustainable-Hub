const homeController = require("../controllers/home"); // Update the path to your controller
const Lists = require("../models/List"); // Update the path to your List model

// Mock the Lists model
jest.mock("../models/List");

describe("homeController.list", () => {
  it("should return a list of lists", async () => {
    const mockListData = [
        {id:"123", title:"test"}
      // Add sample data here
    ];

    // Mock the find method of the Lists model
     Lists.find = jest.fn().mockResolvedValue(mockListData);

    const req = {};
    const res = {
      json: jest.fn(),
    };

    await homeController.list(req, res);

    expect(Lists.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockListData);
  });

//   it("should handle errors", async () => {
//     const errorMessage = "An error occurred";
//     // Mock the find method to throw an error
//     Lists.find.mockRejectedValue(new Error(errorMessage));

//     const req = {};
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     await homeController.list(req, res);

//     expect(Lists.find).toHaveBeenCalledWith();
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
//   });
});
