import expressAsyncHandler from "express-async-handler";

export const crateFile = expressAsyncHandler(async (req, res, next) => {
  // console.log(req.file);
  let link = `http://localhost:8000/${req.file.filename}`;
  res.status(200).json({
    success: true,
    result: link,
  });
  // successResponse(res,201,"file created successfully",link)
});

export const crateMultipleFile = expressAsyncHandler(async (req, res, next) => {
  let links = req.files.map((value, i) => {
    let link = `localhost:8000/$(value.filename)`;
    return link;
  });
  res.status(201).json({
    success: true,
    message: "file created successfully",
    links,
  });
});
