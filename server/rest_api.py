from flask import Flask
from flask_restful import Resource, Api, reqparse
import json
import os
from flask import jsonify
from space import Space
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)

post_sequence_parser = reqparse.RequestParser()
post_sequence_parser.add_argument('location')
post_sequence_parser.add_argument('sequence_layer')

get_sequence_parser = reqparse.RequestParser()
get_sequence_parser.add_argument('location')

last_user_id = 0
space = Space()


class SequenceAPI(Resource):
    def get(self):
        global space

        args = get_sequence_parser.parse_args()
        location = args['location']

        hub = space.getClosestHub(location)
        object = hub.getHubObject()

        print(object)

        response = app.response_class(
            response=json.dumps(json.loads(json.dumps(object))),
            status=200,
            mimetype='application/json'
        )

        return response

    def post(self):
        global space

        args = post_sequence_parser.parse_args()
        location = args['location']
        print(location)
        sequence_layer = json.loads(args['sequence_layer'].replace("'", '"'))

        hub = space.getClosestHub(location)
        hub.updateLayer(sequence_layer["user_id"], sequence_layer["sound_id"], sequence_layer["rhythm"])
        save_json(str(hub.getLocation()) + ".hub", sequence_layer)
        return "Hub sequence updated."


class UserAPI(Resource):
    def get(self):
        global last_user_id
        last_user_id += 1
        save_user_last_id()
        return jsonify(user_id=last_user_id)


def save_json(name, data):
    with open(name, 'w') as f:
        json.dump(data, f, ensure_ascii=False)


def load_hub_files():
    hub_files = []
    files = [f for f in os.listdir('.') if os.path.isfile(f)]
    for f in files:
        if ".hub" in f:
            hub_files.append(f)
    return hub_files


def load_user_last_id():
    global last_user_id

    if os.path.isfile("user_id.txt"):
        with open("user_id.txt", 'r') as f:
            try:
                id = int(f.readlines()[0])
                last_user_id = id
            except:
                None


def save_user_last_id():
    global last_user_id
    with open("user_id.txt", 'w') as f:
        f.write(str(last_user_id))


api.add_resource(UserAPI, '/user_id')
api.add_resource(SequenceAPI, '/sequence')


if __name__ == '__main__':
    load_user_last_id()
    space.init(load_hub_files())
    app.run(host="130.229.135.119", port=5002)
    # app.run(port=5002)
