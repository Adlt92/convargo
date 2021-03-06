'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
  }, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
  }, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
  }, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
  }, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
  }, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
  }, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

function PrintConsole(tab){
  tab.forEach(function(element){
      console.log(element);
  });
}

function CommissionPrice(element){
  var commission = (element.price * 30)/ 100;
  var distance = element.distance;
  var volume = element.volume;
  var insurance = commission/2;
  insurance = insurance.toFixed(2);
  var treasury = element.distance / 500;
  treasury = treasury.toFixed(2);
  var convargo = commission - insurance - treasury;
  if(element.options.deductibleReduction == true){
    element.price += volume;
    element.commission.convargo += volume;
  }
  convargo = convargo.toFixed(2);
  //save
  element.commission.insurance = insurance;
  element.commission.treasury = treasury;
  element.commission.convargo = convargo;
}

function DiscountEvaluation(volume){
  var decrease = 0;
  if(volume >5){
    decrease = 10;
    if(volume >10){
       decrease = 30;
      if(volume >25){
        decrease  =50;
      }
    }
  }
  return decrease;
}

function ShippingPrice(){
  var discount;
  var priceVolume;
  deliveries.forEach(function(deli) {
    truckers.forEach(function(truck) {
      if(truck.id == deli.truckerId){
        discount = DiscountEvaluation(deli.volume);
        priceVolume = deli.volume * truck.pricePerVolume;
        deli.price  = (priceVolume - (priceVolume * discount)/100 ) + ( deli.distance * truck.pricePerKm);
      }
    });
    CommissionPrice(deli);
  });
}

function Payment(){
  deliveries.forEach(function(deli) {
    actors.forEach(function(actor) {
      if(deli.id == actor.deliveryId){
        actor.payment.forEach(function(pay){
          if(pay.who == "shipper"){
            pay.amount = deli.price;
          }
          if(pay.who == "trucker"){
            pay.amount = deli.price - ((deli.price * 30)/ 100);
          }
          if(pay.who == "insurance"){
            pay.amount = deli.commission.insurance;
          }
          if(pay.who == "treasury"){
            pay.amount = deli.commission.treasury;
          }
          if(pay.who == "convargo"){
            pay.amount = deli.commission.convargo;
          }
        });
      }
    });
  });
}

ShippingPrice();
Payment();
PrintConsole(deliveries);
PrintConsole(actors);
