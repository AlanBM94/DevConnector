const Profile = require("./../models/Profile");
const Post = require("./../models/Post");
const request = require("request");
const config = require("config");
const { validationResult } = require("express-validator");

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res
        .status(400)
        .json({ message: "There is no profile from this user" });
    }
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

const getFieldsFromBody = (body, userId) => {
  const {
    company,
    location,
    website,
    bio,
    skills,
    status,
    githubusername,
  } = body;
  const profileFields = {};
  profileFields.user = userId;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }
  return profileFields;
};

const getSocialMediaFromBody = (body) => {
  const { youtube, twitter, facebook, linkedin, instagram } = body;
  const socialMedia = {};
  if (youtube) socialMedia.youtube = youtube;
  if (twitter) socialMedia.twitter = twitter;
  if (facebook) socialMedia.facebook = facebook;
  if (linkedin) socialMedia.linkedin = linkedin;
  if (instagram) socialMedia.instagram = instagram;
  return socialMedia;
};

exports.createProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.errors });
  }
  const profileFields = getFieldsFromBody(req.body, req.user.id);
  profileFields.social = getSocialMediaFromBody(req.body);

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res
        .status(400)
        .json({ message: "There is no profile with that user id" });
    }
    res.json(profile);
  } catch (error) {
    console.log(error);
    if (error.name === "CastError")
      return res
        .status(400)
        .json({ message: "There is no profile with that user id" });
    res.status(500).send("Server Error");
  }
};

const deleteAllCommentsFromDeletedAccount = async (userId) => {
  await Post.updateMany(
    { comments: { $elemMatch: { user: userId } } },
    { $pull: { comments: { user: userId } } }
  );
};

const deleteAllLikesFromDeletedAccount = async (userId) => {
  await Post.updateMany(
    { likes: { $elemMatch: { user: userId } } },
    { $pull: { likes: { user: userId } } }
  );
};

exports.deleteProfile = async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    await deleteAllCommentsFromDeletedAccount(req.user.id);
    await deleteAllLikesFromDeletedAccount(req.user.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

const getNewExperienceFromBody = (body) => {
  const { title, company, location, from, to, current, description } = body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  return newExp;
};

exports.addExperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newExp = getNewExperienceFromBody(req.body);

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removedIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removedIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

const getEducationFromBody = (body) => {
  const { school, degree, fieldofstudy, from, to, current, description } = body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  return newEdu;
};

exports.addEducation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newEdu = getEducationFromBody(req.body);

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(newEdu);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

exports.getGithubAccount = async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: {
        "user-agent": "node.js",
      },
    };
    request(options, (error, response, body) => {
      if (error) console.log(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ message: "No github profile found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: "No Github profile found" });
  }
};
