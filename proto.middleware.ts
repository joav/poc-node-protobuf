import { Request, RequestHandler, Response } from "express";
import { HelloRequest, HelloResponse } from "./proto-bundle";
import * as $protobuf from "protobufjs";

export interface ProtoResponse extends Response<Uint8Array|string> {
    proto(msg: HelloResponse): ProtoResponse;
}
export interface ProtoRequest extends Request<any, any, HelloRequest> {}

interface InProtoRequest extends Request<any, any, Buffer | HelloRequest> {}

const proto: RequestHandler = (req: InProtoRequest, res: ProtoResponse, next) => {
    try {
        const helloRequest = HelloRequest.decode(req.body as Buffer);
        req.body = helloRequest;
    } catch (error) {
        if (error instanceof $protobuf.util.ProtocolError) {
            return res.status(400)
                .send('API_ERROR(decode): ' + error.message);
        }
        return res.status(500)
        .send('API_ERROR(decode): ' + error.message);
    }

    res.proto = (msg) => {
        try {
            const buffer = HelloResponse.encode(msg).finish();
            res.header('Content-Type', 'application/protobuf; proto=com.joav.HelloResponse');
            return res.send(buffer);
        } catch (error) {
            if (error instanceof $protobuf.util.ProtocolError) {
                return res.status(400)
                    .send('API_ERROR(encode): ' + error.message+typeof req.body);
            }
            return res.status(500)
            .send('API_ERROR(encode): ' + error.message);
        }
    };

    next();
    
}

export default proto;