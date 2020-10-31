import {Request, Response} from "express"
import httpMocks from "node-mocks-http"

export function generateMockRequestResponse (body = {}) : {request : Request, response : Response} {
    return ({
        request : httpMocks.createRequest(body),
        response : httpMocks.createResponse()
    })
}