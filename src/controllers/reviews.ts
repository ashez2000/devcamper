import { Request, Response } from 'express'

import { getAuthPayload } from '@/helpers/auth'
import * as reviewSrv from '@/services/reviews'

// path: POST /api/{ver}/bootcamps/{bootcampId}/reviews | private(user, admin)
export async function createReview(req: Request, res: Response) {
  const auth = getAuthPayload(req)
  const review = reviewSrv.createReview(req.params.bootcampId, req.body, auth)
  res.status(201).json({ review })
}

// path: GET /api/{ver}/bootcamps/{bootcampId}/reviews | public
// path: GET /api/{ver}/reviews | public
export async function getReviews(req: Request, res: Response) {
  if (req.params.bootcampId) {
    const reviews = await reviewSrv.findReviewsForBootcamp(
      req.params.bootcampId
    )

    res.status(200).json({ reviews })
    return
  }

  const reviews = reviewSrv.findReviews()
  res.status(200).json({ reviews })
}

// path: GET /api/{ver}/reviews/{id} | public
export async function getReview(req: Request, res: Response) {
  const review = reviewSrv.findReviewById(req.params.id)
  res.status(200).json({ review })
}

// path: PUT /api/{ver}/bootcamps/{id} | private(publisher, admin)
export async function updateReview(req: Request, res: Response) {
  const auth = getAuthPayload(req)
  const review = reviewSrv.updateReview(req.params.id, req.body, auth)
  res.status(200).json({ review })
}

// path: DELETE /api/{ver}/bootcamps/{id} | private(publisher, admin)
export async function deleteReview(req: Request, res: Response) {
  const auth = getAuthPayload(req)
  const bootcamp = reviewSrv.deleteReview(req.params.id, auth)
  res.status(200).json({ bootcamp })
}
