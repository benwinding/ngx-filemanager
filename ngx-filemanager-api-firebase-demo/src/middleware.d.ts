import { NextFunction, Response, Request } from 'express';
export declare function AddCors(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function LogRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
