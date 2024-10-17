###Run Back-End

- Make sure "python" is installed
- Make sure you have PostgreSQL installed
- Create and configure ".env" file inside ./Back

- Configure "SQLALCHEMY_DATABASE_URL" in "database.py" to run the application in your machine

- cd ./Back
- Create virtual environment (Windows -> "python -m venv env" -> ".\venv\Scripts\Activate")
- pip install requirements.txt
- uvicorn main:app --reload




###Run Front-end

- Make sure "nodejs" and "npm" are installed
- Create and configure ".env" file inside ./Front
 
- cd ./Front
- npm install
- npm run dev 
