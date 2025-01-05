from flask import request, jsonify
from config import app, db
from models import Category
from datetime import datetime

@app.route("/ctgs", methods=["GET"])
def get_ctgs():
    ctgs = Category.query.all()
    json_ctgs = list(map(lambda x: x.to_json(), ctgs))
    return jsonify({"ctgs": json_ctgs})

@app.route("/create_ctg", methods=["POST"])
def create_ctg():
    name = request.json.get("name")

    colour = request.json.get("colour")

    if not name or not colour:
        return (
            jsonify({"message": "You forgot to include smth"}),
            400
        )
    new_ctg = Category(name=name, colour=colour)
    try:
        db.session.add(new_ctg)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": {str(e)}}), 400

    return  jsonify({"message": "Category created!"}), 201

@app.route("/update_ctg/<int:ctg_id>", methods=["PATCH"])
def upadet_ctg(ctg_id):
    ctg = Category.query.get(ctg_id)

    if not ctg:
        return jsonify({"message": "Category not found"}), 404

    data = request.json
    ctg.name = data.get("name", ctg.name)
    ctg.time = datetime.strptime(data.get("time", ctg.time), "%H:%M:%S").time()
    ctg.colour = data.get("colour", ctg.colour)

    db.session.commit()

    return jsonify({"message": "Category updated"}), 200

@app.route("/delete_ctg/<int:id>", methods=["DELETE"])
def delete_ctg(id):
    ctg = Category.query.get(id)

    if not ctg:
        return jsonify({"message": "Category not found"}), 404

    db.session.delete(ctg)
    db.session.commit()

    return jsonify({"message": "User deleted"}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()


    app.run(host='127.0.0.1', port=2320)