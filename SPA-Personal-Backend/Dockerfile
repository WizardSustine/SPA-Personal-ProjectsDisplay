# Usa una imagen que ya incluya el JDK 25
FROM maven:3.9-eclipse-temurin-25 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Usa el JRE 25 para la ejecución
FROM eclipse-temurin:25-jre-jammy
WORKDIR /app
COPY --from=build /target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]