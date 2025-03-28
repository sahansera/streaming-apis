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
├── Makefile
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (for the frontend)
- Python 3.7 or higher (for the backend)
- `make` (to use the Makefile)

### Quick Setup

To quickly install dependencies and start both the frontend and backend servers, run the following command from the project root:

```sh
make all
```

### Using the Makefile

The `Makefile` provides convenient commands for common tasks:

- **Setup**: Install dependencies for both frontend and backend:
  ```sh
  make setup
  ```

- **Start**: Start both the frontend and backend servers:
  ```sh
  make start
  ```

- **Clean**: Remove `node_modules` from the frontend and clear Python cache from the backend:
  ```sh
  make clean
  ```

## Usage

Once both servers are running, you can access the frontend at `http://localhost:3000` and the FastAPI backend at `http://localhost:8000`.

### Frontend Setup

If you prefer manual setup, follow these steps:

```sh
make setup && make start-frontend
```

### Backend Setup

```sh
make setup && make start-backend
```

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project.

## License

This project is licensed under the MIT License.