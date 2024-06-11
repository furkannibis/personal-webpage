from fastapi import FastAPI, status, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from home.route import home_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get('/', status_code=status.HTTP_200_OK)
async def get_root():
    return JSONResponse(content={
        "message": "Hello, World!"
    })

app.include_router(home_router)