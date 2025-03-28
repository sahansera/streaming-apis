# Variables
FRONTEND_DIR=frontend
BACKEND_DIR=backend

# Default target: setup and spin everything up
all: setup start

# Setup: install dependencies for both frontend and backend
setup:
	@echo "Setting up frontend..."
	cd $(FRONTEND_DIR) && npm install
	@echo "Setting up backend..."
	cd $(BACKEND_DIR) && pip install -r requirements.txt

# Start: spin up both frontend and backend servers
start: start-frontend start-backend

# Start frontend server
start-frontend:
	@echo "Starting frontend server..."
	cd $(FRONTEND_DIR) && npm run dev

# Start backend server
start-backend:
	@echo "Starting backend server..."
	cd $(BACKEND_DIR) && python -m uvicorn api.index:app --reload

# Clean: remove node_modules from frontend and clear Python cache from backend
clean:
	@echo "Cleaning frontend..."
	cd $(FRONTEND_DIR) && rm -rf node_modules
	@echo "Cleaning backend..."
	cd $(BACKEND_DIR) && find . -type d -name "__pycache__" -exec rm -rf {} +

.PHONY: all setup start start-frontend start-backend clean