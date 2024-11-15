// Array para almacenar las tareas
let tareas = [
    { id: 1, descripcion: "Diseño Gráfico", completado: false },
    { id: 2, descripcion: "Developer Front-end", completado: false },
    { id: 3, descripcion: "Diseño UX/UI", completado: false }
];

// Referencias a los elementos del DOM
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const tasksList = document.getElementById('tasks-list');
const totalTasks = document.getElementById('total-tasks');
const completedTasks = document.getElementById('completed-tasks');

// Función para renderizar las tareas en la tabla
function renderTareas() {
    // Limpiar la lista actual
    tasksList.innerHTML = '';

    // Recorrer el arreglo de tareas y crear filas en la tabla
    tareas.forEach((tarea, index) => {
        const fila = document.createElement('tr');

        // Columna ID
        const colId = document.createElement('td');
        colId.textContent = tarea.id;
        fila.appendChild(colId);

        // Columna Descripción
        const colDescripcion = document.createElement('td');
        colDescripcion.textContent = tarea.descripcion;
        // Aplicar estilo si está completada
        if (tarea.completado) {
            colDescripcion.classList.add('completed-task');
        }
        fila.appendChild(colDescripcion);

        // Columna Completada (Checkbox)
        const colCompletada = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarea.completado;
        checkbox.addEventListener('change', () => toggleCompletado(tarea.id));
        colCompletada.appendChild(checkbox);
        fila.appendChild(colCompletada);

        // Columna Eliminar (Botón)
        const colEliminar = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-task');
        deleteButton.addEventListener('click', () => eliminarTarea(tarea.id));
        colEliminar.appendChild(deleteButton);
        fila.appendChild(colEliminar);

        // Agregar la fila a la tabla
        tasksList.appendChild(fila);
    });

    // Actualizar los contadores
    actualizarContadores();
}

// Función para agregar una nueva tarea
function agregarTarea() {
    const descripcion = taskInput.value.trim();

    // Validar que el input no esté vacío
    if (descripcion === '') {
        alert('Por favor, ingresa la tarea.');
        return;
    }

    // Crear un nuevo objeto de tarea
    const nuevaTarea = {
        id: generarId(),
        descripcion: descripcion,
        completado: false
    };

    // Agregar la nueva tarea al arreglo
    tareas.push(nuevaTarea);

    // Limpiar el input
    taskInput.value = '';

    // Renderizar las tareas nuevamente
    renderTareas();
}

// Función para eliminar una tarea
function eliminarTarea(id) {
    // Filtrar el arreglo para eliminar la tarea con el id específico
    tareas = tareas.filter(tarea => tarea.id !== id);

    // Renderizar las tareas nuevamente
    renderTareas();
}

// Función para alternar el estado de completado de una tarea
function toggleCompletado(id) {
    tareas = tareas.map(tarea => {
        if (tarea.id === id) {
            return { ...tarea, completado: !tarea.completado };
        }
        return tarea;
    });

    // Renderizar las tareas nuevamente
    renderTareas();
}

// Función para actualizar los contadores de tareas
function actualizarContadores() {
    totalTasks.textContent = tareas.length;
    const completadas = tareas.filter(tarea => tarea.completado).length;
    completedTasks.textContent = completadas;
}

// Función para generar un ID único para cada tarea
function generarId() {
    return tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1;
}

// Agregar evento al botón de agregar tarea
addTaskButton.addEventListener('click', agregarTarea);

// Agregar evento para agregar tarea al presionar 'Enter' en el input
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        agregarTarea();
    }
});

// Renderizar las tareas iniciales al cargar la página
document.addEventListener('DOMContentLoaded', renderTareas);
