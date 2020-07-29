const response = require(appDir + '/src/response/response');
const Profile = require(appDir + '/src/models/Profile');
const resource = require(appDir + '/src/helpers/common');
const request = require('request');
const config = require('config');
const { validationResult } = require('express-validator');



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

        if (!profile) {
            response.failure(res, { errors: [{ msg: 'Profile not found' }] });
        }

        response.success(res, profile.makeResource());
    } catch (err) {
        if (err.kind == 'ObjectId') {
            return response.failure(res, { errors: [{ msg: 'Profile not found' }] });
        }

        response.serverError(res);
    }
}

exports.remove = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            response.failure(res, { errors: [{ msg: "Profile not found" }] });
        }

        profile.remove();

        response.success(res, { msg: "Removed successfully!" });
    } catch (err) {
        response.serverError(res, err.message);
    }
}

exports.addExperience = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        response.failure(res, { errors: errors.array() });
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);

        await profile.save();
        response.success(res, profile.makeResource());
    } catch (err) {
        response.serverError(res, err.message);
    }
}

exports.removeExperience = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.expId);
        profile.experience.splice(removeIndex, 1);

        await profile.save();

        response.success(res, profile);
    } catch (err) {
        response.serverError(res);
    }
}

exports.addEducation = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        response.failure(res, { errors: errors.array() });
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);

        await profile.save();
        response.success(res, profile.makeResource());
    } catch (err) {
        response.serverError(res, err.message);
    }

}

exports.removeEducation = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.eduId);
        profile.education.splice(removeIndex, 1);

        await profile.save();

        response.success(res, profile);
    } catch (err) {
        response.serverError(res);
    }
}

exports.getGithubRepos = async (req, res, next) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        };

        request(options, (error, response, body) => {
            if (error) console.log(error);

            if (response.statusCode !== 200) {
                return res.status(400).json({ msg: 'No github profile found' });
            }
      
            res.json(JSON.parse(body));
        });
    } catch (err) {
        response.serverError(res, err.message);
    }
}

