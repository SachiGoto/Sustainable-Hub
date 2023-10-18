const woof = require("../woof");

test("should return number of woofs", () => {
  const result = woof("hello");
  console.log(result);
  // woof("oh hello");

  expect(result).toBe("5woof");
  expect(result).not.toBe("5");
  // expect({ a: "one", b: "two" }).toBe({ a: "one", b: "two" });
  expect({ a: "one", b: "two" }).toEqual({ a: "one", b: "two" });
  expect(result).toMatch(/\dwoof/i);
  expect(["a", "b", "c"]).toContain("b");
});

test("should throw an error if not a string", () => {
  expect(() => woof()).toThrow();
});

test.todo("should not allow numbers to be passed");

// const { list } = require("../controllers/home");
// const Lists = require("../models/List");
// jest.mock("../models/List");

// describe("list function", () => {
//   it("should respond with a JSON array of lists in descending order", async () => {
//     const req = {};
//     const json = jest.fn();
//     const res = { json };

//     const sampleLists = [
//          {_id: "63f85f4f2ffcef6581c6c720",
//     Title: 'Jamjar',
//     Image: 'https://res.cloudinary.com/vanarts-webdev/image/upload/v1681973868/jamjar_lrvldk.png',
//     cloudinaryId: 'ydgsclpvgtrz9jvk7tgs',
//     Category: 'Restaurants',
//     WebsiteLink: 'https://www.jam-jar.ca/',
//     Summary: "Are you a fan of Lebanese healthy dips like hummus? If so, you'll love Jamjar's delicious selection of dips available in convenient jars. Plus, you can enjoy a discount on your next purchase when you bring your jar back for a refill. It's a sustainable and tasty way to enjoy your favorite dips! In addition, Jamjar has partnered with Reusables.com to offer take-out orders packed in reusable containers, promoting sustainable practices and reducing waste.",
//     createdAt: "2023-02-24T06:55:11.503Z"}

//     ];
//     Lists.find.mockResolvedValue(sampleLists);

//     // Call the list function.
//     await list(req, res);

//     // Assert that res.json was called.
//     expect(json).toHaveBeenCalled();

//     // Assert that res.json was called with the sampleLists array.
//     expect(json).toHaveBeenCalledWith(sampleLists);
//   });

// //   it("should handle errors and log them", async () => {
// //     // Create mock request and response objects.
// //     const req = {};
// //     const json = jest.fn();
// //     const status = jest.fn().mockReturnValue({ json });
// //     const res = { json, status };

// //     // Mock Lists.find() to throw an error.
// //     const error = new Error("Database error");
// //     Lists.find.mockRejectedValue(error);

// //     // Mock console.log to capture log output.
// //     const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

// //     // Call the list function.
// //     await list(req, res);

// //     // Assert that res.status was called with a 500 status code.
// //     expect(status).toHaveBeenCalledWith(500);

// //     // Assert that res.json was called with an error message.
// //     expect(json).toHaveBeenCalledWith({ error: "Failed to fetch lists" });

// //     // Assert that the error is logged.
// //     expect(consoleSpy).toHaveBeenCalledWith(error);
// //   });
// });
