import { Request, Response } from 'express'
import { formatResponse } from '../../libs'

export function generalPathMatch(req: Request, res: Response) {
  try {
    return formatResponse({
      codice: 'E01',
      res,
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponse({
      codice: 'E02',
      res,
    })
  }
}
