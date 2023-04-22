## Por qué usar EF Core -> Dapper

Si trabajas con EF Core y Dapper, habrás notado que EF Core le saca el guion a las columnas transcriptas a clases
luego de ejecutar DB-Scaffolding. Razon por la cual, si pasas a Dapper, el Select a armar para traer los datos
si se utiliza una columna que tiene guion bajo, tiene que incluir una conversion, dado que la clase no tiene el guion bajo. Ej: si la columna se llama "dias_nublados", esa parte del select tendria que ser "dias_nublados as diasnublados".

Esta herramienta arma la estructura de la query con esa conversion, obteniendo todos los nombres de las columnas y detectando si tienen guion bajo, agregando la conversion.

# Instrucciones de como trabajar con EF Core -> Dapper

1- Ir a SSMS. Ejecutar el store procedure:
    exec sp_columns 'nombre de tabla'
Esto va a devolver las columnas pertenecientes en la tabla especificada.

2-Copiar el nombre de las columnas a solicitar.

3-Ir a la pagina, y tocar el unico boton que tiene.

En el textarea de la pagina, se va a mostrar el resultado de la estructura del select, con esos campos, y las conversiones segun corresponda.

