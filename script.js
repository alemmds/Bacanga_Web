let products = [];
let selectedProductIndex = null;

function addProduct() {
    const name = document.getElementById('productName').value;
    const barcode = document.getElementById('barcode').value;
    const reference = document.getElementById('reference').value;
    const price = document.getElementById('price').value;

    if (name && barcode && reference && price) {
        const product = {
            name: name,
            barcode: barcode,
            reference: reference,
            price: price
        };

        products.push(product);
        updateTable();
        clearForm();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function clearForm() {
    document.getElementById('productForm').reset();
}

function updateTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.onclick = () => selectProduct(index);
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.barcode}</td>
            <td>${product.reference}</td>
            <td>${product.price}</td>
        `;
        tableBody.appendChild(row);
    });
}

function selectProduct(index) {
    selectedProductIndex = index;
    document.getElementById('editButton').disabled = false;
    document.getElementById('deleteButton').disabled = false;
}

function searchProduct() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchValue));

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    if (filteredProducts.length > 0) {
        filteredProducts.forEach((product, index) => {
            const row = document.createElement('tr');
            row.onclick = () => selectProduct(products.indexOf(product));
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.barcode}</td>
                <td>${product.reference}</td>
                <td>${product.price}</td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="4">Nenhum produto encontrado.</td></tr>';
    }
}

function editProduct() {
    if (selectedProductIndex !== null) {
        const product = products[selectedProductIndex];
        const newName = prompt("Alterar nome do produto:", product.name);
        const newBarcode = prompt("Alterar código de barras:", product.barcode);
        const newReference = prompt("Alterar referência:", product.reference);
        const newPrice = prompt("Alterar valor:", product.price);

        if (newName && newBarcode && newReference && newPrice) {
            products[selectedProductIndex] = {
                name: newName,
                barcode: newBarcode,
                reference: newReference,
                price: newPrice
            };
            updateTable();
            resetSelection();
        } else {
            alert("Todos os campos devem ser preenchidos.");
        }
    }
}

function deleteProduct() {
    if (selectedProductIndex !== null) {
        if (confirm("Tem certeza que deseja excluir este produto?")) {
            products.splice(selectedProductIndex, 1);
            updateTable();
            resetSelection();
        }
    }
}

function resetSelection() {
    selectedProductIndex = null;
    document.getElementById('editButton').disabled = true;
    document.getElementById('deleteButton').disabled = true;
}