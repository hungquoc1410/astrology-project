from flask import request, jsonify
from config import app, db
from models import Profile
import jyotishyamitra as jsm

STATUS_OK = "ok"
STATUS_ERROR = "error"


@app.route("/profiles", methods=["GET"])
def get_profiles():
    profiles = Profile.query.all()
    json_profiles = list(map(lambda x: x.to_json(), profiles))
    return jsonify({"status": STATUS_OK, "profiles": json_profiles})


@app.route("/create_profile", methods=["POST"])
def create_profile():
    name = request.json.get("name")
    gender = request.json.get("gender")
    year = request.json.get("year")
    month = request.json.get("month")
    day = request.json.get("day")
    place = request.json.get("place")
    longitude = request.json.get("longitude")
    lattitude = request.json.get("lattitude")
    timezone = request.json.get("timezone")
    hour = request.json.get("hour")
    min = request.json.get("min")
    sec = request.json.get("sec", "0")

    new_profile = Profile(
        name=name,
        gender=gender,
        year=year,
        month=month,
        day=day,
        place=place,
        longitude=longitude,
        lattitude=lattitude,
        timezone=timezone,
        hour=hour,
        min=min,
        sec=sec,
    )
    try:
        db.session.add(new_profile)
        db.session.commit()
    except Exception as e:
        return jsonify({"status": STATUS_ERROR, "error": str(e)}), 400

    return (
        jsonify(
            {
                "status": STATUS_OK,
                "message": "Profile created!",
                "profile": new_profile.to_json(),
            }
        ),
        201,
    )


@app.route("/update_profile/<int:profile_id>", methods=["PATCH"])
def update_profile(profile_id):
    profile = db.session.get(Profile, profile_id)

    if not profile:
        return jsonify({"message": "Profile not found"}), 404

    data = request.json
    profile.name = data.get("name", profile.name)
    profile.gender = data.get("gender", profile.gender)
    profile.year = data.get("year", profile.year)
    profile.month = data.get("month", profile.month)
    profile.day = data.get("day", profile.day)
    profile.place = data.get("place", profile.place)
    profile.longitude = data.get("longitude", profile.longitude)
    profile.lattitude = data.get("lattitude", profile.lattitude)
    profile.timezone = data.get("timezone", profile.timezone)
    profile.hour = data.get("hour", profile.hour)
    profile.min = data.get("min", profile.min)
    profile.sec = data.get("sec", profile.sec)

    db.session.commit()

    return (
        jsonify(
            {
                "status": STATUS_OK,
                "message": "Profile updated.",
                "profile": profile.to_json(),
            }
        ),
        200,
    )


@app.route("/delete_profile/<int:profile_id>", methods=["DELETE"])
def delete_profile(profile_id):
    profile = db.session.get(Profile, profile_id)

    if not profile:
        return jsonify({"message": "Profile not found"}), 404

    db.session.delete(profile)
    db.session.commit()

    return jsonify({"message": "Profile deleted!"}), 200


@app.route("/astrology/<int:profile_id>", methods=["GET"])
def get_astrology_profile_data(profile_id):
    try:
        profile = db.session.get(Profile, profile_id)
        if profile is None:
            return (
                jsonify(
                    {"status": STATUS_ERROR, "error": "Profile not found"}
                ),
                404,
            )
        jsm.clear_birthdata()
        jsm.input_birthdata(
            name=profile.name,
            gender=profile.gender,
            year=profile.year,
            month=profile.month,
            day=profile.day,
            place=profile.place,
            longitude=profile.longitude,
            lattitude=profile.lattitude,
            timezone=profile.timezone,
            hour=profile.hour,
            min=profile.min,
            sec=profile.sec,
        )
        jsm.validate_birthdata()
        if jsm.IsBirthdataValid():
            birthdata = jsm.get_birthdata()
            astrodata = jsm.generate_astrologicalData(
                birthdata, returnval="ASTRODATA_DICTIONARY"
            )
            return (
                jsonify(
                    {
                        "status": STATUS_OK,
                        "profile": profile.to_json(),
                        "astrodata": astrodata,
                    }
                ),
                200,
            )
        return (
            jsonify(
                {
                    "status": STATUS_ERROR,
                    "error": f"Invalid Profile Data: {jsm.validate_birthdata()}",
                }
            ),
            404,
        )
    except Exception as e:
        db.session.rollback()
        return jsonify({"status": STATUS_ERROR, "error": str(e)}), 500


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
