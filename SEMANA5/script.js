document.addEventListener('DOMContentLoaded', () => {
    const imageUrlInput = document.getElementById('imageUrl');
    const addImageBtn = document.getElementById('addImageBtn');
    const deleteImageBtn = document.getElementById('deleteImageBtn');
    const imageGallery = document.getElementById('imageGallery');

    let selectedImage = null;

    // Función para agregar una imagen a la galería
    const addImageToGallery = (url) => {
        if (!url) {
            alert('Por favor, ingresa una URL de imagen válida.');
            return;
        }

        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Imagen de la galería';
        img.classList.add('adding'); // Clase para la animación de entrada

        // Se elimina el manejador de errores 'onerror' ya que las URLs de fallback también fallan
        // img.onerror = () => {
        //     console.error('Error al cargar la imagen:', url);
        //     img.src = 'https://dummyimage.com/150x150/CCCCCC/000000&text=Error+Carga'; // Este URL también fue problemático
        //     img.alt = 'Error al cargar la imagen';
        // };

        img.addEventListener('click', () => {
            // Deseleccionar la imagen previamente seleccionada, si existe
            if (selectedImage) {
                selectedImage.classList.remove('selected');
            }
            // Seleccionar la imagen actual
            img.classList.add('selected');
            selectedImage = img;
        });

        img.addEventListener('animationend', () => {
            img.classList.remove('adding');
        });

        imageGallery.appendChild(img);
        imageUrlInput.value = ''; // Limpiar el campo de texto
    };

    // Event listener para el botón "Agregar Imagen"
    addImageBtn.addEventListener('click', () => {
        const url = imageUrlInput.value.trim();
        addImageToGallery(url);
    });

    // Event listener para el botón "Eliminar Imagen Seleccionada"
    deleteImageBtn.addEventListener('click', () => {
        if (selectedImage) {
            selectedImage.classList.add('removing'); // Clase para la animación de salida
            selectedImage.addEventListener('animationend', () => {
                imageGallery.removeChild(selectedImage);
                selectedImage = null; // Restablecer la imagen seleccionada
            }, { once: true }); // El evento solo se ejecuta una vez
        } else {
            alert('Por favor, selecciona una imagen para eliminar.');
        }
    });

    // Event listener para el campo de texto (manejar Enter para agregar imagen)
    imageUrlInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const url = imageUrlInput.value.trim();
            addImageToGallery(url);
        }
    });

    // *** SOLUCIÓN APLICADA AQUÍ: Se usan solo las URLs que confirmamos que funcionan ***
    // Agrega algunas imágenes por defecto para probar que funcionan
    // Se elimina la imagen de placeholder.com que te daba problemas
    addImageToGallery('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80'); // Imagen de Unsplash (ajustada a 150x150)
    addImageToGallery('https://picsum.photos/id/237/150/150'); // Imagen de Lorem Picsum (muy útil para placeholders)
    // Puedes añadir más si encuentras otras URLs de imágenes que te funcionen
    // Por ejemplo, URLs de tus propias imágenes si las subes a un servicio de hosting, o más de Unsplash/Picsum.
});