from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import asyncio
import json
import os
from typing import List, Dict
from database import get_db, engine
from models import Base
from schemas import *
from routes import router as api_router
import logging

load_dotenv()

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="This_Project_Aims_To_Develop_A_Backend_Api_For_The_Hotel_Booking_Application_User_Interface_System_Using_Fastapi_And_Sqlalchemy. API",
    description="Realtime backend API for this_project_aims_to_develop_a_backend_api_for_the_hotel_booking_application_user_interface_system_using_fastapi_and_sqlalchemy. with WebSocket support",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------- REALTIME DATA MANAGER ---------------------
class DataManager:
    def __init__(self):
        self.messages: List[Dict] = [
            {"user": "System", "text": "Welcome to This_Project_Aims_To_Develop_A_Backend_Api_For_The_Hotel_Booking_Application_User_Interface_System_Using_Fastapi_And_Sqlalchemy.!", "time": "00:00"}
        ]
        self.online_count: int = 0
        self.connections: List[WebSocket] = []

data_manager = DataManager()

# --------------------- WEBSOCKET CONNECTION MANAGER ---------------------
class ConnectionManager:
    async def connect(self, ws: WebSocket):
        await ws.accept()
        data_manager.connections.append(ws)
        data_manager.online_count += 1
        await self.broadcast({"type": "online_count", "count": data_manager.online_count})

    def disconnect(self, ws: WebSocket):
        if ws in data_manager.connections:
            data_manager.connections.remove(ws)
        data_manager.online_count = len(data_manager.connections)

    async def broadcast(self, data: dict):
        for ws in data_manager.connections[:]:
            try:
                await ws.send_json(data)
            except:
                if ws in data_manager.connections:
                    data_manager.connections.remove(ws)

manager = ConnectionManager()

# --------------------- WEBSOCKET ENDPOINT ---------------------
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    # Send initial data to newly connected client
    await websocket.send_json({
        "type": "init",
        "messages": data_manager.messages,
        "online_count": data_manager.online_count
    })

    try:
        while True:
            text = await websocket.receive_text()
            payload = json.loads(text)

            # Handle new message
            if payload.get("action") == "send_message":
                new_msg = {
                    "user": payload.get("user", "Anonymous"),
                    "text": payload["text"],
                    "time": payload.get("time", "Now")
                }
                data_manager.messages.append(new_msg)
                await manager.broadcast({
                    "type": "new_message",
                    "message": new_msg
                })

            # Add more actions here as needed
            # elif payload.get("action") == "custom_action": ...

    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast({"type": "online_count", "count": data_manager.online_count})
    except Exception as e:
        print("WebSocket Error:", e)
        manager.disconnect(websocket)
        await manager.broadcast({"type": "online_count", "count": data_manager.online_count})

# --------------------- REST API ENDPOINTS ---------------------
@app.get("/")
def read_root():
    return {"message": "Welcome to This_Project_Aims_To_Develop_A_Backend_Api_For_The_Hotel_Booking_Application_User_Interface_System_Using_Fastapi_And_Sqlalchemy. API", "status": "running", "features": ["REST API", "WebSocket", "Realtime"]}

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "this_project_aims_to_develop_a_backend_api_for_the_hotel_booking_application_user_interface_system_using_fastapi_and_sqlalchemy.", "connections": data_manager.online_count}

@app.get("/api/messages")
def get_messages():
    return {"messages": data_manager.messages, "count": len(data_manager.messages)}

@app.get("/api/stats")
def get_stats():
    return {
        "online_users": data_manager.online_count,
        "total_messages": len(data_manager.messages),
        "active_connections": len(data_manager.connections)
    }

# Include additional API routes
app.include_router(api_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)