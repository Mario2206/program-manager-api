import {Request, Response} from "express"
import httpMocks from "node-mocks-http"

export function generateMockRequestResponse (reqContent = {}) : [Request, Response, ()=>void]  {
    return ([
        httpMocks.createRequest(reqContent),
        httpMocks.createResponse(),
        jest.fn()
    ])
}