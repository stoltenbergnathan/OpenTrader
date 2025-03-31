# Stage 1: Build Angular ClientApp
FROM node:18 AS client-build
WORKDIR /app
COPY ClientApp/package.json ClientApp/package-lock.json ./ClientApp/
RUN cd ClientApp && npm install
COPY ClientApp ./ClientApp
RUN cd ClientApp && npm run build

# Stage 2: Build .NET WebAPI
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS api-build
WORKDIR /src
COPY WebAPI/WebAPI.csproj ./WebAPI/
RUN dotnet restore ./WebAPI/WebAPI.csproj
COPY WebAPI ./WebAPI
WORKDIR /src/WebAPI
RUN dotnet publish -c Release -o /app/publish

# Stage 3: Final Image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=api-build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "WebAPI.dll"]