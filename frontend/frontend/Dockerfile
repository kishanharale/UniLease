# Use Node.js as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Angular CLI globally and app dependencies
RUN npm install -g @angular/cli
RUN npm install

# Copy the entire project
COPY . .

# Expose ports for both frontend and backend
EXPOSE 4200 
EXPOSE 3000 

# Default command (overridden by docker-compose)
CMD ["sh", "-c", "node server.js & ng serve --host 0.0.0.0 --port 4200"]
