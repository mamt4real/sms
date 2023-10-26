const Section = require("../models/sectionModel");
const catchAsync = require("../utils/catchAsync");
const MyError = require("../utils/myError");
const factory = require("./handlerFactory");
const Class = require("../models/classModel");
const Subreg = require("../models/subregModel");

exports.getAllSections = factory.getAll(Section);
exports.getSection = factory.getOne(Section);

exports.deleteSection = catchAsync(async (req, res, next) => {
  const deleted = await Section.findById(req.params.sectionID);
  if (!deleted)
    throw new MyError(`No Section witth id: ${req.params.sectionID}`, 404);
  if (deleted.active)
    throw new MyError("You can't delete an active section!", 400);
  await deleted.delete();
  const recordsStat = await deleteSubregRecords(req.params.sectionID);
  res.status(204).json({ status: "success", data: deleted, recordsStat });
});

exports.createSection = catchAsync(async (req, res, next) => {
  const newSection = await Section.create(req.body);
  await createSubregRecords(newSection._id);
  res.status(201).json({ status: "success", data: newSection });
});

const createSubregRecords = async (section) => {
  const classes = await Class.find({}).populate("students");
  for (const cls of classes) {
    for (const sbj of cls.subjects) {
      for (const std of cls.students) {
        try {
          await Subreg.create({
            studentID: std._id,
            classID: cls._id,
            subjectID: sbj,
            section,
          });
        } catch (error) {
          //console.log(error);
          continue;
        }
      }
    }
  }
  return;
};

const deleteSubregRecords = async (section) => {
  try {
    const result = await Subreg.deleteMany({ section });
    //console.log(result);
    return true;
  } catch (error) {
    //console.log(error);
    return error.message;
  }
};

exports.setActive = catchAsync(async (req, res, next) => {
  const { sectionID } = req.body;
  if (!sectionID) {
    throw new MyError(
      "Please provide the section id you wish to switch to!!",
      400
    );
  }
  const previous = await Section.getActive();

  await Section.findByIdAndUpdate(previous, { active: false });
  const current = await Section.findByIdAndUpdate(
    sectionID,
    { active: true },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Session Changed successfully!",
    current,
  });
});
