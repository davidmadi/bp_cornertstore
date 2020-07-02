var request = require('request');
var storeUrl = "https://api.bigcommerce.com/stores/2yqfdhr1rt";
var header = {
  "X-Auth-Client":"8vmo1zo787vqt7f5iwfcy2uv5rgl18g",
  "X-Auth-Token":"cic7ttbh3ehntr8e2x3ikom8ejg9eo9",
  "Content-Type":"application/json"
}
const davidProductId = 20906;
const davidVariantId = 20785;

function createCart(){
  return new Promise((resolve,reject)=>{
    var formData = {
      "line_items": [
        {
          "quantity": 2,
          "product_id": davidProductId,
          "variant_id": davidVariantId
        }
      ]
    };
  
    request({
      headers: header,
      uri: storeUrl+'/v3/carts',
      body: JSON.stringify(formData),
      method: 'POST'
    },
    function(err, res, body){
      resolve(JSON.parse(body));
    });  
  });
};

function createOrder(cardId){
  return new Promise((resolve,reject)=>{ 
    request({
      headers: header,
      uri: storeUrl+'/v3/checkouts/'+ cardId +'/orders',
      body: null,
      method: 'POST'
    },
    function(err, res, body){
      resolve(JSON.parse(body));
    });  
  });
};

function addBilling(cardId){
  return new Promise((resolve,reject)=>{
    var formData = {
      "first_name": "Jane",
      "last_name": "Doe",
      "email": "jane@email.com",
      "address1": "123 Main Street",
      "address2": "",
      "city": "Austin",
      "state_or_province": "Texas",
      "state_or_province_code": "TX",
      "country_code": "US",
      "postal_code": "78751",
      "phone": "1234567890"
    };
  
    request({
      headers: header,
      uri: storeUrl+'/v3/checkouts/'+cardId+'/billing-address',
      body: JSON.stringify(formData),
      method: 'POST'
    },
    function(err, res, body){
      resolve(JSON.parse(body));
    });  
  });
}


describe('server to server checkout test', () => {
  var cart = null;
  it('create a new cart with david product', async () => {	
    await createCart().then(cartData => {
      cart = cartData;
    });
    expect(cart.title).toBeUndefined();
    expect(cart).not.toBeNull();
    expect(cart.data).not.toBeNull();
    expect(cart.data.id).not.toBeNull();
  });

  it('add billing to cart', async () => {	
    await addBilling(cart.data.id).then(cartData => {
      cart = cartData;
    });

    expect(cart.title).toBeUndefined();
    expect(cart).not.toBeNull();
    expect(cart.data).not.toBeNull();
    expect(cart.data.id).not.toBeNull();
  });

  it('create order from cart', async () => {	
    var order = null;
    await createOrder(cart.data.id)
      .then(orderData => {
        order = orderData;
        console.log("Order created - ID:" + order.data.id);
    });
    expect(order.title).toBeUndefined();
    expect(order).not.toBeNull();
    expect(order.data).not.toBeNull();
    expect(order.data.id).not.toBeNull();
  });

});
