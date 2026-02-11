# ETAPA 1: Construcción (Build)
# Usa una imagen que ya incluya el JDK 25
FROM maven:3.9-eclipse-temurin-25 AS build
WORKDIR /app

# 1. Copiamos el archivo de configuración de dependencias primero
# Esto ayuda a que Render no descargue todo cada vez si no has cambiado el pom.xml
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 2. Copiamos el código fuente
COPY src ./src

# 3. Compilamos y generamos el archivo .jar
# Aquí es donde se crea la carpeta /target dentro del contenedor
RUN mvn clean package -DskipTests

# ETAPA 2: Ejecución (Run)
# Usa el JRE 25 para la ejecución
FROM eclipse-temurin:25-jre-jammy
WORKDIR /app

# Copiamos el .jar generado en la etapa anterior a esta nueva imagen limpia
# Usamos un wildcard (*) para que no importe el nombre exacto del archivo generado
COPY --from=build /app/target/*.jar app.jar

# Exponemos el puerto que Render asignará
EXPOSE 8080

# Comando para arrancar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]