FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app


#Copiar el archivo JAR de la aplicación,
COPY target/MyTodoList-0.0.1-SNAPSHOT.jar MyTodoList.jar

#Copiar la carpeta de la wallet al contenedor,
#prueba push 3
COPY src/main/resources/wallet /app/wallet

#Exponer el puerto de la aplicación,
EXPOSE 8080

#Fail if .jar is not generated correctly. 
#RUN test -f target/MyTodoList-0.0.1-SNAPSHOT.jar

#Configurar el punto de entrada.
ENTRYPOINT ["java", "-jar", "MyTodoList.jar"]
#CMD java -jar MyTodoList.jar || tail -f /dev/null



