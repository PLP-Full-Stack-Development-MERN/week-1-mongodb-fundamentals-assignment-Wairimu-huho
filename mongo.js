/* Database and Collection Creation */
use Library
db.createCollection("books")

/* Insert Data */
db.books.insertMany([
    {title: "To Kill a Mockingbird", author: "Harper Lee",publishedYear: 1960, genre: "Fiction", ISBN: "0001"}, 
    {title: "1984", author: "George Orwell", publishedYear: 1949, genre: "Dystopian", ISBN: "0002"}, 
    {title: "The Hobbit", author: "J.R.R. Tolkien", publishedYear: 1937, genre: "Fantasy", ISBN: "0003"}, 
    {title: "The Road", author: "Cormac McCarthy", publishedYear: 2006, genre: "Post-Apocalyptic", ISBN: "0004"},
    {title: "Atomic Habits", author: "James Clear", publishedYear: 2019, genre: "Motivational", ISBN: "0005"}
])


/* Retrieve Data */
db.books.find()

db.books.find({author: "Cormac McCarthy"})

db.books.find({publishedYear: {$gt: 2000}})


/* Update Data */
db.books.updateOne(
    {ISBN: "0003"}, 
    {$set: {publishedYear: 2003}}
)

db.books.updateMany(
    {}, 
    {$set: {rating: 5.0}}
)


/* Delete Data */
db.books.deleteOne({ISBN: "0002"})

db.books.deleteMany({genre: "Fiction"})


/* Data Modeling Exercise*/
db.createCollection("users")
db.users.insertMany([
    {_id: ObjectId(), name: "Jane", email: "jane@gmail.com"}, 
    {_id: ObjectId(), name: "John", email: "john@gmail.com"}
])

db.createCollection("products")
db.products.insertMany([
    {_id: ObjectId(), name: "Laptop", inventory: 10, price: 12000}, 
    {_id: ObjectId(), name: "Keyboard", inventory: 5, price: 1000}, 
    {_id:ObjectId(), name: "Hp battery", inventory: 8, price: 800}, 
    {_id: ObjectId(), name: "router", inventory: 5, price: 4000}
])

db.createCollection("orders")
db.orders.insertMany([
    {
        _id: ObjectId(), 
        userId: ObjectId('67b5809d2eb444a5234d7946'), 
        products: [
            {productId: ObjectId('67b582732eb444a5234d794c'), quantity: 1, price: 12000}, 
            {productId: ObjectId('67b582732eb444a5234d794d'), quantity: 1, price: 1000}
        ], 
        totalAmount: 13000, 
        status: "processing"
    }, 
    {
        _id: ObjectId(), 
        userId: ObjectId('67b5809d2eb444a5234d7947'), 
        products: [
            {productId: ObjectId('67b582732eb444a5234d794e'), quantity: 2, price: 1600}, 
            {productId: ObjectId('67b582732eb444a5234d794f'), quantity: 1, price: 4000}
        ], totalAmount: 5600, 
        status: "processing"
    }
])


/*Aggregation Pipeline: */
db.books.aggregate([
    { $group: { _id: "$genre", count: { $sum: 1 } } }
  
])

db.books.aggregate([
    { $group: { _id: null, avgYear: { $avg: "$publishedYear" } } }
])
  
db.books.aggregate([
    { $sort: { rating: -1 } },  
    { $limit: 1 }                
])

/* Indexing */
db.books.createIndex({author: 1})
/* benefits 
Faster query execution
Reduced disk I/O
Optimized sorting operations
Support for efficient range queries
*/
  
  
  