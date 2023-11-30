var productData = [];

function addProduct() {
    var pname = document.querySelector('#pName').value;
    var sellingP = document.querySelector('#sellingP').value;
    var category = document.querySelector('#category').value;

    const newProduct = {
        pname,
        sellingP,
        category,
    };

    productData.push(newProduct);

    axios.post("https://crudcrud.com/api/f68d3cf14f96410b983d2d1b07798513/Store_data", newProduct)
        .then((response) => {
            showData(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
}

function showData(data) {
    var productList = document.getElementById('productList');
    productList.innerHTML = '';

    if (data !== null) {
        data.forEach(function (product, index) {
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(`Name: ${product.pname}, Price: $${product.sellingP}, Category: ${product.category}`));

            var editBtn = document.createElement('button');
            editBtn.appendChild(document.createTextNode('EDIT'));
            li.appendChild(editBtn);
            editBtn.style.marginRight = '5px';
            editBtn.style.marginLeft = '5px';
            editBtn.onclick = function () {
                editProduct(index, data);
            };

            var deleteBtn = document.createElement('button');
            deleteBtn.appendChild(document.createTextNode(' X '));
            deleteBtn.marginLeft='5px';
            deleteBtn.onclick = function () {
                deleteProduct(index, data);
            };
            li.appendChild(deleteBtn);

            productList.appendChild(li);
        });
    }
}

function editProduct(index, data) {
    var product = data[index];

    var newPname = prompt('Enter new product name', product.pname);
    var newSellingP = prompt('Enter new selling price', product.sellingP);
    var newCategory = prompt('Enter new category', product.category);

    if (newPname !== null && newSellingP !== null && newCategory !== null) {
        product.pname = newPname;
        product.sellingP = newSellingP;
        product.category = newCategory;

        
        axios.put(`https://crudcrud.com/api/f68d3cf14f96410b983d2d1b07798513/Store_data/${product._id}`, product)
            .then((response) => {
                showData(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get(`https://crudcrud.com/api/f68d3cf14f96410b983d2d1b07798513/Store_data`)
        .then((response) => {
            showData(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
});

function deleteProduct(index, data) {
    var productId = data[index]._id; 
    axios.delete(`https://crudcrud.com/api/f68d3cf14f96410b983d2d1b07798513/Store_data/${productId}`)
        .then((response) => {
            showData(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
}

