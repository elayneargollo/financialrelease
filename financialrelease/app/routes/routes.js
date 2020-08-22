/* Pendencia: Implementar o restante das rotas */


const express = require("express");
const transactionModel = require("../models/lancamento");

const app = express();

app.get("/all", async (req, res) => {
  try {
    const transaction = await transactionModel.find({});
    res.send(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.put("/transaction/:category", async (request, response) => {
  try {
    const transaction = await transactionModel.find(
      {category: request.params.category},
      request.body,
      { new: true }
    );
    if (!transaction) {
      return response.status(404).json({ error: "documento nao encontrado" });
    }

    return response.json(transaction);
  } catch (error) {
    return response.status(500).json({ error });
  }
});


app.get("/period/:yearMonth", async (request, response) => {

  try {

    const transaction = await transactionModel.find(

      {yearMonth: request.params.yearMonth},
      request.body,
      { new: true }
     
      );

    if (!transaction) {
      return response.status(404).json({ error: "documento nao encontrado" });
    }
 
    return response.json(transaction);
  } catch (error) {
    return response.status(500).json({ error });
  }
});


app.get("/saldo/:yearMonth", async (request, response) => {

  try {

    const transaction = await transactionModel.find(

      {yearMonth: request.params.yearMonth},
      request.body,
      { new: true }
     
      );
      
      const receita = transaction.filter((item) => {
        return item.type === '+'
      })

      const debito = transaction.filter((item) => {
        return item.type === '-'
      })

      const totalReceita = receita.reduce(getTotal, 0);
      const totalDebito = debito.reduce(getTotal, 0);

      function getTotal(total, item){
        return total + item.value
      }

      function saldo (){
        return totalReceita - totalDebito;
      }

  
    if (!transaction) {
      return response.status(404).json({ error: "documento nao encontrado" });
    }

    return response.json('Saldo: ' +saldo());
  } catch (error) {
    return response.status(500).json({ error });
  }
});


app.get("/saude/:yearMonth/:category", async (request, response) => {

  const { yearMonth, category} = request.params;

  try {

    const transaction = await transactionModel.find(

      {yearMonth, category},
      request.body,
      { new: true }
     
      );
      
    if (!transaction) {
      return response.status(404).json({ error: "documento nao encontrado" });
    }
 

    return response.json('Lancamento com Saúde: ' +transaction.length);

  } catch (error) {
    return response.status(500).json({ error });
  }
});


module.exports = app;

