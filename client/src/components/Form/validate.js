const nameRegex = /^[a-zA-Z\s]+$/;
const difficultyRegex = /^[1-5]$|^5$/;
const durationRegex = /^[1-9]$|^1[0-2]$/;
const errorRequire = "is a required field";

const validate = ({
    name,
    difficulty,
    duration,
    season,
    countries,
}) => {
    const errors = {};

    if (!name) {
        errors.name = `* Name ${errorRequire}`
    } else if (Number(name)) {
        errors.name = "Name cannot be a number"
    } else if (!nameRegex.test(name)) {
        errors.name = "Name does not accept special characters"
    } else if (name === undefined || name.length > 25) {
        errors.name = "Name does not accept more than 25 characters"
    }

    if (!difficulty) {
        errors.difficulty = `Difficulty ${errorRequire}`
    } else if (!difficultyRegex.test(difficulty)) {
        errors.difficulty = "Difficulty only accepts values from 1 to 5"
    }

    if (!durationRegex.test(duration)) {
        errors.duration = "The duration is only expressed in values of 12 hours"
    }

    if (!season) {
        errors.season = `Season ${errorRequire}`
    }

    if (countries === undefined || countries.length < 1) {
        errors.countries = "You must select at least one country"
    }

    return errors;
}


export default validate;