# Next.js Streaming API with FastAPI

This project is a full-stack application that combines a Next.js frontend with a FastAPI backend. Below are the instructions for setting up and running both parts of the application.

## Project Structure

```
nextjs-streaming-api
├── backend
│   ├── api
│   │   └── index.py
│   ├── requirements.txt
│   └── README.md
├── frontend
│   ├── pages
│   │   └── index.tsx
│   ├── public
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
└── README.md
```

## Frontend Setup

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the Next.js development server:
   ```
   npm run dev
   ```

4. Open your browser and go to `http://localhost:3000` to view the application.

## Backend Setup

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install the Python dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Start the FastAPI server:
   ```
   python -m uvicorn api.index:app --reload
   ```

4. Open your browser and go to `http://localhost:8000` to access the FastAPI documentation and test the API endpoints.

## Usage

This application allows you to interact with the FastAPI backend through the Next.js frontend. You can modify the API endpoints in `backend/api/index.py` and the frontend components in `frontend/pages/index.tsx` to suit your needs.

## Contributing

Feel free to fork the repository and submit pull requests for any improvements or features you would like to add.