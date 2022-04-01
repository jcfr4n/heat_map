# Visualiza datos con un mapa de calor

## Objetivo: Construye una aplicación en CodePen.io que funcionalmente sea similar a [esta:](https://codepen.io/freeCodeCamp/full/JEXgeY).

### Completa las siguientes historias de usuario y consigue que pasen todas las pruebas. Dale tu propio estilo personal.

Puedes utilizar HTML, JavaScript, CSS y la librería D3 de visualización basada en svg. Los elementos DOM obligatorios (no virtuales) son consultados en el momento de cada prueba. Si usas un framework frontend (como por ejemplo Vue), los resultados de la prueba pueden ser inexactos para el contenido dinámico. Esperamos poder adaptarlos eventualmente, pero por ahora estos frameworks no son soportados por los proyectos con D3.

**Historia de usuario #1**: Mi mapa de calor debe tener un título con su correspondiente id="title".

**Historia de usuario #2**: Mi mapa de calor debe tener una descripción con su correspondiente id="description".

**Historia de usuario #3**: Mi mapa de calor debe tener un eje-x con su correspondiente id="x-axis".

**Historia de usuario #4**: Mi mapa de calor debe tener un eje-y con su correspondiente id="y-axis".

**Historia de usuario #5**: Mi mapa de calor debe tener elementos rect con una class="cell" que representen los datos.

**Historia de usuario #6**: Debe haber al menos 4 colores de relleno usados para las celdas.

**Historia de usuario #7**: Cada celda tendrá las propiedades de data-month, data-year y data-temp que contengan sus correspondientes valores de month, year, y temperature.

**Historia de usuario #8**: Los data-month, data-year de cada celda deben estar dentro del rango de los datos.

**Historia de usuario #9**: Mi mapa de calor debe tener celdas que se alineen con el mes correspondiente sobre el eje-y.

**Historia de usuario #10**: Mi mapa de calor debe tener celdas que se alineen con el año correspondiente sobre el eje-x.

**Historia de usuario #11**: Mi mapa de calor debe tener varias etiquetas de marca sobre el eje-y con los nombres completos de los meses.

**Historia de usuario #12**: Mi mapa de calor debe tener varias etiquetas de marca sobre el eje-x con los años entre 1754 y 2015.

**Historia de usuario #13**: Mi mapa de calor debe tener una leyenda con su correspondiente id="legend".

**Historia de usuario #14**: Mi leyenda debe contener el elemento rect.

**Historia de usuario #15**: El elemento rect de la leyenda debe usar al menos 4 diferentes colores de relleno.

**Historia de usuario #16**: Puedo pasar el ratón por encima de un área y ver un cuadro emergente con su correspondiente id="tooltip" que muestra más información acerca del área.

**Historia de usuario #17**: Mi cuadro emergente debe tener una propiedad data-year que corresponda con el data-year del área activa.

Aquí está el conjunto de datos que necesitarás para completar este proyecto: [Acceso a los datos](https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json)

Puedes construir tu proyecto con usando esta plantilla CodePen y haciendo clic en Save para crear tu propio pen. O puedes utilizar este enlace CDN para ejecutar las pruebas en cualquier entorno que desees: [Enlace a las pruebas.](https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js)

