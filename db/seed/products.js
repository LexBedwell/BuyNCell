const base64Images = require('./base64Images')

module.exports = [
  {
    name: 'Regular Celery',
    description: 'This is basic celery.',
    price: 1.00,
    quantity: 100,
    photo: base64Images.regularCelery
  },
  {
    name: 'Regular Chopped Celery',
    description: 'This is basic chopped celery.',
    price: 1.50,
    quantity: 50,
    photo: base64Images.choppedCelery
  },
  {
    name: 'Regular Minced Celery',
    description: 'This is basic minced celery.',
    price: 1.75,
    quantity: 50,
    photo: base64Images.mincedCelery
  },
  {
    name: 'Premium Celery',
    description: 'This is premium celery.',
    price: 2.00,
    quantity: 100,
    photo: base64Images.regularCelery
  },
  {
    name: 'Premium Chopped Celery',
    description: 'This is premium chopped celery.',
    price: 2.50,
    quantity: 50,
    photo: base64Images.choppedCelery
  },
  {
    name: 'Premium Minced Celery',
    description: 'This is premium minced celery.',
    price: 2.75,
    quantity: 50,
    photo: base64Images.mincedCelery
  }
]
