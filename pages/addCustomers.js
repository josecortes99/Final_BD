export async function addCustomers() {
    window.location.hash = '#/addCustomers';
    const app = document.getElementById('app');
    const CUSTOMERS_URL = 'http://localhost:3000/customers';

    app.innerHTML = `
    
    <h2 class="mb-4">Agregar Paciente</h2>

    <!--Formulario -->
        <div class="container mt-5">
            <h4>Form addCustomer</h4>
            <form id="customer-form" class="card p-4 shadow-sm">
                <input type="hidden" id="user-id">
                    <div class="mb-3">
                        <label for="name" class="form-label">Customer Name</label>
                        <input required type="text" class="form-control" id="name" placeholder="name">
                    </div>
                    <div class="mb-3">
                        <label for="identification" class="form-label">Identification Number</label>
                        <input required type="number" class="form-control" id="identification" placeholder="identification">
                    </div>
                    <div class="mb-3">
                        <label for="address" class="form-label">Address</label>
                        <input required type="text" class="form-control" id="address" placeholder="address">
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label">Phone</label>
                        <input required type="text" class="form-control" id="phone" placeholder="phone">
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input required type="email" class="form-control" id="email" placeholder="email">
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Add Customer</button>
                    <a type="submit" href="#/customers" class="btn  w-100">Back</a>

            </form>
        </div>
        `

    const form = document.getElementById('customer-form');
    const name = document.getElementById('name');
    const identification = document.getElementById('identification');
    const address = document.getElementById('address');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = name.value;
        const identificacion = identification.value;
        const direccion = address.value;
        const telefono = phone.value;
        const correo = email.value;

        if (!nombre, !identificacion, !direccion, !telefono, !correo) {
            alert('Enter all fields');
            return;
        }

        const newCustomer = {
            customer_name: nombre,
            identification_number: identificacion,
            address: direccion,
            phone: telefono,
            email: correo
        }

        try {
            const res = await fetch(CUSTOMERS_URL, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCustomer)
            })
            alert('Successfully added');
            window.location.hash = '#/customers';
        } catch (error) {
            console.error('Error adding', error);
            alert('Error adding')
        }
        form.reset();
    });
}