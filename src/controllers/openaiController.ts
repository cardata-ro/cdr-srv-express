import { Request, Response, NextFunction } from 'express';
import openaiService from '../services/openaiService';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';


/*
const MAINTENANCE_CAR =  "You are a car maintenance expert focused on providing precise and detailed maintenance schedules for specific car models." +
"Each task should include recommended actions, intervals (in kilometers (km) or time (years or months))" +
"Be precise and dynamic, tailoring your responses to the specific car model and user request." +
"Ensure your recommendations include:" +
"1. Regular maintenance tasks like oil change, brake pads, air filter, cabin filter, fuel filter, and tire pressure checks, with clear intervals "+
"2. Periodic checks for fluids (transmission fluid, brake fluid, coolant) and components like spark plugs, with intervals" +
"3. Maintenance for major components (e.g., timing belt, water pump, turbocharger, differential oil)"+
"The HTML should:"+
" 1. Avoid overcomplicated structures, using simple and clear tags such as like &lt;h1&gt;, &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, and &lt;li&gt;."

*/

const CAR_PROBLEM ="You are an expert in automobile diagnostics and vehicle history analysis. " +
    "Provide a detailed list of the most common problems and known issues for the following car model." +
    "Return the list in a clear and concise format, including the problem description, symptoms, and potential solutions. " +
    "Do not return generic car problems. Provide only the specific issues related to the car model and details requested by the user."+
    "Ensure the list is up-to-date and relevant to the specific car model. Avoid overcomplicated structures, using simple and clear tags such as like &lt;h1&gt;, &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, and &lt;li&gt;."
// @ts-ignore
export const generateText = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      throw new AppError('Prompt is required', 400);
    }
    const generatedText = await openaiService.generateText(prompt,CAR_PROBLEM);
    res.json({ result: generatedText });
  } catch (error) {
    logger.error('Error in generateText controller:', error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

// @ts-ignore
export const generateImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      throw new AppError('Prompt is required', 400);
    }
    
    const imageUrl = await openaiService.generateImage(prompt);
    res.json({ result: imageUrl });
  } catch (error) {
    logger.error('Error in generateImage controller:', error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};