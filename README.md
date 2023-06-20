# **WorldApp** | Proyecto Individual Henry

## ** 🌍 WorldApp**

-   Es una aplicación web que permite ver la información de todos los países del mundo. Añade la característica de actividades por países.

## ** 📌 DESARROLLO**

-   Se construyó una Single Page Application utlizando las tecnologías: **React**, **Redux**, **Node**, **Express** y **Sequelize**.
-   Uso de css puro
-   Posterior a su entrega se migró a **Redux Toolkit**

<br />

---

## **FUNCIONAMIENTO**

La aplicación consta de dos pestañas principales: **Home** y **Activities**. En la primera se renderizan los países recibidos por el servidor que se creó. En la segunda, con el uso de una tabla se maneja el **CRUD** completo de las actividades por países. El botón (+) te lleva a un formulario de creación de actividad, al dar **submit** te devuelve a la pestaña "/activities". Están los botones de update y delete que cumplen sus funciones correctamente. Update te manda al formulario pero ahora para editar la información que se verá renderizada.
Se cuenta con una **Search Bar** para el fácil acceso a la información de determinado país. Al hacer clic en alguna **Card** se ingresa al detalle del país seleccionado. Se cuenta con una paginación para la cómoda navegación en la app.
En home se cuenta con una barra de filtros: **Por continentes y actividades** además de ordenamientos: **Por orden alfabético y por población**

<br />

---

## **ACTUALIZACIONES**

-   Migración completa de la data de la API a la BD. (12/06)
-   Se migró del flujo de **redux** a **redux toolkit**. (12/06 - 13/06/23)
-   Se unificó en un solo "select" los ordenamientos para una mejor experiencia de usuario: Se tenían los ordenamientos por separado, lo que provocaba que entraran en conflicto cuando se utilizaban, debido a que los ordenamientos no se pueden combinar. (14/06/23)
-   Se solucionó el problema de los filtros combinados. Se pueden filtrar en ambos sentidos. De todas formas necesita un replanteamiento para una mejor experiencia de usuario. (14/06/23)

<br />

---

## **PROPUESTAS DE MEJORA**

-   Filtros con checkbox.
-   Utilización de iconos (svg).
-   Migración a TypeScript.
-   Login

<br />

---

## **⚠️ IMPORTANTE**

-   Aplicación presentada y aprobada en la etapa del proyecto individual de Henry.
-   Se sigue modificando en pro de seguir explorando tecnologías que puedan dar mayor eficiencia al proyecto. Por eso, actualmente se encuentra en mejora continua ante detección de **bugs** o caídas por implementación de nuevas librerías/frameworks.
-   Cualquier contribución, comentario, crítica constructiva es bienvenida.

<br />

---

Desarrollado por: Martin Alonso Núñez Navarro
<br/>
linkedin: https://www.linkedin.com/in/martinalonsonu/

  <img src="./countries.png" />
