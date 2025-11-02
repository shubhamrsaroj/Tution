import serverless from 'serverless-http';
import express from 'express';
import app from '../server.js';

export const handler = async (event, context) => {
  const serverlessHandler = serverless(app);
  const result = await serverlessHandler(event, context);
  return result;
};
