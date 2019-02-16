import os
from flask import request, jsonify
from flask_restplus import Namespace, Resource, fields

route = Namespace('experience', description='experience related operations')

experienceModel = route.model('Experience', {
    'text': fields.String(required=True),
    'id': fields.String(required=True)
})

responseModel = route.model('Response', {
    'ok': fields.Boolean(required=True),
    'data': fields.Nested(experienceModel)
})


@route.route('')
class Experients(Resource):

    @route.marshal_with(responseModel)
    def get(self):
        exp_id = request.args['id']
        exp = {
            'id': exp_id,
            'text': 'dummy experience text'
        }
        return {'ok': True, 'data': exp}
