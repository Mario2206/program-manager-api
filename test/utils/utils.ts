import {Request, Response} from "express"
import httpMocks from "node-mocks-http"
import sinon from "sinon"
import { CustomRequest } from "../../src/abstract/interface/int-express"


export function generateMockRequestResponse (reqContent = {}) : [CustomRequest, Response, sinon.SinonSpy]  {
    const request = httpMocks.createRequest(reqContent)
    const response = httpMocks.createResponse()
    response.json = jest.fn(()=>response)
    response.status = jest.fn(()=>response)
    return ([
        request,
        response,
        sinon.spy()
    ])
}