 // inicio de index2 galeria

 /*Muestra una imagen aleatoria de un perro y su raza: Al hacer clic en un botón, se obtiene una imagen aleatoria de un perro de la API de Dog CEO. Esta imagen se muestra y se extrae el nombre de la raza del enlace de la imagen, que luego se muestra con un estilo específico.*/

// Función para obtener las fotos de los perros de la API de Dog CEO y mostrarlos 
document.getElementById('randomDogButton').addEventListener('click', function() {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            document.getElementById('randomDogImage').src = data.message;
            // Extraer el nombre de la raza del enlace de la imagen
            const breed = data.message.split('/')[4];
            // Formatear el nombre de la raza
            const formattedBreed = breed.replace('-', ' ');
            document.getElementById('breedName').innerText = "Raza: " + formattedBreed;
           // esto es el tamaño color y caja de la letra que describe la raza del enlace de la imagen
document.getElementById('breedName').style.fontSize = "larger";
document.getElementById('breedName').style.backgroundColor = "black";
document.getElementById('breedName').style.color = "white";
document.getElementById('breedName').style.padding = "5px 10px";
document.getElementById('breedName').style.borderRadius = "5px";
        })
        .catch(error => console.error('Error al obtener la imagen:', error));
});

/*Carga y muestra una lista de razas de perros en una tabla: Al cargar la página, se obtienen datos de todas las razas de perros de la API de Dog CEO. Estos datos se muestran en una tabla con la ayuda de DataTables, una biblioteca de jQuery.*/

// Función para obtener datos de la API de Dog CEO y mostrarlos en la tabla
 $(document).ready(function() {
     function loadDogCeoData() {
         $.ajax({
             url: 'https://dog.ceo/api/breeds/list/all',
             method: 'GET',
             success: function(response) {
                 if (response.status === 'success') {
                     const breeds = response.message;
                     let data = [];
                     let id = 1;
                     for (let breed in breeds) {
                         data.push({ id: id++, name: breed, subBreeds: breeds[breed].join(', ') });
                     }
                     $('#apiDataTable').DataTable({
                         data: data,
                         columns: [
                             { data: 'id' },
                             { data: 'name' },
                             { data: 'subBreeds' }
                         ],
                         dom: 'Bfrtip',
                         buttons: [
                             'copy', 'csv', 'excel', 'pdf', 'print', 'colvis'
                         ]
                     });
                 }
             },
             error: function(error) {
                 console.error('Error al obtener los datos de la API de Dog CEO', error);
             }
         });
     }
 
     // Cargar los datos al cargar la página
     loadDogCeoData();
 });

 // fin de index2

  // inicio de index4

/* este código permite a los usuarios agregar y eliminar filas de una tabla utilizando un formulario de entrada de datos.  */

  
  /*eliminarFila(element): Esta función toma un elemento HTML como argumento y elimina la fila
   de la tabla en la que se encuentra el elemento. element.parentElement.parentElement.remove(); 
  elimina el abuelo del elemento, que en este caso sería la fila (<tr>) de la tabla.*/
 function eliminarFila(element){
      element.parentElement.parentElement.remove();
  }


  /*agregarFila(): Esta función muestra un formulario de 
entrada de datos utilizando la biblioteca SweetAlert2. 
El formulario incluye campos para el nombre del médico, 
el nombre de la mascota, la fecha del control, el precio de 
la consulta, la fecha del próximo control y las observaciones.
Cuando se hace clic en el botón ‘Aceptar’, se recogen los valores 
de los campos del formulario y se llama a la función agregarFilaTabla() 
si todos los campos requeridos están llenos.   */
  function agregarFila() {
      Swal.fire({
          title: "<strong><u>Formulario de ingreso</u></strong>",
          // icono del formulario
          icon: "info",
          //  formulario html de ingreso 
          html: `<div class="card border-dark mb-3" style="max-width: 100%;">
              <div class="card-body text-dark">
                  <div class="mb-3">
                      <label for="medico" class="form-label">Nombre del Medico</label>
                      <input class="form-control" type="text" id="medico" required>
                  </div>
                  <div class="mb-3">
                      <label for="mascota" class="form-label">Nombre de la Mascota</label>
                      <input class="form-control" type="text" id="mascota" required>
                  </div>
                  <div class="mb-3">
                      <label for="fechaControl" class="form-label">Fecha del Control</label>
                      <input class="form-control" type="date" id="fechaControl" required>
                  </div>
                  <div class="mb-3">
                      <label for="precio" class="form-label">Precio de la Consulta</label>
                      <input class="form-control" type="number" id="precio" required>
                  </div>
                  <div class="mb-3">
                      <label for="proxControl" class="form-label">Fecha del Próximo Control</label>
                      <input class="form-control" type="date" id="proxControl" required>
                  </div>
                  <div class="mb-3">
                      <label for="observaciones" class="form-label">Observaciones</label>
                      <input class="form-control" type="text" id="observaciones">
                  </div>
              </div>
          </div>
          `,
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          preConfirm: () => {
              const medico = document.getElementById('medico').value;
              const mascota = document.getElementById('mascota').value;
              const fechaControl = document.getElementById('fechaControl').value;
              const precio = document.getElementById('precio').value;
              const proxControl = document.getElementById('proxControl').value;
              const observaciones = document.getElementById('observaciones').value;

              if (medico && mascota && fechaControl && precio && proxControl) {
                  agregarFilaTabla(medico, mascota, fechaControl, precio, proxControl, observaciones);
              } else {
                  Swal.showValidationMessage('Todos los campos excepto observaciones son obligatorios');
              }
          },
          cancelButtonText: 'Cancelar',
      });
  }

/*agregarFilaTabla(medico, mascota, fechaControl, precio, proxControl, observaciones): Esta función toma los valores de los campos del formulario como argumentos y agrega una nueva fila a la tabla con esos valores. También agrega un botón ‘Eliminar’ a la fila que, cuando se hace clic, llama a la función eliminarFila() para eliminar esa fila.   */
  function agregarFilaTabla(medico, mascota, fechaControl, precio, proxControl, observaciones) {
      const table = document.getElementById('controlesMedicos').getElementsByTagName('tbody')[0];
      const newRow = table.insertRow();

      newRow.innerHTML = `
          <td>${medico}</td>
          <td>${mascota}</td>
          <td>${fechaControl}</td>
          <td>${precio}</td>
          <td>${proxControl}</td>
          <td>${observaciones}</td>
          <td><button onclick="eliminarFila(this)" class="btn btn-outline-danger">Eliminar</button></td>
      `;
  }

  // fin de index4









