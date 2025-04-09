FROM mcr.microsoft.com/dotnet/sdk:8.0 AS api-build
WORKDIR /src
COPY WebAPI/WebAPI.csproj ./WebAPI/
RUN dotnet restore ./WebAPI/WebAPI.csproj
COPY WebAPI ./WebAPI
WORKDIR /src/WebAPI
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=api-build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "WebAPI.dll"]