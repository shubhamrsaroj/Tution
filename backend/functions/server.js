import serverless from 'serverless-http';
import express from 'express';
import app from '../server.js';

lethandler = serverless(app);

export const handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
