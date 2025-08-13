export async function customers(params) {
    window.location.hash = '#/customers';

    const app = document.getElementById('app');
    const CUSTOMERS_URL = 'http://localhost:3000/customers';

    app.innerHTML = `

        <div class="container-fluid">
            <div class="row">
                <!-- Sidebar -->
                <div class="col-md-3 col-lg-2 sidebar">
                    <h2>ExpertSoft</h2>
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Avatar" class="avatar">

                        <ul class="nav nav-tabs mb-4 border-0 flex-column">
                            <li class="nav-item">
                                <a href="#/customers" class="btn btn-purple w-75 my-2" data-link>
                                    <i class="bi bi-card-checklist me-2"></i> Customers
                                </a>
                        </ul>
                </div>

                <!-- Main Content -->
                <div class="col-md-9 col-lg-10">
                    <main class="p-4">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h2 class="fw-bold">Customers</h2>
                            <a class="btn btn-purple" href="#/addCustomers" >Add Customers</a>
                        </div>

                        <!-- Tabla -->
                        <div>
                            <table class="table table-bordered table-hover align-middle text-center">
                                <thead class="table-dark">
                                    <tr>
                                        <th>customer_id</th>
                                        <th>customer_name</th>
                                        <th>identification_number</th>
                                        <th>address</th>
                                        <th>phone</th>
                                        <th>email</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="table-customers"></tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        </div>
        `

    try {
        const tbody = document.getElementById('table-customers');
        const res = await fetch(CUSTOMERS_URL);
        const data = await res.json();

        tbody.innerHTML = ``;

        data.forEach(e => {
            tbody.innerHTML += `
            <tr>
                <td>${e.customer_id}</td>
                <td>${e.customer_name}</td>
                <td>${e.identification_number}</td>
                <td>${e.address}</td>
                <td>${e.phone}</td>
                <td>${e.email}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="Delete('${e.customer_id}')">Eliminar</button>
                    <button class="btn btn-sm btn-warning" onclick="Update('${e.customer_id}')">Actualizar</button>
                </td>
            </tr>
            `

        });

    } catch (error) {
        console.error('Error getting customers', error);
        alert('Error getting customers');
    }

    window.Delete = async function (id) {
        const confirmar = confirm("Safe to delete");
        if (!confirmar) return;

        try {
            const res = await fetch(`${CUSTOMERS_URL}/${id}`, {
                method: 'DELETE'
            });
            alert("Success delete");
            customers();
        } catch (error) {
            console.error("Delete error", error);
            alert("Delete error");
        }
    };

    window.Update = async function (id) {
        const confirmar = confirm("want to update");
        if (!confirmar) return;
        try {
            const res = await fetch(`${CUSTOMERS_URL}/${id}`);
            const customer = await res.json();

            const newName = prompt("Name:", customer.customer_name);
            const newIdentification = prompt("Identification:", customer.identification_number);
            const newAddress = prompt("Address:", customer.address);
            const nuwPhone = prompt("Phone:", customer.phone);
            const newEmail = prompt("Email:", customer.email);

            if (!newName || !newIdentification || !newAddress || !nuwPhone || !newEmail) {
                alert("You must complete all fields");
                return;
            }

            const updateRes = await fetch(`${CUSTOMERS_URL}/${id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer_name: newName,
                    identification_number: newIdentification,
                    address: newAddress,
                    phone: nuwPhone,
                    email: newEmail,
                })
            });
            alert("Customer updated successfully");
            customers();

        } catch (error) {
            console.error("Error updating", error);
            alert("Error updating");
        }
    };

}