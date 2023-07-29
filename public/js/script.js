const form = document.getElementById("orderForm");
const orderList = document.getElementById("orderList");

async function submitOrder() {
  const menu = document.getElementById('menu').value;
  const price = document.getElementById('price').value;
  const tableNo = document.getElementById('tableNo').value;
  
  if (price.trim() === '' || isNaN(parseFloat(price))) {
    alert('Please enter a valid price.');
    return;
  }

  const order = {
    menu,
    price,
    tableNo,
  };

  try {
    const response = await axios.post('http://localhost:4000/get/order', order);
    console.log(response.data);
    fetchOrders();
    clearFormFields();
  } catch (error) {
    console.error('Error:', error);
  }
}

function clearFormFields() {
  document.getElementById('menu').value = '';
  document.getElementById('price').value = '';
  document.getElementById('tableNo').value = '';
}

async function deleteOrder(orderId) {
  try {
    const response = await axios.delete(`http://localhost:4000/get/order/${orderId}`);
    console.log(response.data);
    removeOrderFromUI(orderId);
  } catch (error) {
    console.error('Error:', error);
  }
}

function removeOrderFromUI(orderId) {
  const orderItem = document.getElementById(`order-${orderId}`);
  if (orderItem) {
    orderItem.remove();
  }
}

async function fetchOrders() {
  try {
    const response = await axios.get('http://localhost:4000/get/orders');
    const data = response.data;

    // Group orders by table number
    const ordersByTable = data.reduce((acc, order) => {
      if (!acc[order.tableNo]) {
        acc[order.tableNo] = [];
      }
      acc[order.tableNo].push(order);
      return acc;
    }, {});

    // Display orders on the webpage
    orderList.innerHTML = '';

    // Generate HTML for each table's orders
    for (const tableNo in ordersByTable) {
      const orders = ordersByTable[tableNo];
      const tableOrdersHTML = orders
        .map((order) => {
          return `
            <div class="row order-item" id="order-${order.id}">
              <div class="col">
                <p>Menu: ${order.menu}</p>
              </div>
              <div class="col">
                <p>Price: $${order.price}</p>
              </div>
              <div class="col">
                <p>Table No: ${order.tableNo}</p>
              </div>
              <div class="col">
                <button onclick="deleteOrder(${order.id})" class="btn btn-danger">Delete</button>
              </div>
            </div>
          `;
        })
        .join('');

      // Create a heading for the table
      const tableHeading = document.createElement('h3');
      tableHeading.innerText = `Table ${tableNo}`;
      orderList.appendChild(tableHeading);

      // Append the orders under the table heading
      orderList.insertAdjacentHTML('beforeend', tableOrdersHTML);
    }

    if (data && data.length === 0) {
      orderList.innerHTML = '<p>No orders yet.</p>';
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
}

// Fetch initial orders on page load
fetchOrders();
