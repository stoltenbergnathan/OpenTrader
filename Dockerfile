FROM node:22-slim AS angular-build
WORKDIR /app
COPY ClientApp/package*.json ./
RUN npm install
COPY ClientApp/. .
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS api-build
WORKDIR /src
COPY WebAPI/WebAPI.csproj ./WebAPI/
RUN dotnet restore ./WebAPI/WebAPI.csproj
COPY WebAPI ./WebAPIW
WORKDIR /src/WebAPI
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=api-build /app/publish .
COPY --from=angular-build /app/dist ./wwwroot
EXPOSE 8080
ENTRYPOINT ["dotnet", "WebAPI.dll"]