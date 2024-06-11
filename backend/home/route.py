from fastapi import APIRouter, status, HTTPException
from fastapi.responses import JSONResponse

from general.get_db import get_curr

from home.sql import GETTITLE, GETNAVBARITEMS

home_router = APIRouter()

@home_router.get("/title", status_code=status.HTTP_200_OK)
async def get_title():
    with get_curr() as curr:
        curr.execute(GETTITLE)
        title = curr.fetchone()
    return JSONResponse(content=title)

@home_router.get("/navbar", status_code=status.HTTP_200_OK)
async def get_navbar():
    with get_curr() as curr:
        curr.execute(GETNAVBARITEMS)
        navbarItems = curr.fetchall()
    return JSONResponse(content=navbarItems)
