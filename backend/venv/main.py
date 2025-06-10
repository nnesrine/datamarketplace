# from fastapi import FastAPI, Request, HTTPException, Header
# from fastapi.middleware.cors import CORSMiddleware
# from db import init_db, register_user, get_user
# import pandas as pd
# import uuid

# app = FastAPI()
# init_db()

# # Allow React frontend
# origins = ["http://localhost:5174"]
# app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["*"], allow_headers=["*"])

# @app.post("/get-api-key")
# async def get_api_key(request: Request):
#     data = await request.json()
#     email = data.get("email")
#     if not email:
#         raise HTTPException(status_code=400, detail="Email is required")
#     api_key = uuid.uuid4().hex
#     register_user(email, api_key)
#     return {"api_key": api_key}

# @app.get("/diagnosis-by-age")
# async def get_diagnosis_by_age(request: Request):
#     api_key = request.headers.get("X-API-Key")
#     if not get_user(api_key):
#         raise HTTPException(status_code=403, detail="Invalid or missing API key")
#     df = pd.read_csv("data-source/diagnosis_by_age_group.csv")
#     return df.to_dict(orient="records")


# ALLOWED_API_KEYS = ["55e6038573e24ef3b85250c57778c161"]


# RAW_DATA_DIR = "data-source"  # Folder where your CSVs are stored

# @app.get("/raw-data/{dataset}")
# def get_raw_dataset(dataset: str, x_api_key: str = Header(...)):
#     validate_api_key(x_api_key)

#     file_path = os.path.join(RAW_DATA_DIR, f"{dataset}.csv")
#     if not os.path.exists(file_path):
#         return JSONResponse(content={"error": "Dataset not found."}, status_code=404)

#     df = pd.read_csv(file_path)
#     return df.to_dict(orient="records")

# def validate_api_key(x_api_key: str):
#     if x_api_key not in ALLOWED_API_KEYS:
#         raise HTTPException(status_code=403, detail="Invalid API key")


# # 1. Route: Diagnosis by Age Group
# CSV_FILE = "data-source/hospital_patient_records.csv"

# def categorize_age(age):
#     if age < 18:
#         return "Child"
#     elif 18 <= age < 35:
#         return "Youth"
#     elif 35 <= age < 60:
#         return "Adult"
#     else:
#         return "Senior"

# @app.get("/diagnosis-by-age")
# def get_diagnosis_by_age(x_api_key: str = Header(...)):
#     validate_api_key(x_api_key)

#     if not os.path.exists(CSV_FILE):
#         return JSONResponse(content={"error": "CSV file not found."}, status_code=400)

#     df = pd.read_csv(CSV_FILE)

#     if 'age' not in df.columns or 'diagnosis' not in df.columns:
#         return JSONResponse(content={"error": "CSV must contain 'age' and 'diagnosis' columns."}, status_code=400)

#     df['AgeGroup'] = df['age'].apply(categorize_age)
#     grouped = df.groupby(['AgeGroup', 'diagnosis']).size().reset_index(name='Count')

#     result = {}
#     for _, row in grouped.iterrows():
#         result.setdefault(row['AgeGroup'], []).append({
#             "diagnosis": row['diagnosis'],
#             "count": row['Count']
#         })

#     return result


# # 2. Route: Average Length of Stay by Diagnosis
# @app.get("/length-of-stay-by-diagnosis")
# def get_length_of_stay_by_diagnosis(x_api_key: str = Header(...)):
#     validate_api_key(x_api_key)

#     if not os.path.exists(CSV_FILE):
#         return JSONResponse(content={"error": "CSV file not found."}, status_code=400)

#     df = pd.read_csv(CSV_FILE)

#     if 'diagnosis' not in df.columns or 'length_of_stay' not in df.columns:
#         return JSONResponse(
#             content={"error": "CSV must contain 'diagnosis' and 'length_of_stay' columns."},
#             status_code=400
#         )

#     grouped = df.groupby('diagnosis')['length_of_stay'].mean().reset_index()
#     grouped = grouped.rename(columns={'length_of_stay': 'average_length_of_stay'})
#     return grouped.to_dict(orient='records')


