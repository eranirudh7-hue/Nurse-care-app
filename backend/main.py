from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client
from dotenv import load_dotenv
from twilio.rest import Client as TwilioClient
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Connect to Supabase
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

# Connect to Twilio
twilio = TwilioClient(
    os.getenv("TWILIO_ACCOUNT_SID"),
    os.getenv("TWILIO_AUTH_TOKEN")
)
TWILIO_PHONE = os.getenv("TWILIO_PHONE_NUMBER")

class AppointmentRequest(BaseModel):
    patient_name: str
    patient_age: int
    email: str
    phone: str = ""
    doctor: str
    department: str
    appointment_date: str
    appointment_time: str
    symptoms: str = ""

@app.post("/api/appointments")
async def book_appointment(appt: AppointmentRequest):
    try:
        # Step 1: Build confirmation message
        confirmation_text = (
            f"Dear {appt.patient_name}, your appointment with Dr. {appt.doctor} "
            f"({appt.department}) has been confirmed for {appt.appointment_date} "
            f"at {appt.appointment_time}. Please arrive 10 minutes early and bring "
            f"a valid photo ID. We look forward to seeing you at VivantCare!"
        )

        # Step 2: Save to Supabase
        result = supabase.table("appointments").insert({
            "patient_name":         appt.patient_name,
            "patient_age":          appt.patient_age,
            "email":                appt.email,
            "phone":                appt.phone,
            "doctor":               appt.doctor,
            "department":           appt.department,
            "appointment_date":     appt.appointment_date,
            "appointment_time":     appt.appointment_time,
            "symptoms":             appt.symptoms,
            "confirmation_message": confirmation_text
        }).execute()

        # Step 3: Send SMS if phone number provided
        if appt.phone:
            sms_message = (
    f"VivantCare: Hi {appt.patient_name}! "
    f"Appointment confirmed with Dr. {appt.doctor} "
    f"on {appt.appointment_date} at {appt.appointment_time}. "
    f"Arrive 10 mins early with photo ID."
)

            twilio.messages.create(
                body=sms_message,
                from_=TWILIO_PHONE,
                to=appt.phone
            )

        return {
            "success":              True,
            "appointment_id":       result.data[0]["id"],
            "confirmation_message": confirmation_text,
            "sms_sent":             bool(appt.phone)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/appointments")
async def get_appointments(email: str):
    try:
        result = supabase.table("appointments") \
            .select("*") \
            .eq("email", email) \
            .order("created_at", desc=True) \
            .execute()
        return result.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.patch("/api/appointments/{appointment_id}/cancel")
async def cancel_appointment(appointment_id: str):
    try:
        result = supabase.table("appointments") \
            .update({"status": "cancelled"}) \
            .eq("id", appointment_id) \
            .execute()
        return {"success": True, "message": "Appointment cancelled successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class RescheduleRequest(BaseModel):
    appointment_date: str
    appointment_time: str

@app.patch("/api/appointments/{appointment_id}/reschedule")
async def reschedule_appointment(appointment_id: str, data: RescheduleRequest):
    try:
        result = supabase.table("appointments") \
            .update({
                "appointment_date": data.appointment_date,
                "appointment_time": data.appointment_time,
                "status":           "upcoming"
            }) \
            .eq("id", appointment_id) \
            .execute()
        return {"success": True, "message": "Appointment rescheduled successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/admin/appointments")
async def get_all_appointments():
    try:
        result = supabase.table("appointments") \
            .select("*") \
            .order("created_at", desc=True) \
            .execute()
        return result.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def health_check():
    return {"status": "VivantCare API is running"}