import { RequestHandler } from "express";

const protoParser: RequestHandler = (req, res, next) => {
  if (!req.is('application/protobuf')) return next();
  let buffer = [];
  req.on('data', (chunk) => {
    buffer.push(chunk);
  });
  req.on('end', () => {
    req.body = Buffer.concat(buffer);
    next();
  });
  req.on('error', (err) => {
    next(err);
  });
}

export default protoParser;