import {Request, Response} from "express"
import httpMocks from "node-mocks-http"
import sinon from "sinon"
import { CustomRequest } from "../../src/abstract/int-request"

export function generateMockRequestResponse (reqContent = {}) : [CustomRequest, Response, sinon.SinonSpy]  {
    return ([
        httpMocks.createRequest(reqContent),
        httpMocks.createResponse(),
        sinon.spy()
    ])
}