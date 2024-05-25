const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
 const models = mongoose.models;

 // define the Schema (the structure of the article)
 const productSchema = new Schema({
   name: String,
   addres: String,
   phone: String,

 });

 // Create a model based on that schema
 const AdduserModal = models.Product || mongoose.model("Product", productSchema);

 // export the model
 module.exports = AdduserModal;