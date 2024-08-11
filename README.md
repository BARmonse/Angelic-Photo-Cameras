### You can use docker-compose to initialize the application:

1. ```bash
   sudo docker-compose up --build`
2. Go to http://localhost:5173/ in your web browser
3. You must log in to the application using a personal access token
4. docker-compose down when you finish shutting down the containers


#### Running the Application Manually

### Backend

1. ```bash
   cd ./backend`

2. **Create a virtual environment** (this is optional):

   ```bash
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt`

4. **Apply migrations**
   ```
   python manage.py migrate`

5. ** Run the server*
   ```
   python manage.py runserver`

  ### Frontend

  I used node version 20.16.0 for this part, but any version above 16.*.* should work.

  
1. ```bash
   cd ./frontend`

2. ```bash
   npm install`
   
3. ```bash
   npm run dev`

4. Navigate to http://localhost:5173/ in your web browser


  
