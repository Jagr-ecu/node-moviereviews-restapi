import ReviewsDAO from '../dao/reviewsDAO.js'

export default class ReviewsController{

    static async apiPostReview(req, res, next){
        try{
            const movieId = req.body.movieId
            const review = req.body.review
            const userInfo = {
                name: req.body.name,
                id: req.body.userId 
            }

            const date = new Date()

            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                userInfo,
                review,
                date
            )

            res.json({ status: "success"} )
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateReview(req, res, next){
        try{
            const reviewId = req.body.reviewId
            const review = req.body.review

            const date = new Date()

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.userId,
                review,
                date
            )

            var { error } = reviewResponse
            if( error ){
                res.status.json({error})
            }

            if(reviewResponse.modifiedCount === 0){
                throw new Error ("No fue posible actualizar la reseña. El usuario puede que no sea el autor original")
            }

            res.json({ status: "success" })
            
        }catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteReview(req, res, next){
        try{
            const reviewId = req.body.reviewId
            const userId = req.body.userId

            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId
            )

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}