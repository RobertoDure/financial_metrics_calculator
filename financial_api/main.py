from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import financial_analysis

app = FastAPI(
    title="Financial Analysis API",
    description="A REST API for comprehensive financial analysis and metrics calculation",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(
    financial_analysis.router,
    prefix="/api/v1",
    tags=["financial-analysis"]
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to Financial Analysis API",
        "docs": "/docs",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
