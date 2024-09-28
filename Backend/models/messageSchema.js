import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At Least 3 Characters!"],
        trim: true,  
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
        trim: true,  
    },      
    email: {
        type: String,
        required: [true, "Email is required!"],
        validate: [validator.isEmail, "Provide A Valid Email!"],
    },
    phone: {
        type: String,
        required: true,
        validate: {
          validator: (value) => validator.isMobilePhone(value, 'any', { strictMode: true }),
          message: "Provide A Valid Phone Number!",
        },
    },      
    message: {
        type: String,
        required: true,
        minLength: [10, "Message Must Contain At Least 10 Characters!"],
        default: "No message provided",
    },
});

export const Message = mongoose.model("Message", messageSchema);