import { Schema, model } from "mongoose";

const Userschema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    credit: {
      type: Number,
      default: 3,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },

    // to ref is used to create the relation with the user array
    posts: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "Post",
      },
    ],
  },

  { timestamps: true }
);

const User = model("User", Userschema);

export default User;