# # 3. Route: Resident Patients
# CSV_FILE_200 = "data-source/hospital_patient_data_200.csv"

# @app.get("/resident-patients")
# def get_resident_patients(x_api_key: str = Header(...)):
#     validate_api_key(x_api_key)

#     if not os.path.exists(CSV_FILE_200):
#         return JSONResponse(content={"error": "CSV file not found."}, status_code=404)

#     df = pd.read_csv(CSV_FILE_200)

#     if 'Resident' not in df.columns:
#         return JSONResponse(content={"error": "CSV must contain 'Resident' column."}, status_code=400)

#     df['Resident'] = df['Resident'].astype(str).str.lower()
#     resident_df = df[df['Resident'].isin(['yes', 'true', '1'])]
#     return resident_df.to_dict(orient="records")


# # 4. Route: Gender Count by Month
# CSV_FILE_GENDER = "data-source/hospital_patient_data_jan_to_apr.csv"

# @app.get("/gender-count-by-month")
# def gender_count_by_month(x_api_key: str = Header(...)):
#     validate_api_key(x_api_key)

#     if not os.path.exists(CSV_FILE_GENDER):
#         return JSONResponse(content={"error": "CSV file not found."}, status_code=404)

#     df = pd.read_csv(CSV_FILE_GENDER)

#     if 'Sex' not in df.columns or 'EnterDateTime' not in df.columns:
#         return JSONResponse(
#             content={"error": "CSV must contain 'Sex' and 'EnterDateTime' columns."},
#             status_code=400
#         )

#     df['EnterDateTime'] = pd.to_datetime(df['EnterDateTime'], errors='coerce')
#     df = df[df['EnterDateTime'].dt.month.isin([1, 2, 3, 4])]
#     df['month'] = df['EnterDateTime'].dt.strftime('%B')

#     grouped = df.groupby(['month', 'Sex']).size().reset_index(name='count')

#     result = {}
#     for _, row in grouped.iterrows():
#         result.setdefault(row['month'], {})[row['Sex']] = row['count']

#     return result


# from fastapi import FastAPI, File, UploadFile, Header, HTTPException, Depends
# import pandas as pd
# from typing import Optional

# app = FastAPI()

# # Simulated unique API key (in real life, store securely)
# API_KEY = "1234567890abcdef"

# # Dependency to check API key
# def verify_api_key(x_api_key: Optional[str] = Header(None)):
#     if x_api_key != API_KEY:
#         raise HTTPException(status_code=401, detail="Invalid or missing API Key")

# # POST endpoint to load a CSV datasource
# @app.post("/data-source/hospital_patient_records.csv")
# async def load_datasource(
#     file: UploadFile = File(...),
#     api_key: str = Depends(verify_api_key)
# ):
#     try:
#         contents = await file.read()
#         df = pd.read_csv(pd.compat.StringIO(contents.decode()))
#         return {
#             "message": "Datasource loaded successfully",
#             "columns": df.columns.tolist(),
#             "preview": df.head(5).to_dict(orient="records")
#         }
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=f"Failed to read CSV file: {str(e)}")


# from fastapi import FastAPI, HTTPException, Depends
# from fastapi.security import APIKeyHeader
# from pydantic import BaseModel
# from typing import List, Dict

# # This would ideally be stored securely, e.g., in environment variables
# API_KEY = "55e6038573e24ef3b85250c57778c161" # Replace with a strong, unique key

# api_key_header = APIKeyHeader(name="X-API-Key")

# async def get_api_key(api_key: str = Depends(api_key_header)):
#     if api_key == API_KEY:
#         return api_key
#     else:
#         raise HTTPException(status_code=403, detail="Could not validate credentials")

# app = FastAPI()

