import mongodb from 'mongodb'

const ObjectId = mongodb.ObjectId//necesitamos ObjectId para convertir un id string en un objeto MongoDB id
let reviews

export default class ReviewsDAO{
    static async injectDB(conn){
        if(reviews){
            return
        }

        try{
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews')
        } catch (e) {
            console.log(`No es posible conectarse en ReviewsDAO.js: ${e}`)
        }
    }

    static async addReview( movieId, user, review, date ){
        try{
            const reviewDoc = {
                name: user.name,
                user_id: user.id,
                date: date,
                review: review,
                movie_id: ObjectId(movieId)
            }

            return await reviews.insertOne(reviewDoc)
        } catch (e) {
            console.error(`no es posible Post review: ${e}`)
            return { error: e }
        }
    }

    static async updateReview( reviewId, userId, review, date ){
        try{
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: ObjectId(reviewId) },
                { $set:{ review: review, date: date } }
            )

            return updateResponse
        } catch (e) {
            console.error(`No es posible Update Review: ${e}`)
            return { error: e }
        }
    }

    static async deleteReview( reviewId, userId ){
        try{
            const deleteResponse = await reviews.deleteOne(
                { _id: ObjectId(reviewId), user_id: userId }
            )

            return deleteResponse
        } catch (e) {
            console.error(`No es posible Delete Review: ${e}`)
            return { error: e }
        }
    }
}