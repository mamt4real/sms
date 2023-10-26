const mongoose = require("mongoose");
const Class = require("./classModel");
const Subreg = require("./subregModel");
const catchAsync = require("../utils/catchAsync");

const sectionSchema = mongoose.Schema({
  session: {
    type: String,
    required: [true, "Please provide the session"],
    validate: {
      validator: function (val) {
        return /^\d{4}\/\d{4}$/.test(val);
      },
      message: "Invalid Session!! Should be of the form 'DDDD/DDDD'",
    },
    unique: false,
  },
  term: {
    type: String,
    required: [true, "Please provide the Term"],
    enum: ["First", "Second", "Third"],
    unique: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

sectionSchema.index({ session: 1, term: 1 }, { unique: true });

sectionSchema.statics.getActive = async () => {
  let active = await Section.findOne({ active: true });
  if(!active){
    active = await Section.findOne();
    active.active = true;
    await active.save();
  }
  return active._id;
};

const Section = mongoose.model("Section", sectionSchema);
module.exports = Section;
