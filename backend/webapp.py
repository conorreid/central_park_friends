import datetime
import os

import dataset
from flask import Flask, request
from flask.json import jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
db = dataset.connect(os.getenv("DB_CONNECTION"))

friend_table = db["friends"]
vote_table = db["votes"]


@app.route("/api/v1.0/vote-count", methods=["GET"])
def get_vote_counts():
    # import ipdb; ipdb.set_trace()
    vote_count = db.query(
        """SELECT COUNT(votes.friend_id), friends.first_name, friends.last_name
        FROM votes RIGHT JOIN friends ON votes.friend_id::int=friends.id
        GROUP BY votes.friend_id, friends.first_name, friends.last_name
        ORDER BY COUNT(votes.friend_id) DESC"""
    )
    vote_count_list = []
    for vote in vote_count.result_proxy.fetchall():
        vote_dict = {"count": vote[0], "first_name": vote[1], "last_name": vote[2]}
        vote_count_list.append(vote_dict)
    response = jsonify({"data": vote_count_list})
    return response, 200


@app.route("/api/v1.0/friend-list", methods=["GET"])
def get_friends():
    friends = friend_table.all()
    friends_list = []
    for friend in friends:
        friends_list.append(dict(friend))
    response = jsonify({"data": friends_list})
    return response, 200


@app.route("/api/v1.0/friend", methods=["POST"])
def add_friend():
    """
    curl -X POST 0.0.0.0:5000/api/v1.0/friend \
        -d '{"first_name": "Jeff", "last_name": "Bezos", "net_worth": 164900000000}' \
        -H 'Content-Type: application/json'
    """
    data = request.json
    data["data_added"] = datetime.datetime.utcnow()
    friend_table.insert(data)
    return jsonify({"success": True}), 201


@app.route("/api/v1.0/vote", methods=["POST"])
def add_vote():
    """
    curl -X POST 0.0.0.0:5000/api/v1.0/vote \
        -d '{"friend_id": 1}' \
        -H 'Content-Type: application/json'
    """
    data = request.json
    data["data_added"] = datetime.datetime.utcnow()
    vote_table.insert(data)
    return jsonify({"success": True}), 201


@app.route("/healthcheck", methods=["GET"])
def healthcheck():
    return "Working", 200


if __name__ == "__main__":
    app.run(host="0.0.0.0")
