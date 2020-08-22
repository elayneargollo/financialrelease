// Pendencia: tornar todos os campos obrigatorios

const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  description: String,
  value: Number,
  category: String,
  year: Number,
  month: Number,
  day: Number,
  yearMonth: String,
  yearMonthDay: String,
  type: String,
});

const transactionModel = mongoose.model('transaction', transactionSchema);

module.exports = transactionModel;
