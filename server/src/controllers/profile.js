const response = require(appDir + '/src/response/response');
const Profile = require(appDir + '/src/models/Profile');
const { validationResult } = require('express-validator');
const resource = require(appDir+ '/src/helpers/common');

exports.me = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return response.failure(res, { errors: [{ msg: 'There is no profle for this user' }] });
        }

        response.success(res, profile);
    } catch (err) {
        response.serverError(res);
    }
}

exports.createOrUpdate = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        response.failure(res, { errors: errors.array() });
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) {
        profileFields.company = company;
    }

    if (website) {
        profileFields.website = website;
    }

    if (location) {
        profileFields.location = location;
    }

    if (bio) {
        profileFields.bio = bio;
    }

    if (status) {
        profileFields.status = status;
    }

    if (githubusername) {
        profileFields.githubusername = githubusername;
    }

    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    profileFields.social = {};
    if (youtube) {
        profileFields.social.youtube = youtube
    }

    if (twitter) {
        profileFields.social.twitter = twitter;
    }

    if (facebook) {
        profileFields.social.facebook = facebook;
    }

    if (linkedin) {
        profileFields.social.linkedin = linkedin;
    }

    if (instagram) {
        profileFields.social.instagram = instagram;
    }

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });

            return response.success(res, profile);
        }

        profile = new Profile(profileFields);
        await profile.save();
        response.success(res, profile);
    } catch (err) {

    }
}

exports.getAll = async (req, res, next) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        response.success(res, resource.collection(profiles));
    } catch (err) {
        response.serverError(res);
    }
}

exports.getByUserId = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.params.userId }).populate('user', ['name', 'avatar']);

        if(!profile){
            response.failure(res, {errors: [{msg: 'There is no profile for this user'}]});
        }

        response.success(res, profile.makeResource());
    } catch (err) {
        response.serverError(res);
    }
}