# # --- CORS Configuration ---
# origins = [
#     "http://localhost",
#     "http://localhost:3000", # Common for Create React App
#     "http://localhost:5173", # Common for Vite (if your app runs on 5173)
#     "http://localhost:5174", # Your React app's default address (Vite)
#     # Add any other origins where your frontend might be hosted
#     # e.g., "http://your-production-domain.com"
# ]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,        # List of allowed origins
#     allow_credentials=True,       # Allow cookies to be included in cross-origin requests
#     allow_methods=["*"],          # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
#     allow_headers=["*"],          # Allow all headers (including custom ones like X-API-Key)
# )
# # --- End CORS Configuration ---
# # Data from your CSV
# diagnosis_data = [
#     {"age_group": "0-18", "diagnosis": "COPD", "count": 7},
#     {"age_group": "19-35", "diagnosis": "Diabetes", "count": 46},
#     {"age_group": "36-50", "diagnosis": "Heart Disease", "count": 49},
#     {"age_group": "51-65", "diagnosis": "Heart Disease", "count": 36},
#     {"age_group": "66-80", "diagnosis": "COPD", "count": 44},
#     {"age_group": "81+", "diagnosis": "COPD", "count": 20},
# ]

# class DiagnosisEntry(BaseModel):
#     age_group: str
#     diagnosis: str
#     count: int

# @app.get(
#     "/diagnoses",
#     response_model=List[DiagnosisEntry],
#     summary="Get diagnosis data by age group",
#     description="Retrieves a list of diagnoses and their counts, categorized by age group.",
# )
# async def get_diagnoses(api_key: str = Depends(get_api_key)):
#     """
#     Returns the diagnosis data.
#     Requires a valid API key in the 'X-API-Key' header.
#     """
#     return diagnosis_data

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)

# from fastapi import FastAPI, HTTPException, Depends
# from fastapi.security import APIKeyHeader
# from pydantic import BaseModel
# from typing import List, Dict
# from fastapi.middleware.cors import CORSMiddleware # <--- Import this

# # This would ideally be stored securely, e.g., in environment variables
# API_KEY = "55e6038573e24ef3b85250c57778c161" # Replace with a strong, unique key

# api_key_header = APIKeyHeader(name="X-API-Key")

# async def get_api_key(api_key: str = Depends(api_key_header)):
#     if api_key == API_KEY:
#         return api_key
#     else:
#         raise HTTPException(status_code=403, detail="Could not validate credentials")

# app = FastAPI()

# # --- CORS Configuration ---
# # Define the origins that are allowed to make requests to your API
# origins = [
#     "http://localhost",
#     "http://localhost:3000", # Common for Create React App
#     "http://localhost:5173", # Common for Vite (if your app runs on 5173)
#     "http://localhost:5174", # <--- Add this if your React app is running on 5174
#     # You can add other specific origins here, e.g., for production:
#     # "https://your-production-react-app.com",

# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,        # List of allowed origins
#     allow_credentials=True,       # Allow cookies to be included in cross-origin requests
#     allow_methods=["*"],          # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
#     allow_headers=["*"],          # Allow all headers (including custom ones like X-API-Key)
# )
# # --- End CORS Configuration ---

# # Data from your CSV
# diagnosis_data = [
#     {"age_group": "0-18", "diagnosis": "COPD", "count": 7},
#     {"age_group": "19-35", "diagnosis": "Diabetes", "count": 46},
#     {"age_group": "36-50", "diagnosis": "Heart Disease", "count": 49},
#     {"age_group": "51-65", "diagnosis": "Heart Disease", "count": 36},
#     {"age_group": "66-80", "diagnosis": "COPD", "count": 44},
#     {"age_group": "81+", "diagnosis": "COPD", "count": 20},
# ]

# class DiagnosisEntry(BaseModel):
#     age_group: str
#     diagnosis: str
#     count: int

# @app.get(
#     "/diagnoses",
#     response_model=List[DiagnosisEntry],
#     summary="Get diagnosis data by age group",
#     description="Retrieves a list of diagnoses and their counts, categorized by age group.",
# )
# async def get_diagnoses(api_key: str = Depends(get_api_key)):
#     """
#     Returns the diagnosis data.
#     Requires a valid API key in the 'X-API-Key' header.
#     """
#     return diagnosis_data

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)


from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import APIKeyHeader
from pydantic import BaseModel
from typing import List, Dict

