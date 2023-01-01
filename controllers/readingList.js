const Readinglist = require('../models/Readinglist')

module.exports = {
    getReadinglist: async (req,res)=>{
        console.log(req.user)
        try{
            const readingList = await Readinglist.find({userId: req.user.id})
            
            res.render('readingList.ejs', {readinglist: readingList})
            console.log('Readinglist rendered!')
        }catch(err){
            console.log(err)
        }
    },
    addToReadinglist: async (req, res)=>{
        try{
            await Readinglist.create({
                book:  req.body.book, 
                thumbnailImage: req.body.thumbnailImage, 
                userId: req.user.id,
                completed: false
            })
            console.log(req.body)
            console.log('Readinglist item has been added!')
            res.json('Added It')
        }catch(err){
            console.log(err)
        }
    },
    deleteReadinglistItem: async (req, res)=>{
        console.log(req.body.listItemIdFromJSFile)
        try{
            await Readinglist.findOneAndDelete({_id:req.body.listItemIdFromJSFile})
            console.log('Deleted Item')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    