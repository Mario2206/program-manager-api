import {Request, Response} from "express"
import httpMocks from "node-mocks-http"
import sinon from "sinon"

export function generateMockRequestResponse (reqContent = {}) : [Request, Response, sinon.SinonSpy]  {
    return ([
        httpMocks.createRequest(reqContent),
        httpMocks.createResponse(),
        sinon.spy()
    ])
}