from fastapi.middleware.cors import CORSMiddleware

# This would ideally be stored securely, e.g., in environment variables
API_KEY_DIAGNOSES = "55e6038573e24ef3b85250c57778c161" # Key for the /diagnoses endpoint
API_KEY_AVG_LENGTH_OF_STAY = "88e6038573e24ef3b85250c57778c2025" # Unique key for the new endpoint

api_key_header = APIKeyHeader(name="X-API-Key")

# Dependency for the /diagnoses endpoint
async def get_api_key_diagnoses(api_key: str = Depends(api_key_header)):
    if api_key == API_KEY_DIAGNOSES:
        return api_key
    else:
        raise HTTPException(status_code=403, detail="Could not validate credentials for diagnoses endpoint")

# Dependency for the new average length of stay endpoint
async def get_api_key_avg_length_of_stay(api_key: str = Depends(api_key_header)):
    if api_key == API_KEY_AVG_LENGTH_OF_STAY:
        return api_key
    else:
        raise HTTPException(status_code=403, detail="Could not validate credentials for average length of stay endpoint")

app = FastAPI()

# --- CORS Configuration ---
# Define the origins that are allowed to make requests to your API
origins = [
    "http://localhost",
    "http://localhost:3000", # Common for Create React App
    "http://localhost:5173", # Common for Vite (if your app runs on 5173)
    "http://localhost:5174", # Add this if your React app is running on 5174
    # You can add other specific origins here, e.g., for production:
    # "https://your-production-react-app.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # List of allowed origins
    allow_credentials=True,      # Allow cookies to be included in cross-origin requests
    allow_methods=["*"],         # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],         # Allow all headers (including custom ones like X-API-Key)
)
# --- End CORS Configuration ---

# Data for the /diagnoses endpoint
diagnosis_data = [
    {"age_group": "0-18", "diagnosis": "COPD", "count": 7},
    {"age_group": "19-35", "diagnosis": "Diabetes", "count": 46},
    {"age_group": "36-50", "diagnosis": "Heart Disease", "count": 49},
    {"age_group": "51-65", "diagnosis": "Heart Disease", "count": 36},
    {"age_group": "66-80", "diagnosis": "COPD", "count": 44},
    {"age_group": "81+", "diagnosis": "COPD", "count": 20},
]

class DiagnosisEntry(BaseModel):
    age_group: str
    diagnosis: str
    count: int

@app.get(
    "/diagnoses",
    response_model=List[DiagnosisEntry],
    summary="Get diagnosis data by age group",
    description="Retrieves a list of diagnoses and their counts, categorized by age group.",
)
async def get_diagnoses(api_key: str = Depends(get_api_key_diagnoses)): # Use specific dependency
    """
    Returns the diagnosis data.
    Requires a valid API key in the 'X-API-Key' header.
    """
    return diagnosis_data

# --- New Endpoint for Average Length of Stay Data ---

# New data for the average length of stay
average_length_of_stay_data = [
    {"diagnosis": "Asthma", "average_length_of_stay": 4.812949640287771},
    {"diagnosis": "COPD", "average_length_of_stay": 5.083798882681564},
    {"diagnosis": "Diabetes", "average_length_of_stay": 5.070175438596491},
    {"diagnosis": "Heart Disease", "average_length_of_stay": 4.7650273224043715},
    {"diagnosis": "Hypertension", "average_length_of_stay": 5.012345679012346},
]

# Pydantic model for the new data
class AverageLengthOfStayEntry(BaseModel):
    diagnosis: str
    average_length_of_stay: float

@app.get(
    "/average_length_of_stay",
    response_model=List[AverageLengthOfStayEntry],
    summary="Get average length of stay by diagnosis",
    description="Retrieves the average length of stay for different diagnoses.",
)
async def get_average_length_of_stay(api_key: str = Depends(get_api_key_avg_length_of_stay)): # Use specific dependency
    """
    Returns the average length of stay data.
    Requires a valid API key in the 'X-API-Key' header.
    """
    return average_length_of_stay_data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
