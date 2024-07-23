const validate = (schema) => async (req,res,next)=>{

try {
  const parseBody = await schema.parseAsync(req.body);
  req.body = parseBody;
  next();
} catch (err) { 
  const status = 422;
  const message = "Fill the input properly";
 /*  const extraDetails = err.errors[0].message; */
 let extraDetails;
 if (err.errors && err.errors.length > 0) {
   extraDetails = err.errors[0].message;
 } else {
   extraDetails = err.message; // Fallback to err.message if no specific errors are provided
 }


  const error = {
    status,
    message,
    extraDetails
  }
  console.log(error)
 /* res.status(400).json({msg: message}); */

  next(error);
}

}
module.exports = validate;