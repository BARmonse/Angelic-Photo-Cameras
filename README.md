### You can use docker-compose to initialize the application:

1. **Initialize the container with docker compose**
   ```bash
   sudo docker-compose up --build
3. Go to http://localhost:5173/ in your web browser
4. You must log in to the application using a personal access token
5. docker-compose down when you finish shutting down the containers


#### Running the Application Manually

### Backend

1. **Navigate into the backend folder**
   ```bash
   cd ./backend
3. **Create a virtual environment** (this is optional):
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate
4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
5. **Apply migrations**
   ```
   python manage.py migrate
6. ** Run the server*
   ```
   python manage.py runserver
  ### Frontend

  **I used node version 20.16.0 for this part, but any version above 16.*.* should work.**
  
1. Navigate into the frontend folder
   ```bash
   cd ./frontend
3. Install dependencies
   ```bash
   npm install
5. Run the frontend
   ```bash
   npm run dev
7. Navigate to http://localhost:5173/ in your web browser


  
