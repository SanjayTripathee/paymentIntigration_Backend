import expressAsyncHandler from "express-async-handler";

import { sendMail } from "../utils/sendMail.js";//
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { seceretekey } from "../../constant.js";//
import { WebUser } from "../schema/model.js";

//create /=>createWebUserController and verifyEmail both router and controller is used for register account i.e singin
export const createWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let data = req.body; //dont store in result all because we need to put req.body at top and create.(data) save on result down so hassing step will clear if we do
    // like:   let result = await WebUser.create(req.body)then password will not hash i.e h_ide so,we need 2 line for our process ok...

    let hassPassword = await bcrypt.hash(data.password, 10);
    data = {
      ...data,
      isVerifyedEmail: false,
      password: hassPassword,
    };
    let result = await WebUser.create(data);
    //send email with link

    //generate token
    let info = {
      _id: result._id,
    };
    let expiryInfo = {
      expiresIn: "353d",
    };
    let myToken = await jwt.sign(info, seceretekey, expiryInfo); //we have define secreteKey in .env so import it ok...

    //make link=>i.e frontend token

    //    send mail
    await sendMail({
      from: "'SanjayTripathi'<9864226384s@gmail.com>",
      to: data.email, //if we wan to send multiple perrson then send as arrayi.e[data.email,...]
      subject: "CodeWithSanjayTripathi",
      html: `
        <h1>your account is created sucessfully</h1>
        <a href="http://localhost:5173/verify-email?token=${myToken}">
        http://localhost:5173/verify-email?token=${myToken}
        </a>
      `, //for message...and we use backtrick instead ok doubleCote because whenever we press enter and try to write in new line then  in "doubleCote"error aries so in back trick this types of error doesnot come
    });
    res.status(201).json({
      success: true,
      message: "WebUser created successfully",
      result: result,
    });
  }
);

//patch(update)=>to verify-email=>make isVerifyedEmail: true,
//patch
export const verifyEmail = expressAsyncHandler(async (req, res, next) => {
  let tokenString = req.headers.authorization; //to get token
  let tokenArray = tokenString.split(" "); //convert to array
  let token = tokenArray[1]; //now get specefic index 1 because index0 we dont need
  // console.log(tokenString.split(" ")[1])//short form of above to line code

  //verify token of our email it is real or not
  let myInfo = await jwt.verify(token, seceretekey);
  // console.log(myInfo)
  let userId = myInfo._id; //we get _id
  let result = await WebUser.findByIdAndUpdate(
    userId,
    {
      //now if _id is correct then make isVerifyedEmail:true,
      isVerifyedEmail: true,
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    success: true,
    message: "user verified successfully",
  });
});

//post=>for login we are working ok=>we generate token on postman only if email and password is correct or match with DB
//post
export const loginUser = expressAsyncHandler(async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = await WebUser.findOne({ email: email });
  //if email true then it will work otherwise throw error

  //  remember we are putting condition ins_ide if and again ins_ide if like nested if ok
  if (user) {
    //email is checked weather it exist in our database or not

    if (user.isVerifyedEmail) {
      //email verified is checked
      //check if password match
      let isValidPassword = await bcrypt.compare(password, user.password);
      //check if password match if nit throw error ok..
      if (isValidPassword) {
        //generate token
        let info = {
          _id: user._id,
        };
        let expiryInfo = {
          expiresIn: "366d",
        };
        let myToken = jwt.sign(info, seceretekey, expiryInfo);
        //sending token to postman
        res.status(201).json({
          success: true,
          message: "user login Successful",
          data: user,
          myToken: myToken,
        });
      } else {
        let error = new Error("credential does not match");
        throw error;
      }
    } else {
      let error = new Error("credential does not match");
      throw error;
    }
  } else {
    let error = new Error("credential does not match");
    throw error;
  }
});

